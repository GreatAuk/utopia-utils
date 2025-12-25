import type { TimeOut, AnyFn } from '@utopia-utils/type'

/** 延迟显示 / 最短展示的配置 */
export interface DeferredToggleOptions {
  /** 延迟调用 open 的时间(ms)。默认 300 */
  delay?: number
  /** open 被真正触发后，最短必须展示的时间(ms)。默认 500 */
  minDisplayTime?: number
}

/**
 * createDeferredToggle 返回值
 *
 * 使用泛型参数，保证调用 open/hide 时的参数与原始 openFn/hideFn 一致
 */
export interface DeferredToggle<
  O extends AnyFn = AnyFn,
  H extends AnyFn = AnyFn,
> {
  /**
   * 触发"显示"逻辑（可能被延迟）
   * 参数与传入的 openFn 完全一致
   */
  open: (...args: Parameters<O>) => void
  /**
   * 触发"隐藏"逻辑（可能被延迟以保证最短展示时长）
   * 参数与传入的 hideFn 完全一致
   */
  hide: (...args: Parameters<H>) => void
  /**
   * 立即清理所有定时器，通常在组件卸载或页面跳转时调用
   */
  cancel: () => void
}

/**
 * createDeferredToggle
 * 传入原始 open / hide 方法，返回带防闪烁逻辑的新 open / hide。
 *
 * 规则：
 * 1. openFn → 等待 delay ms(默认 300ms) 再决定是否真正调用原始 open。
 * 2. 若在 delay 之内就调用 hideFn，则 openFn 根本不会被触发。
 * 3. 一旦 openFn 真被触发，就至少保持 minDisplayTime ms(默认 500ms)，再允许 hideFn 真正触发。
 *
 * @param openFn 原始"显示"方法
 * @param hideFn 原始"隐藏"方法
 * @param opts 延迟与最短展示时间配置
 * @example
 * ```ts
 * const { open, hide } = createDeferredToggle(
     () => uni.showLoading({ title: '加载中...' }),
     () => uni.hideLoading({
       noConflict: true, // 微信小程序中避免与 toast 冲突
     }),
     { delay: 300, minDisplayTime: 500 },
   )
 * ```
 * @linkcode https://github.com/GreatAuk/utopia-utils/blob/main/packages/core/src/createDeferredToggle.ts
 */
export function createDeferredToggle<
  O extends AnyFn = AnyFn,
  H extends AnyFn = AnyFn,
>(
  openFn: O,
  hideFn: H,
  opts: DeferredToggleOptions = {},
): DeferredToggle<O, H> {
  const { delay = 300, minDisplayTime = 500 } = opts

  /* 参数校验 */
  if (delay < 0 || minDisplayTime < 0) {
    throw new Error('delay 和 minDisplayTime 不能为负数')
  }

  type Timer = TimeOut | null
  let openTimer: Timer = null
  let hideTimer: Timer = null
  let startTime: number | null = null
  let isOpen = false

  /* 重置内部状态 */
  const reset = () => {
    startTime = null
    isOpen = false
  }

  /* 清理所有计时器 */
  const clearAllTimers = () => {
    if (openTimer) {
      clearTimeout(openTimer)
      openTimer = null
    }
    if (hideTimer) {
      clearTimeout(hideTimer)
      hideTimer = null
    }
  }

  /**
   * 延迟触发 openFn，可接受与 openFn 相同的参数列表
   */
  const open = (...openArgs: Parameters<O>) => {
    /* 清理所有计时器和状态，确保干净的起点 */
    clearAllTimers()
    reset()

    openTimer = setTimeout(() => {
      startTime = Date.now()
      isOpen = true
      /* 透传参数给原始 openFn */
      // eslint-disable-next-line n/no-callback-literal
      openFn(...openArgs)
      /* open 已真正执行，将 openTimer 置空 */
      openTimer = null
    }, delay)
  }

  /**
   * 在满足最短展示时长后触发 hideFn，可接受与 hideFn 相同的参数列表
   */
  const hide = (...hideArgs: Parameters<H>) => {
    /* (1) 仍在 delay 窗口内，直接取消 openTimer => openFn 从未执行 */
    if (openTimer) {
      clearTimeout(openTimer)
      openTimer = null
      reset()
      return
    }

    /* (2) openFn 还未执行或已经完全隐藏，无需处理 */
    if (!isOpen || startTime === null) {
      return
    }

    /* (3) openFn 已执行，需要判断最短展示时长 */
    const elapsed = Date.now() - startTime
    const remain = minDisplayTime - elapsed

    /* 清除之前的 hideTimer（如果多次调用 hide） */
    if (hideTimer) {
      clearTimeout(hideTimer)
      hideTimer = null
    }

    if (remain > 0) {
      /* 还未达到最短展示时长，延迟执行 */
      hideTimer = setTimeout(() => {
        hideFn(...hideArgs)
        hideTimer = null
        reset()
      }, remain)
    } else {
      /* 已经达到最短展示时长，立即执行 */
      hideFn(...hideArgs)
      reset()
    }
  }

  /* 立即终止一切计时器，不调用 openFn/hideFn */
  const cancel = () => {
    clearAllTimers()
    reset()
  }

  return { open, hide, cancel }
}
