import { debounce } from './vendor'

/**
 * The `onWindowFocus` function adds an event listener when the window gains focus or becomes visible after being hidden.
 * @param callback - The `callback` parameter is a function that will be executed when the window gains
 * focus or becomes visible.
 * @returns The function `onWindowFocus` returns a function that can be used to remove the event
 * listeners that were added.
 * @example
 * ```ts
 * const removeListener = onWindowFocus(() => {console.log('Window is focused')})
 *
 * // Remove the event listeners
 * removeListener()
 * ```
 *
 */
export function onWindowFocus(callback: (...args: any[]) => any): () => void {
  const listener = debounce(100, callback)

  const visibilitychangeListener = () => {
    if (document.visibilityState === 'visible')
      listener()
  }

  window.addEventListener('focus', listener, false)
  window.addEventListener('visibilitychange', visibilitychangeListener, false)

  return () => {
    window.removeEventListener('focus', listener)
    window.removeEventListener('visibilitychange', visibilitychangeListener)
  }
}
