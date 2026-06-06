/**
 * Property 1: Magnetic Button Offset Clamping
 * Validates: Requirements 3.8
 *
 * For any (mouseX, mouseY, rect) inputs, both x and y of the return value are in [-10, 10].
 */
import { describe, it, expect } from 'vitest';
import fc from 'fast-check';
import { computeMagneticOffset } from '@/animations/magnetic';

// Arbitrary DOMRect-like object generator
const arbRect = fc.record({
  left: fc.float({ min: 0, max: 1000, noNaN: true }),
  top: fc.float({ min: 0, max: 1000, noNaN: true }),
  width: fc.float({ min: 1, max: 500, noNaN: true }),
  height: fc.float({ min: 1, max: 500, noNaN: true }),
  right: fc.constant(0),
  bottom: fc.constant(0),
  x: fc.constant(0),
  y: fc.constant(0),
  toJSON: fc.constant(() => ''),
}) as unknown as fc.Arbitrary<DOMRect>;

describe('Property 1: Magnetic Button Offset Clamping', () => {
  it('both x and y are always within [-10, 10] for any mouse position and rect', () => {
    fc.assert(
      fc.property(
        fc.float({ min: -5000, max: 5000, noNaN: true }),
        fc.float({ min: -5000, max: 5000, noNaN: true }),
        arbRect,
        (mouseX: number, mouseY: number, rect: DOMRect) => {
          const { x, y } = computeMagneticOffset(mouseX, mouseY, rect);
          expect(x).toBeGreaterThanOrEqual(-10);
          expect(x).toBeLessThanOrEqual(10);
          expect(y).toBeGreaterThanOrEqual(-10);
          expect(y).toBeLessThanOrEqual(10);
        }
      ),
      { numRuns: 100 }
    );
  });
});
