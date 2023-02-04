interface WaitForOptions {
  /** Maximum time to wait in milliseconds, default is 30000 (30s) */
  timeoutMillisecond?: number
  /** Instructs the user agent to observe a given target (a node)
   * @default document.body
   */
  target?: Node
}

/**
 * waits for an element to appear in the DOM
 * @param {string} selector - The CSS selector to wait for.
 * @param {WaitForOptions} [options]
 * @returns A promise that resolves to an element that matches the selector.
 */
export function waitForSelector<T extends Element>(selector: string, options?: WaitForOptions): Promise<T | null> {
  return new Promise((resolve) => {
    if (typeof window.MutationObserver === 'undefined')
      throw new Error('MutationObserver is not supported in this browser')

    const { timeoutMillisecond = 30000, target = document.body } = options || {}
    const timeoutId = setTimeout(onTimeoutDone, timeoutMillisecond)

    const observer = new MutationObserver((mutations) => {
      if (mutations.some(mutation => Array.from(mutation.addedNodes).some(node => node instanceof Element && node.matches(selector)))) {
        clearTimeout(timeoutId)
        checkDom()
      }
    })
    observer.observe(target, {
      childList: true,
      subtree: true,
    })

    checkDom()

    function checkDom() {
      const dom = document.querySelector(selector)
      if (dom) {
        observer.disconnect()
        resolve(dom as T)
      }
    }

    function onTimeoutDone() {
      observer.disconnect()
      resolve(null)
    }
  })
}
