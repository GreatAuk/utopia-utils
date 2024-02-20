/**
 * Checks the browser's support for specific WebP features.
 * @param feature The WebP feature to check for. Defaults to 'lossy'.
 * @returns A promise that resolves to a boolean indicating whether the feature is supported.
 * @link Official way by Google: https://developers.google.com/speed/webp/faq?hl=zh-cn#how_can_i_detect_browser_support_for_webp
 */
export async function checkWebpFeature(feature: 'lossy' | 'lossless' | 'alpha' | 'animation' = 'lossy') {
  return new Promise<boolean>((resolve) => {
    const kTestImages = {
      lossy: 'UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA',
      lossless: 'UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==',
      alpha: 'UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAARBxAR/Q9ERP8DAABWUDggGAAAABQBAJ0BKgEAAQAAAP4AAA3AAP7mtQAAAA==',
      animation: 'UklGRlIAAABXRUJQVlA4WAoAAAASAAAAAAAAAAAAQU5JTQYAAAD/////AABBTk1GJgAAAAAAAAAAAAAAAAAAAGQAAABWUDhMDQAAAC8AAAAQBxAREYiI/gcA',
    }
    const img = new Image()
    img.onload = function () {
      const res = (img.width > 0) && (img.height > 0)
      resolve(res)
    }
    img.onerror = function () {
      resolve(false)
    }
    img.src = `data:image/webp;base64,${kTestImages[feature]}`
  })
}

/**
 * Checks the browser's support for WebP image format.
 * @returns A promise that resolves to a boolean indicating whether WebP is supported.
 */
export async function checkWebpSupport() {
  return checkWebpFeature('lossy')
}
