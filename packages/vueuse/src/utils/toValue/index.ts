import { unref } from 'vue'
import type { AnyFn } from '@vueuse/core'
import type { MaybeRefOrGetter } from '../../types'

/**
 * Get the value of value/ref/getter.
 */
export function toValue<T>(r: MaybeRefOrGetter<T>): T {
  return typeof r === 'function'
    ? (r as AnyFn)()
    : unref(r)
}
