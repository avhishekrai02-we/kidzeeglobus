export interface ToySpec {
  id: 'abc-block' | 'pencil' | 'star' | 'plane' | 'stacker';
  label: string;
  side: -1 | 1;
  baseY: number;
  baseZ: number;
  scrollRotSpeedX: number;
  scrollRotSpeedY: number;
  scrollRotSpeedZ: number;
  parallaxY: number;
  baseScale: number;
}

export interface ToyTransform {
  rotX: number;
  rotY: number;
  rotZ: number;
  posX: number;
  posY: number;
  posZ: number;
  scale: number;
}

export const PLAYFUL_TOY_SPECS: ToySpec[] = [
  {
    id: 'abc-block',
    label: 'ABC Learning Block',
    side: -1,
    baseY: 2.35,
    baseZ: -0.2,
    scrollRotSpeedX: Math.PI * 2.2,
    scrollRotSpeedY: Math.PI * 3.6,
    scrollRotSpeedZ: Math.PI * 0.8,
    parallaxY: -0.95,
    baseScale: 0.78,
  },
  {
    id: 'plane',
    label: 'Paper & Wood Biplane',
    side: 1,
    baseY: 2.25,
    baseZ: -0.1,
    scrollRotSpeedX: Math.PI * 1.2,
    scrollRotSpeedY: Math.PI * 3.0,
    scrollRotSpeedZ: -Math.PI * 1.4,
    parallaxY: 1.05,
    baseScale: 0.76,
  },
  {
    id: 'stacker',
    label: 'Rainbow Ring Stacker',
    side: -1,
    baseY: 0.05,
    baseZ: -0.4,
    scrollRotSpeedX: Math.PI * 1.4,
    scrollRotSpeedY: Math.PI * 3.2,
    scrollRotSpeedZ: -Math.PI * 0.9,
    parallaxY: -0.75,
    baseScale: 0.74,
  },
  {
    id: 'star',
    label: 'Golden Achiever Star',
    side: 1,
    baseY: -0.25,
    baseZ: -0.2,
    scrollRotSpeedX: Math.PI * 1.6,
    scrollRotSpeedY: -Math.PI * 4.0,
    scrollRotSpeedZ: Math.PI * 1.2,
    parallaxY: -0.95,
    baseScale: 0.78,
  },
  {
    id: 'pencil',
    label: 'Sunshine Craft Pencil',
    side: -1,
    baseY: -2.25,
    baseZ: -0.3,
    scrollRotSpeedX: -Math.PI * 1.8,
    scrollRotSpeedY: Math.PI * 3.8,
    scrollRotSpeedZ: Math.PI * 2.0,
    parallaxY: 1.15,
    baseScale: 0.78,
  },
];

export function computeScrollProgress(
  scrollY: number,
  scrollHeight: number,
  viewportHeight: number,
): number {
  const maxScroll = Math.max(0, scrollHeight - viewportHeight);
  if (maxScroll <= 0) {
    return 0;
  }
  const raw = scrollY / maxScroll;
  return Math.max(0, Math.min(1, raw));
}

export function computeToyTransform(
  spec: ToySpec,
  scrollProgress: number,
  pointerX: number,
  pointerY: number,
  clickSpinOffset: number,
  clickBounce: number,
  aspectRatio: number,
): ToyTransform {
  const clampedScroll = Math.max(0, Math.min(1, scrollProgress));
  const clampedPX = Math.max(-1, Math.min(1, pointerX));
  const clampedPY = Math.max(-1, Math.min(1, pointerY));

  // Camera sits at z=11.5 with fov=42deg -> visible half height at z=0 is ~4.41
  const visibleHalfHeight = 4.41;
  const visibleHalfWidth = visibleHalfHeight * Math.max(0.55, aspectRatio);

  // Hug outer decorative flanks cleanly so toys never obscure centered content
  const flankDistance = visibleHalfWidth * 0.86;
  const responsiveScale =
    aspectRatio < 0.85
      ? spec.baseScale * 0.56
      : aspectRatio < 1.25
        ? spec.baseScale * 0.75
        : spec.baseScale;

  const wavePhase = clampedScroll * Math.PI * 2;
  const rotX = 0.25 + clampedScroll * spec.scrollRotSpeedX + clampedPY * 0.28;
  const rotY = -0.35 + clampedScroll * spec.scrollRotSpeedY + clampedPX * 0.36 + clickSpinOffset;
  const rotZ = 0.12 + clampedScroll * spec.scrollRotSpeedZ + Math.sin(wavePhase) * 0.14;

  const posX = spec.side * flankDistance + clampedPX * 0.16;
  const posY =
    spec.baseY +
    Math.sin(wavePhase + spec.side * 1.4) * 0.28 +
    (clampedScroll - 0.5) * spec.parallaxY +
    clickBounce * 0.36;
  const posZ = spec.baseZ + clickBounce * 0.24;
  const scale = responsiveScale * (1 + clickBounce * 0.16);

  return { rotX, rotY, rotZ, posX, posY, posZ, scale };
}
