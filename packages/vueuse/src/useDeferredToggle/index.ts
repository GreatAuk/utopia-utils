import type { AnyFn } from '@utopia-utils/type'
import type { DeferredToggleOptions } from '@utopia-utils/core'
import { createDeferredToggle } from '@utopia-utils/core'

import { tryOnScopeDispose } from '../utils'

export interface UseDeferredToggleResult<O extends AnyFn, H extends AnyFn> {
  /** 触发“显示”逻辑（可能被延迟） */
  open: (...args: Parameters<O>) => void
  /** 触发“隐藏”逻辑（可能被延迟以保证最短展示时长） */
  hide: (...args: Parameters<H>) => void
  /** 立即清理所有定时器，通常在组件卸载或页面跳转时调用 */
  cancel: () => void
}

/**
 * useDeferredToggle
 *
 * 传入原始 open / hide 方法，返回带防闪烁逻辑的新 open / hide。
 *
 * @param openFn   真正执行“显示”的函数 (例如 uni.showLoading)
 * @param hideFn   真正执行“隐藏”的函数 (例如 uni.hideLoading)
 * @param options  延迟与最短展示时间配置
 * @example
 * ```ts
 * const { open, hide } = useDeferredToggle(
      () => uni.showLoading({ title: '加载中...' }),
      () => uni.hideLoading({
        noConflict: true, // 微信小程序中避免与 toast 冲突
      }),
      { delay: 300, minDisplayTime: 500 },
    )
 * ```
 * @see https://github.com/GreatAuk/utopia-utils/blob/main/packages/vueuse/src/useDeferredToggle/README.md
 */
export function useDeferredToggle<O extends AnyFn, H extends AnyFn>(
  openFn: O,
  hideFn: H,
  options: DeferredToggleOptions = { delay: 300, minDisplayTime: 500 },
): UseDeferredToggleResult<O, H> {
  const { open, hide, cancel } = createDeferredToggle(openFn, hideFn, options)

  // 组件销毁或 effect scope 结束时自动清理
  tryOnScopeDispose(cancel)

  return { open, hide, cancel }
}
