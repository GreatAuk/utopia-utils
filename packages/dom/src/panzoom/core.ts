import type { PanZoomOptions, Transform } from './type'
import { applyTransform, getScaleMultiplier } from './utils'

/**
 * @linkcode https://github.com/GreatAuk/utopia-utils/blob/main/packages/dom/src/panzoom/index.ts
 */
export function panzoom(target: HTMLElement, {
  zoomFactor = 1,
  maxZoom = 5,
  minZoom = 0.2,
  onTransform,
}: PanZoomOptions = {}) {
  const parentNode = target.parentNode as HTMLElement

  if (!parentNode)
    throw new Error('target element must have a parent node!')

  // TODO 为了缩放时以鼠标为中心， parent 最好是 inline-block, 并且宽高自动由 target 决定。target 也不要有 absolute 定位。

  parentNode.style.overflow = 'hidden'
  parentNode.style.userSelect = 'none'

  const transform: Transform = { x: 0, y: 0, scale: 1 }

  let isDragging = false
  let lastMousePosition = {
    x: 0,
    y: 0,
  }

  const mousemove = (e: MouseEvent) => {
    if (!isDragging)
      return
    const dx = e.clientX - lastMousePosition.x
    const dy = e.clientY - lastMousePosition.y
    transform.x = transform.x + dx
    transform.y = transform.y + dy
    window.requestAnimationFrame(() => applyTransform(target, transform, onTransform))
    lastMousePosition = {
      x: e.clientX,
      y: e.clientY,
    }
  }
  const mouseupHandler = () => {
    isDragging = false
    document.removeEventListener('mousemove', mousemove)
    document.removeEventListener('mouseup', mouseupHandler)
  }
  const mousedownHandler = (e: MouseEvent) => {
    isDragging = true
    lastMousePosition = {
      x: e.clientX,
      y: e.clientY,
    }
    document.addEventListener('mousemove', mousemove)
    document.addEventListener('mouseup', mouseupHandler)
  }
  parentNode.addEventListener('mousedown', mousedownHandler)

  function getOffsetXY(e: WheelEvent) {
    // use e.offsetX has a bug for zoom
    const ownerRect = parentNode.getBoundingClientRect()
    const offsetX = e.clientX - ownerRect.left
    const offsetY = e.clientY - ownerRect.top

    return { x: offsetX, y: offsetY }
  }
  const mouseWheelHandler = (e: WheelEvent) => {
    let delta = e.deltaY
    if (e.deltaMode > 0)
      delta *= 100

    const scaleMultiplier = getScaleMultiplier(delta, zoomFactor)

    if (scaleMultiplier !== 1) {
      const offset = getOffsetXY(e)
      zoomTo(offset.x, offset.y, scaleMultiplier)
      window.requestAnimationFrame(() => applyTransform(target, transform, onTransform))

      // Need to prevent the default here or it conflicts with regular page scroll
      e.preventDefault()
    }
  }
  parentNode.addEventListener('wheel', mouseWheelHandler)

  function zoomTo(offsetX: number, offsetY: number, ratio: number) {
    if (Number.isNaN(offsetX) || Number.isNaN(offsetY) || Number.isNaN(ratio))
      throw new Error('zoom requires valid numbers')

    const newScale = transform.scale * ratio

    if (newScale < minZoom) {
      if (transform.scale === minZoom)
        return

      ratio = minZoom / transform.scale
    }
    if (newScale > maxZoom) {
      if (transform.scale === maxZoom)
        return

      ratio = maxZoom / transform.scale
    }

    transform.x = offsetX - ratio * (offsetX - transform.x)
    transform.y = offsetY - ratio * (offsetY - transform.y)

    transform.scale *= ratio
    window.requestAnimationFrame(() => applyTransform(target, transform, onTransform))
  }
}
