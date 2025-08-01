import { getCurrentScope, onScopeDispose } from 'vue'
import type { Fn } from '../../types'

/**
 * Call onScopeDispose() if it's inside an effect scope lifecycle, if not, do nothing
 *
 * @param fn
 */
export function tryOnScopeDispose(fn: Fn): boolean {
  if (getCurrentScope()) {
    onScopeDispose(fn)
    return true
  }
  return false
}
