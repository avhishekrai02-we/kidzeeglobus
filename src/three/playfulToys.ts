import * as THREE from 'three';

function createLetterFaceTexture(
  letter: string,
  bgHex: string,
  borderHex: string,
  textHex: string,
  maxAnisotropy: number,
): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    // Cream wooden inset
    ctx.fillStyle = bgHex;
    ctx.fillRect(0, 0, 256, 256);

    // Subtle wood-grain horizontal lines
    ctx.strokeStyle = 'rgba(91, 21, 140, 0.06)';
    ctx.lineWidth = 2;
    for (let y = 16; y < 256; y += 18) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(256, y + Math.sin(y) * 2);
      ctx.stroke();
    }

    // Painted toy border frame
    ctx.strokeStyle = borderHex;
    ctx.lineWidth = 26;
    ctx.strokeRect(13, 13, 230, 230);

    // Inner playful dotted trim
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.65)';
    ctx.lineWidth = 4;
    ctx.setLineDash([8, 8]);
    ctx.strokeRect(32, 32, 192, 192);
    ctx.setLineDash([]);

    // Bold playful glyph
    ctx.fillStyle = textHex;
    ctx.font = '700 132px Fredoka, ui-rounded, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(letter, 128, 136);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = maxAnisotropy;
  texture.needsUpdate = true;
  return texture;
}

/**
 * 1. Composite 3D Wooden ABC Learning Block (core + 6 textured letter faces + 8 brass corner studs)
 */
export function createAbcBlockToy(maxAnisotropy: number): THREE.Group {
  const group = new THREE.Group();
  group.name = 'abc-block';

  const faces: Array<[string, string, string, string]> = [
    ['A', '#FFFDF5', '#5B158C', '#5B158C'],
    ['B', '#FFFDF5', '#F97316', '#EA580C'],
    ['C', '#FFFDF5', '#16A34A', '#15803D'],
    ['1', '#FFFDF5', '#D91E2A', '#C81E1E'],
    ['2', '#FFFDF5', '#2563EB', '#1D4ED8'],
    ['3', '#FFFDF5', '#EAB308', '#5B158C'],
  ];

  const faceMaterials = faces.map(([char, bg, border, fg]) => {
    const map = createLetterFaceTexture(char, bg, border, fg, maxAnisotropy);
    return new THREE.MeshStandardMaterial({
      color: 0xffffff,
      map,
      roughness: 0.42,
      metalness: 0.05,
    });
  });

  const blockGeo = new THREE.BoxGeometry(1.18, 1.18, 1.18);
  const blockMesh = new THREE.Mesh(blockGeo, faceMaterials);
  group.add(blockMesh);

  // Polished maple corner beads (8 accent parts) for a handcrafted wooden-toy silhouette
  const cornerGeo = new THREE.SphereGeometry(0.11, 14, 14);
  const cornerMat = new THREE.MeshStandardMaterial({
    color: 0xffe11d,
    roughness: 0.22,
    metalness: 0.28,
  });
  const offset = 0.57;
  for (const sx of [-1, 1]) {
    for (const sy of [-1, 1]) {
      for (const sz of [-1, 1]) {
        const corner = new THREE.Mesh(cornerGeo, cornerMat);
        corner.position.set(sx * offset, sy * offset, sz * offset);
        group.add(corner);
      }
    }
  }

  return group;
}

/**
 * 2. Composite 3D Giant Playful Craft Pencil (6 distinct material & geometry parts)
 */
export function createGiantPencilToy(): THREE.Group {
  const group = new THREE.Group();
  group.name = 'pencil';

  // Primary hexagonal painted body
  const shaftGeo = new THREE.CylinderGeometry(0.24, 0.24, 1.65, 6);
  const shaftMat = new THREE.MeshStandardMaterial({
    color: 0xffd60a,
    roughness: 0.34,
    metalness: 0.08,
  });
  const shaft = new THREE.Mesh(shaftGeo, shaftMat);
  group.add(shaft);

  // Decorative Kidzee purple stripe band
  const bandGeo = new THREE.CylinderGeometry(0.246, 0.246, 0.26, 6);
  const bandMat = new THREE.MeshStandardMaterial({
    color: 0x5b158c,
    roughness: 0.45,
    metalness: 0.1,
  });
  const band = new THREE.Mesh(bandGeo, bandMat);
  band.position.y = 0.35;
  group.add(band);

  // Brushed metallic ferrule + twin crimp rings
  const ferruleGeo = new THREE.CylinderGeometry(0.235, 0.235, 0.32, 24);
  const ferruleMat = new THREE.MeshStandardMaterial({
    color: 0xe2e8f0,
    roughness: 0.18,
    metalness: 0.92,
  });
  const ferrule = new THREE.Mesh(ferruleGeo, ferruleMat);
  ferrule.position.y = 0.98;
  group.add(ferrule);

  const ringGeo = new THREE.TorusGeometry(0.236, 0.025, 10, 24);
  const ring1 = new THREE.Mesh(ringGeo, ferruleMat);
  ring1.rotation.x = Math.PI / 2;
  ring1.position.y = 0.9;
  const ring2 = ring1.clone();
  ring2.position.y = 1.06;
  group.add(ring1, ring2);

  // Soft matte rubber eraser cap
  const eraserGeo = new THREE.CylinderGeometry(0.22, 0.22, 0.28, 24);
  const eraserMat = new THREE.MeshStandardMaterial({
    color: 0xf472b6,
    roughness: 0.86,
    metalness: 0.02,
  });
  const eraser = new THREE.Mesh(eraserGeo, eraserMat);
  eraser.position.y = 1.24;
  group.add(eraser);

  const eraserTopGeo = new THREE.SphereGeometry(0.22, 20, 12, 0, Math.PI * 2, 0, Math.PI / 2);
  const eraserTop = new THREE.Mesh(eraserTopGeo, eraserMat);
  eraserTop.position.y = 1.38;
  group.add(eraserTop);

  // Sharpened pale cedar cone
  const woodConeGeo = new THREE.ConeGeometry(0.24, 0.56, 20);
  const woodConeMat = new THREE.MeshStandardMaterial({
    color: 0xf5d0a9,
    roughness: 0.74,
    metalness: 0.02,
  });
  const woodCone = new THREE.Mesh(woodConeGeo, woodConeMat);
  woodCone.rotation.x = Math.PI;
  woodCone.position.y = -1.1;
  group.add(woodCone);

  // Glossy dark graphite point
  const tipGeo = new THREE.ConeGeometry(0.088, 0.22, 16);
  const tipMat = new THREE.MeshStandardMaterial({
    color: 0x241038,
    roughness: 0.3,
    metalness: 0.45,
  });
  const tip = new THREE.Mesh(tipGeo, tipMat);
  tip.rotation.x = Math.PI;
  tip.position.y = -1.32;
  group.add(tip);

  group.rotation.z = -0.35;
  return group;
}

/**
 * 3. Composite 3D Golden Achiever Star (Extruded beveled star + enamel medallion + orbital ring)
 */
export function createGoldenStarToy(): THREE.Group {
  const group = new THREE.Group();
  group.name = 'star';

  const starShape = new THREE.Shape();
  const points = 5;
  const outerRadius = 0.84;
  const innerRadius = 0.39;
  for (let i = 0; i < points * 2; i++) {
    const r = i % 2 === 0 ? outerRadius : innerRadius;
    const angle = (i * Math.PI) / points - Math.PI / 2;
    const x = Math.cos(angle) * r;
    const y = Math.sin(angle) * r;
    if (i === 0) starShape.moveTo(x, y);
    else starShape.lineTo(x, y);
  }
  starShape.closePath();

  const starGeo = new THREE.ExtrudeGeometry(starShape, {
    depth: 0.22,
    bevelEnabled: true,
    bevelThickness: 0.08,
    bevelSize: 0.06,
    bevelSegments: 3,
  });
  starGeo.center();

  const goldMat = new THREE.MeshStandardMaterial({
    color: 0xffcf14,
    roughness: 0.24,
    metalness: 0.72,
  });
  const starMesh = new THREE.Mesh(starGeo, goldMat);
  group.add(starMesh);

  // Royal purple center enamel medallion on front & back
  const discGeo = new THREE.CylinderGeometry(0.28, 0.28, 0.42, 24);
  const discMat = new THREE.MeshStandardMaterial({
    color: 0x5b158c,
    roughness: 0.32,
    metalness: 0.18,
  });
  const disc = new THREE.Mesh(discGeo, discMat);
  disc.rotation.x = Math.PI / 2;
  group.add(disc);

  // Tilted orbital ribbon hoop
  const orbitGeo = new THREE.TorusGeometry(0.98, 0.036, 12, 42);
  const orbitMat = new THREE.MeshStandardMaterial({
    color: 0xf97316,
    roughness: 0.35,
    metalness: 0.4,
  });
  const orbit = new THREE.Mesh(orbitGeo, orbitMat);
  orbit.rotation.set(0.95, 0.35, 0.2);
  group.add(orbit);

  // Orbiting mini diamond sparkles
  const gemGeo = new THREE.OctahedronGeometry(0.11, 0);
  const gemMat = new THREE.MeshStandardMaterial({
    color: 0x38bdf8,
    roughness: 0.16,
    metalness: 0.55,
  });
  for (let i = 0; i < 3; i++) {
    const a = (i * Math.PI * 2) / 3;
    const gem = new THREE.Mesh(gemGeo, gemMat);
    gem.position.set(Math.cos(a) * 0.98, Math.sin(a) * 0.98, 0);
    orbit.add(gem);
  }

  return group;
}

/**
 * 4. Composite 3D Toy Biplane (echoing the PDF hero airplane doodle — 9 parts + spinning propeller!)
 */
export function createPropellerPlaneToy(): { group: THREE.Group; propeller: THREE.Group } {
  const group = new THREE.Group();
  group.name = 'plane';

  // Tapered fuselage via LatheGeometry
  const lathePoints = [
    new THREE.Vector2(0.0, -0.95),
    new THREE.Vector2(0.11, -0.82),
    new THREE.Vector2(0.22, -0.25),
    new THREE.Vector2(0.26, 0.35),
    new THREE.Vector2(0.23, 0.72),
    new THREE.Vector2(0.14, 0.88),
    new THREE.Vector2(0.0, 0.92),
  ];
  const fuselageGeo = new THREE.LatheGeometry(lathePoints, 20);
  fuselageGeo.rotateX(Math.PI / 2);
  const purplePaint = new THREE.MeshStandardMaterial({
    color: 0x6b1b9a,
    roughness: 0.32,
    metalness: 0.18,
  });
  const fuselage = new THREE.Mesh(fuselageGeo, purplePaint);
  group.add(fuselage);

  // Sunshine yellow wings (upper + lower biplane wings)
  const wingMat = new THREE.MeshStandardMaterial({
    color: 0xffe11d,
    roughness: 0.38,
    metalness: 0.08,
  });
  const upperWing = new THREE.Mesh(new THREE.BoxGeometry(1.75, 0.07, 0.42), wingMat);
  upperWing.position.set(0, 0.3, 0.18);
  const lowerWing = new THREE.Mesh(new THREE.BoxGeometry(1.45, 0.07, 0.36), wingMat);
  lowerWing.position.set(0, -0.14, 0.14);
  group.add(upperWing, lowerWing);

  // Wing struts
  const strutMat = new THREE.MeshStandardMaterial({
    color: 0xf5d0a9,
    roughness: 0.72,
    metalness: 0.05,
  });
  const strutGeo = new THREE.CylinderGeometry(0.025, 0.025, 0.44, 8);
  for (const x of [-0.52, 0.52]) {
    const strut = new THREE.Mesh(strutGeo, strutMat);
    strut.position.set(x, 0.08, 0.16);
    group.add(strut);
  }

  // Tail stabilizer & crimson rudder
  const tailWing = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.05, 0.24), wingMat);
  tailWing.position.set(0, 0.05, -0.78);
  const rudderMat = new THREE.MeshStandardMaterial({
    color: 0xf97316,
    roughness: 0.42,
    metalness: 0.1,
  });
  const rudder = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.34, 0.28), rudderMat);
  rudder.position.set(0, 0.2, -0.76);
  group.add(tailWing, rudder);

  // Glossy canopy dome
  const canopyMat = new THREE.MeshStandardMaterial({
    color: 0x38bdf8,
    roughness: 0.12,
    metalness: 0.35,
  });
  const canopy = new THREE.Mesh(new THREE.SphereGeometry(0.18, 16, 12), canopyMat);
  canopy.scale.set(0.95, 0.75, 1.35);
  canopy.position.set(0, 0.16, -0.08);
  group.add(canopy);

  // Spinning propeller assembly at nose (+Z)
  const propeller = new THREE.Group();
  propeller.position.set(0, 0, 0.92);

  const hubMat = new THREE.MeshStandardMaterial({
    color: 0xe2e8f0,
    roughness: 0.18,
    metalness: 0.9,
  });
  const hub = new THREE.Mesh(new THREE.ConeGeometry(0.09, 0.18, 16), hubMat);
  hub.rotation.x = Math.PI / 2;
  propeller.add(hub);

  const bladeGeo = new THREE.BoxGeometry(0.82, 0.11, 0.03);
  const blade = new THREE.Mesh(bladeGeo, rudderMat);
  propeller.add(blade);
  group.add(propeller);

  return { group, propeller };
}

/**
 * 5. Composite 3D Rainbow Ring Stacker (turned wooden spindle + 4 colourful rings + finial ball)
 */
export function createRainbowStackerToy(): THREE.Group {
  const group = new THREE.Group();
  group.name = 'stacker';

  // Turned maple base & central peg
  const baseProfile = [
    new THREE.Vector2(0.0, 0.0),
    new THREE.Vector2(0.68, 0.0),
    new THREE.Vector2(0.66, 0.12),
    new THREE.Vector2(0.56, 0.18),
    new THREE.Vector2(0.13, 0.2),
    new THREE.Vector2(0.11, 1.25),
    new THREE.Vector2(0.0, 1.28),
  ];
  const baseGeo = new THREE.LatheGeometry(baseProfile, 24);
  const woodMat = new THREE.MeshStandardMaterial({
    color: 0xf4cfa0,
    roughness: 0.68,
    metalness: 0.04,
  });
  const baseMesh = new THREE.Mesh(baseGeo, woodMat);
  baseMesh.position.y = -0.68;
  group.add(baseMesh);

  const ringSpecs: Array<{ radius: number; tube: number; y: number; color: number }> = [
    { radius: 0.48, tube: 0.125, y: -0.38, color: 0x5b158c },
    { radius: 0.4, tube: 0.12, y: -0.14, color: 0xffe11d },
    { radius: 0.32, tube: 0.115, y: 0.09, color: 0xf97316 },
    { radius: 0.25, tube: 0.11, y: 0.31, color: 0x16a34a },
  ];

  for (const spec of ringSpecs) {
    const ringGeo = new THREE.TorusGeometry(spec.radius, spec.tube, 14, 28);
    const ringMat = new THREE.MeshStandardMaterial({
      color: spec.color,
      roughness: 0.3,
      metalness: 0.1,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2;
    ring.position.y = spec.y;
    group.add(ring);
  }

  // Glossy crimson top ball finial
  const finial = new THREE.Mesh(
    new THREE.SphereGeometry(0.18, 20, 16),
    new THREE.MeshStandardMaterial({
      color: 0xd91e2a,
      roughness: 0.2,
      metalness: 0.18,
    }),
  );
  finial.position.y = 0.64;
  group.add(finial);

  return group;
}

export function disposeObject3D(root: THREE.Object3D): void {
  root.traverse((obj) => {
    if (obj instanceof THREE.Mesh) {
      obj.geometry.dispose();
      const materials = Array.isArray(obj.material) ? obj.material : [obj.material];
      for (const mat of materials) {
        if ('map' in mat && mat.map instanceof THREE.Texture) {
          mat.map.dispose();
        }
        mat.dispose();
      }
    }
  });
}
