export function clamp(value: number, min: number, max: number) { return Math.min(max, Math.max(min, value)) + 0; }
export function panBounds(width: number, height: number, zoom: number, imageRatio = 1.5) {
  const imageWidth = Math.min(width, height * imageRatio);
  const imageHeight = imageWidth / imageRatio;
  return { x: Math.max(0, (imageWidth * zoom - width) / 2), y: Math.max(0, (imageHeight * zoom - height) / 2) };
}
export function constrainPan(x: number, y: number, bounds: {x:number;y:number}) {
  return { x: clamp(x, -bounds.x, bounds.x), y: clamp(y, -bounds.y, bounds.y) };
}
