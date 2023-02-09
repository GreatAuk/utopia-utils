export interface PanZoomOptions {
  zoomFactor?: number
  /**
   * @default 5
   */
  maxZoom?: number
  /**
   * @default 0.2
   */
  minZoom?: number
  onTransform?: (transform: Transform) => void
}
export interface Transform {
  x: number
  y: number
  scale: number
}
