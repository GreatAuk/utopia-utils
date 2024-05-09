import type { Transform } from './type'

export function getScaleMultiplier(delta: number, zoomFactor: number): number {
  const sign = Math.sign(delta)
  const deltaAdjustedSpeed = Math.min(0.25, Math.abs(zoomFactor * delta / 128))
  return 1 - sign * deltaAdjustedSpeed
}

export function applyTransform(dom: HTMLElement, transform: Transform, cb?: (val: Transform) => void): void {
  dom.style.transformOrigin = '0 0 0'
  dom.style.transform = `matrix(${transform.scale}, 0, 0, ${transform.scale}, ${transform.x}, ${transform.y})`
  cb?.(transform)
}
