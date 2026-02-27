import { getCurrentScope, onScopeDispose } from 'vue'
import type { AnyFn } from '@utopia-utils/type'

/**
 * Call onScopeDispose() if it's inside an effect scope lifecycle, if not, do nothing
 *
 * @param fn
 */
export function tryOnScopeDispose(fn: AnyFn): boolean {
  if (getCurrentScope()) {
    onScopeDispose(fn)
    return true
  }
  return false
}
