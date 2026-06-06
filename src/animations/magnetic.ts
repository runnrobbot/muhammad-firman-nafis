/**
 * Pure function: computes the magnetic translation offset for a button.
 * Returns a {x, y} offset clamped to [-maxDisplacement, maxDisplacement].
 */
export function computeMagneticOffset(
  mouseX: number,
  mouseY: number,
  rect: DOMRect,
  maxDisplacement: number = 10,
): { x: number; y: number } {
  const safeMax = isNaN(maxDisplacement) || maxDisplacement < 0 ? 10 : maxDisplacement;
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  const distX = mouseX - centerX;
  const distY = mouseY - centerY;
  const clamp = (v: number) => {
    if (isNaN(v)) return 0;
    return Math.max(-safeMax, Math.min(safeMax, v));
  };
  return { x: clamp(distX * 0.2), y: clamp(distY * 0.2) };
}
