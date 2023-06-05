interface LoadScriptOptions {
  /**
   * Add `async` attribute to the script tag
   * @default true
   */
  async?: boolean
  /**
   * Add `defer` attribute to the script tag
   */
  defer?: boolean
  /**
   * Script type
   *
   * @default 'text/javascript'
   * @see https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/script#attr-type
   */
  type?: string
  crossOrigin?: 'anonymous' | 'use-credentials'
  /**
   * @see https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/script#attr-referrerpolicy
  */
  referrerPolicy?: 'no-referrer' | 'no-referrer-when-downgrade' | 'origin' | 'origin-when-cross-origin' | 'same-origin' | 'strict-origin' | 'strict-origin-when-cross-origin' | 'unsafe-url'
  noModule?: boolean
  /**
   * Add custom attribute to the script tag
   *
   */
  attrs?: Record<string, string>
  /**
   * Append the script tag to the document.head or document.body
   * @default 'head'
   */
  appendPosition?: 'head' | 'body'
  onStatusChange?: (status: 'loading' | 'loaded' | 'error') => void
}

/**
 * It loads a script tag into the DOM
 * @param {string} src - The URL of the script to load.
 * @param {LoadScriptOptions} [options] - LoadScriptOptions
 * @returns An object with two properties:
 *   - unload: a function that removes the script tag
 *   - scriptTag: the script tag that was created
 * @source https://github.com/GreatAuk/utopia-utils/blob/main/packages/dom/src/loadScript.ts
 */
export function loadScript(src: string, options?: LoadScriptOptions) {
  const {
    async = true,
    defer,
    type = 'text/javascript',
    crossOrigin,
    referrerPolicy,
    attrs = {},
    noModule,
    appendPosition = 'head',
    onStatusChange,
  } = options || {}
  let scriptTag = document.querySelector<HTMLScriptElement>(`script[src="${src}"]`)

  // if the script is exist, it has high probability loaded
  if (scriptTag)
    onStatusChange?.('loaded')

  if (!scriptTag) {
    scriptTag = document.createElement('script')
    scriptTag.src = src
    scriptTag.type = type
    scriptTag.async = async

    if (defer)
      scriptTag.defer = defer
    if (crossOrigin)
      scriptTag.crossOrigin = crossOrigin
    if (referrerPolicy)
      scriptTag.referrerPolicy = referrerPolicy
    if (noModule)
      scriptTag.noModule = noModule
    Object.entries(attrs).forEach(([name, value]) => scriptTag?.setAttribute(name, value))

    const appendTarget = appendPosition === 'head' ? document.head : document.body
    appendTarget.appendChild(scriptTag)
    onStatusChange?.('loading')
  }

  scriptTag?.addEventListener('load', () => {
    onStatusChange?.('loaded')
  })
  scriptTag?.addEventListener('error', () => {
    onStatusChange?.('error')
  })
  scriptTag?.addEventListener('abort', () => {
    onStatusChange?.('error')
  })

  return {
    /** remove the script tag */
    unload: () => unload(src),
    scriptTag,
  }
}

/** remove the script tag */
function unload(src: string) {
  const script = document.querySelector(`script[src="${src}"]`)
  if (script)
    script.remove()
}
