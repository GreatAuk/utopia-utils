import type { AnyFn } from '@utopia-utils/type'
import type { DeferredToggleOptions } from '@utopia-utils/core'
import { createDeferredToggle } from '@utopia-utils/core'

import { tryOnScopeDispose } from '../utils'

export interface UseDeferredToggleResult {
  /** 触发“显示”逻辑（可能被延迟） */
  open: () => void
  /** 触发“隐藏”逻辑（可能被延迟以保证最短展示时长） */
  hide: () => void
  /** 立即清理所有定时器，通常在组件卸载或页面跳转时调用 */
  cancel: () => void
}

/**
 * useDeferredToggle
 *
 * 轻量封装 `createDeferredToggle`，在 Vue 组件/EffectScope 内使用时会在作用域
 * 组件销毁时自动 `cancel`，避免计时器泄漏。
 *
 * @param openFn   真正执行“显示”的函数 (例如 uni.showLoading)
 * @param hideFn   真正执行“隐藏”的函数 (例如 uni.hideLoading)
 * @param options  延迟与最短展示时间配置
 */
export function useDeferredToggle(
  openFn: AnyFn,
  hideFn: AnyFn,
  options: DeferredToggleOptions = {},
): UseDeferredToggleResult {
  const { open, hide, cancel } = createDeferredToggle(openFn, hideFn, options)

  // 组件销毁或 effect scope 结束时自动清理
  tryOnScopeDispose(cancel)

  return { open, hide, cancel }
}
