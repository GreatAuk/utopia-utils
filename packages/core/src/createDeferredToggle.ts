import type { TimeOut, AnyFn } from '@utopia-utils/type'

/** 延迟显示 / 最短展示的配置 */
export interface DeferredToggleOptions {
  /** 延迟调用 open 的时间(ms)。默认 300 */
  delay?: number
  /** open 被真正触发后，最短必须展示的时间(ms)。默认 500 */
  minDisplayTime?: number
}

export interface DeferredToggle {
  /** 触发“显示”逻辑（可能被延迟） */
  open: () => void
  /** 触发“隐藏”逻辑（可能被延迟以保证最短展示时长） */
  hide: () => void
  /** 立即清理所有定时器，通常在组件卸载或页面跳转时调用 */
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
 * @param openFn 原始“显示”方法
 * @param hideFn 原始“隐藏”方法
 * @param opts 延迟与最短展示时间配置
 */
export function createDeferredToggle(
  openFn: AnyFn,
  hideFn: AnyFn,
  opts: DeferredToggleOptions = {},
): DeferredToggle {
  const { delay = 300, minDisplayTime = 500 } = opts

  type Timer = TimeOut | null
  let openTimer: Timer = null
  let hideTimer: Timer = null
  let startTime: number | null = null
  let isOpen = false

  /* 延迟触发 openFn */
  const open = () => {
    // 如已存在待触发或已展示状态，先重置
    cancel()

    openTimer = setTimeout(() => {
      startTime = Date.now()
      isOpen = true
      openFn()
      // open 已真正执行，将 openTimer 置空，便于 hide 正常判断
      openTimer = null
    }, delay)
  }

  /* 确保满足 minDisplayTime 后再触发 hideFn */
  const hide = () => {
    // (1) 仍在 delay 窗口内，直接取消 openTimer => openFn 从未执行
    if (openTimer) {
      clearTimeout(openTimer)
      openTimer = null
      return
    }

    // (2) openFn 已执行，需要判断最短展示时长
    if (isOpen && startTime !== null) {
      const elapsed = Date.now() - startTime
      const remain = minDisplayTime - elapsed
      if (remain > 0) {
        hideTimer = setTimeout(() => {
          hideFn()
          reset()
        }, remain)
      } else {
        hideFn()
        reset()
      }
    }
  }

  /* 立即终止一切计时器，不调用 openFn/hideFn */
  const cancel = () => {
    if (openTimer) clearTimeout(openTimer)
    if (hideTimer) clearTimeout(hideTimer)
    openTimer = hideTimer = null
    reset()
  }

  /* 重置内部状态 */
  const reset = () => {
    startTime = null
    isOpen = false
  }

  return { open, hide, cancel }
}