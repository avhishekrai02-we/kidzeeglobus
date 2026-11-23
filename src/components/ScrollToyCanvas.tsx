import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import {
  createAbcBlockToy,
  createGiantPencilToy,
  createGoldenStarToy,
  createPropellerPlaneToy,
  createRainbowStackerToy,
  disposeObject3D,
} from '../three/playfulToys';
import {
  PLAYFUL_TOY_SPECS,
  computeScrollProgress,
  computeToyTransform,
  type ToySpec,
} from '../utils/scroll3d';

interface ScrollToyCanvasProps {
  spinRequest: { toyId: ToySpec['id'] | 'all'; nonce: number } | null;
  onToySpun?: (toyLabel: string) => void;
}

interface ManagedToy {
  spec: ToySpec;
  group: THREE.Group;
  propeller?: THREE.Group;
  clickSpinTarget: number;
  clickSpinCurrent: number;
  clickBounce: number;
  currentRotX: number;
  currentRotY: number;
  currentRotZ: number;
  currentPosX: number;
  currentPosY: number;
  currentPosZ: number;
  currentScale: number;
}

export function ScrollToyCanvas({ spinRequest, onToySpun }: ScrollToyCanvasProps) {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const triggerSpinRef = useRef<((toyId: ToySpec['id'] | 'all') => void) | null>(null);
  const onToySpunRef = useRef(onToySpun);
  onToySpunRef.current = onToySpun;

  useEffect(() => {
    if (spinRequest && triggerSpinRef.current) {
      triggerSpinRef.current(spinRequest.toyId);
    }
  }, [spinRequest]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Detect software WebGL via GPU renderer string (never userAgent)
    const isSoftwareGl = (() => {
      try {
        const probeCanvas = document.createElement('canvas');
        const gl = probeCanvas.getContext('webgl2');
        if (!gl) return true;
        const ext = gl.getExtension('WEBGL_debug_renderer_info');
        const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
        const gpu = String(gl.getParameter(param));
        gl.getExtension('WEBGL_lose_context')?.loseContext();
        return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
      } catch {
        return true;
      }
    })();

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: !isSoftwareGl,
        alpha: true,
        powerPreference: 'high-performance',
      });
    } catch {
      return;
    }

    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.12;
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);

    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setSize(width, height);
    renderer.domElement.style.display = 'block';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();

    // Procedural studio environment map for crisp metallic & glossy toy highlights
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const envTarget = pmremGenerator.fromScene(new RoomEnvironment(), 0.04);
    scene.environment = envTarget.texture;
    pmremGenerator.dispose();

    const camera = new THREE.PerspectiveCamera(42, width / Math.max(1, height), 0.1, 60);
    camera.position.set(0, 0, 11.5);

    // Balanced warm key + cool sky/ground HemisphereLight fill
    const hemiLight = new THREE.HemisphereLight(0xf3e8ff, 0x5b158c, 1.15);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xfff6dc, 2.0);
    keyLight.position.set(6, 9, 10);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xc084fc, 0.9);
    rimLight.position.set(-7, -4, 4);
    scene.add(rimLight);

    // Build composite 3D playful toys
    const maxAniso = renderer.capabilities.getMaxAnisotropy();
    const planeBuild = createPropellerPlaneToy();
    const builders: Record<ToySpec['id'], { group: THREE.Group; propeller?: THREE.Group }> = {
      'abc-block': { group: createAbcBlockToy(maxAniso) },
      plane: planeBuild,
      pencil: { group: createGiantPencilToy() },
      star: { group: createGoldenStarToy() },
      stacker: { group: createRainbowStackerToy() },
    };

    const initialScroll = computeScrollProgress(
      window.scrollY,
      document.documentElement.scrollHeight,
      window.innerHeight,
    );
    const initialAspect = width / Math.max(1, height);

    const toys: ManagedToy[] = PLAYFUL_TOY_SPECS.map((spec) => {
      const built = builders[spec.id];
      const initial = computeToyTransform(spec, initialScroll, 0, 0, 0, 0, initialAspect);
      built.group.position.set(initial.posX, initial.posY, initial.posZ);
      built.group.rotation.set(initial.rotX, initial.rotY, initial.rotZ);
      built.group.scale.setScalar(initial.scale);
      scene.add(built.group);

      return {
        spec,
        group: built.group,
        propeller: built.propeller,
        clickSpinTarget: 0,
        clickSpinCurrent: 0,
        clickBounce: 0,
        currentRotX: initial.rotX,
        currentRotY: initial.rotY,
        currentRotZ: initial.rotZ,
        currentPosX: initial.posX,
        currentPosY: initial.posY,
        currentPosZ: initial.posZ,
        currentScale: initial.scale,
      };
    });

    if (!isSoftwareGl) {
      renderer.compile(scene, camera);
    }

    let scrollProgress = initialScroll;
    let pointerX = 0;
    let pointerY = 0;
    let totalSpins = 0;
    let disposed = false;
    let frameId = 0;
    let renderBusy = false;
    let renderDirty = false;
    let lastTime = performance.now();

    const syncDataAttributes = () => {
      container.setAttribute('data-scroll-progress', scrollProgress.toFixed(3));
      container.setAttribute('data-toy-spins', String(totalSpins));
      if (toys[0]) {
        container.setAttribute('data-block-rot-y', toys[0].currentRotY.toFixed(3));
      }
    };
    syncDataAttributes();

    function afterDraw(cb: () => void) {
      const gl = renderer.getContext() as WebGL2RenderingContext;
      const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
      gl.flush();
      const poll = () => {
        if (disposed) return;
        const state = sync && gl.getSyncParameter(sync, gl.SYNC_STATUS);
        if (state === gl.UNSIGNALED) {
          frameId = window.setTimeout(poll, 5);
        } else {
          if (sync) gl.deleteSync(sync);
          frameId = window.setTimeout(cb, 80);
        }
      };
      frameId = window.setTimeout(poll, 5);
    }

    function stepScene(dt: number): boolean {
      const aspect = window.innerWidth / Math.max(1, window.innerHeight);
      let stillMoving = false;
      const dampRate = prefersReducedMotion ? 40 : 7.5;

      for (const toy of toys) {
        if (toy.clickBounce > 0.004) {
          toy.clickBounce = THREE.MathUtils.damp(toy.clickBounce, 0, 5.2, dt);
          stillMoving = true;
        } else {
          toy.clickBounce = 0;
        }

        const spinDiff = toy.clickSpinTarget - toy.clickSpinCurrent;
        if (Math.abs(spinDiff) > 0.008) {
          toy.clickSpinCurrent = THREE.MathUtils.damp(
            toy.clickSpinCurrent,
            toy.clickSpinTarget,
            5.0,
            dt,
          );
          stillMoving = true;
        } else {
          toy.clickSpinCurrent = toy.clickSpinTarget;
        }

        const target = computeToyTransform(
          toy.spec,
          scrollProgress,
          pointerX,
          pointerY,
          toy.clickSpinCurrent,
          toy.clickBounce,
          aspect,
        );

        const prevRotY = toy.currentRotY;
        toy.currentRotX = THREE.MathUtils.damp(toy.currentRotX, target.rotX, dampRate, dt);
        toy.currentRotY = THREE.MathUtils.damp(toy.currentRotY, target.rotY, dampRate, dt);
        toy.currentRotZ = THREE.MathUtils.damp(toy.currentRotZ, target.rotZ, dampRate, dt);
        toy.currentPosX = THREE.MathUtils.damp(toy.currentPosX, target.posX, dampRate, dt);
        toy.currentPosY = THREE.MathUtils.damp(toy.currentPosY, target.posY, dampRate, dt);
        toy.currentPosZ = THREE.MathUtils.damp(toy.currentPosZ, target.posZ, dampRate, dt);
        toy.currentScale = THREE.MathUtils.damp(toy.currentScale, target.scale, dampRate, dt);

        toy.group.rotation.set(toy.currentRotX, toy.currentRotY, toy.currentRotZ);
        toy.group.position.set(toy.currentPosX, toy.currentPosY, toy.currentPosZ);
        toy.group.scale.setScalar(toy.currentScale);

        if (toy.propeller) {
          toy.propeller.rotation.z += Math.abs(toy.currentRotY - prevRotY) * 6.5 + dt * 2.2;
        }

        const deltaSum =
          Math.abs(toy.currentRotX - target.rotX) +
          Math.abs(toy.currentRotY - target.rotY) +
          Math.abs(toy.currentPosY - target.posY) +
          Math.abs(toy.currentScale - target.scale);
        if (deltaSum > 0.008) {
          stillMoving = true;
        }
      }

      syncDataAttributes();
      return stillMoving;
    }

    function requestRender() {
      if (disposed) return;
      if (renderBusy) {
        renderDirty = true;
        return;
      }
      renderBusy = true;
      frameId = window.requestAnimationFrame(() => {
        if (disposed) return;
        renderDirty = false;
        const now = performance.now();
        const dt = Math.min(0.1, Math.max(0.008, (now - lastTime) / 1000));
        lastTime = now;

        const keepGoing = stepScene(dt);
        renderer.render(scene, camera);

        const done = () => {
          if (disposed) return;
          renderBusy = false;
          if (renderDirty || keepGoing) {
            requestRender();
          }
        };

        if (isSoftwareGl) {
          afterDraw(done);
        } else {
          done();
        }
      });
    }

    const triggerSpin = (toyId: ToySpec['id'] | 'all') => {
      let spunLabel = 'All 3D Toys';
      for (const toy of toys) {
        if (toyId === 'all' || toy.spec.id === toyId) {
          toy.clickSpinTarget += Math.PI * 2;
          toy.clickBounce = 1.0;
          if (toyId !== 'all') {
            spunLabel = toy.spec.label;
          }
        }
      }
      totalSpins += 1;
      onToySpunRef.current?.(spunLabel);
      requestRender();
    };
    triggerSpinRef.current = triggerSpin;

    // Pre-allocated raycaster & pointer NDC vector outside render loop
    const raycaster = new THREE.Raycaster();
    const pointerNdc = new THREE.Vector2();
    const toyGroups = toys.map((t) => t.group);

    const handleScroll = () => {
      scrollProgress = computeScrollProgress(
        window.scrollY,
        document.documentElement.scrollHeight,
        window.innerHeight,
      );
      requestRender();
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (prefersReducedMotion) return;
      pointerX = (event.clientX / Math.max(1, window.innerWidth)) * 2 - 1;
      pointerY = -((event.clientY / Math.max(1, window.innerHeight)) * 2 - 1);
      requestRender();
    };

    const handleWindowClick = (event: MouseEvent) => {
      // Only raycast when clicking non-interactive areas so buttons/links/inputs are never interfered with
      const targetEl = event.target as HTMLElement | null;
      if (targetEl?.closest('button, a, input, select, textarea, label, [role="dialog"]')) {
        return;
      }
      pointerNdc.x = (event.clientX / Math.max(1, window.innerWidth)) * 2 - 1;
      pointerNdc.y = -((event.clientY / Math.max(1, window.innerHeight)) * 2 - 1);
      raycaster.setFromCamera(pointerNdc, camera);
      const hits = raycaster.intersectObjects(toyGroups, true);
      if (hits.length > 0) {
        let obj: THREE.Object3D | null = hits[0].object;
        while (obj && !toyGroups.includes(obj as THREE.Group)) {
          obj = obj.parent;
        }
        const matched = toys.find((t) => t.group === obj);
        if (matched) {
          triggerSpin(matched.spec.id);
        }
      }
    };

    const handleResize = () => {
      const nextW = window.innerWidth;
      const nextH = Math.max(1, window.innerHeight);
      camera.aspect = nextW / nextH;
      camera.updateProjectionMatrix();
      renderer.setSize(nextW, nextH);
      scrollProgress = computeScrollProgress(
        window.scrollY,
        document.documentElement.scrollHeight,
        nextH,
      );
      requestRender();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('click', handleWindowClick);
    window.addEventListener('resize', handleResize);

    // Immediate first paint so 3D toys appear right away
    renderer.render(scene, camera);

    return () => {
      disposed = true;
      triggerSpinRef.current = null;
      window.cancelAnimationFrame(frameId);
      window.clearTimeout(frameId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('click', handleWindowClick);
      window.removeEventListener('resize', handleResize);
      for (const toy of toys) {
        disposeObject3D(toy.group);
      }
      envTarget.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      data-testid="scroll-toy-canvas"
      aria-hidden="true"
      className="fixed inset-0 z-30 pointer-events-none overflow-hidden hidden sm:block"
    />
  );
}
