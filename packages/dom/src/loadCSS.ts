interface LoadCSSOptions {
  /**
   * Media query for styles to apply
   * @example 'print', 'all', 'screen and (max-width: 768px)' and etc.
   */
  media?: string
  /**
   * Add custom attribute to the script tag
   *
   */
  attrs?: Record<string, string>
}

/**
 * It loads a CSS file into the page
 * @param {string} path - the path to the CSS file
 * @param {LoadCSSOptions} [options] - {
 * @returns An object with two properties:
 *   - unload: a function that removes the script tag
 *   - linkTag: the link tag that was created
 */
export function loadCSS(path: string, options?: LoadCSSOptions) {
  const {
    attrs = {},
    media,
  } = options || {}
  let linkEl = document.querySelector<HTMLLinkElement>(`link[href="${path}"]`)

  if (!linkEl) {
    linkEl = document.createElement('link')
    linkEl.rel = 'stylesheet'
    linkEl.href = path

    if (media)
      linkEl.media = media

    Object.entries(attrs).forEach(([name, value]) => linkEl?.setAttribute(name, value))

    document.head.appendChild(linkEl)
  }

  return {
    /** remove the script tag */
    unload: () => unload(path),
    linkTag: linkEl,
  }
}

/** remove the script tag */
function unload(path: string) {
  const linkEl = document.querySelector(`link[href="${path}"]`)
  if (linkEl)
    linkEl.remove()
}
