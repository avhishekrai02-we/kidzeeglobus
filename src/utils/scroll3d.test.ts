import test from 'node:test';
import assert from 'node:assert/strict';
import {
  PLAYFUL_TOY_SPECS,
  computeScrollProgress,
  computeToyTransform,
} from './scroll3d';

test('computeScrollProgress clamps smoothly between 0 and 1', () => {
  assert.equal(computeScrollProgress(0, 3000, 900), 0);
  assert.equal(computeScrollProgress(1050, 3000, 900), 0.5);
  assert.equal(computeScrollProgress(2100, 3000, 900), 1);
  assert.equal(computeScrollProgress(9999, 3000, 900), 1);
  assert.equal(computeScrollProgress(-20, 3000, 900), 0);
  assert.equal(computeScrollProgress(100, 800, 900), 0);
});

test('computeToyTransform rotates toys meaningfully as scroll progress increases', () => {
  const block = PLAYFUL_TOY_SPECS[0];
  const atTop = computeToyTransform(block, 0, 0, 0, 0, 0, 1.6);
  const atMid = computeToyTransform(block, 0.5, 0, 0, 0, 0, 1.6);
  const atBottom = computeToyTransform(block, 1, 0, 0, 0, 0, 1.6);

  assert.ok(atMid.rotY > atTop.rotY + 4, 'Y rotation should advance substantially on scroll');
  assert.ok(atBottom.rotX > atTop.rotX + 5, 'X rotation should advance substantially on scroll');

  const withClick = computeToyTransform(block, 0.5, 0, 0, Math.PI, 1, 1.6);
  assert.ok(withClick.scale > atMid.scale, 'Click bounce should increase scale');
  assert.ok(withClick.rotY > atMid.rotY, 'Click spin offset should add rotation');
});
