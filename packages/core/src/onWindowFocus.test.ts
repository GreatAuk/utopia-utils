/**
 * @vitest-environment happy-dom
 */
import { describe, expect, it, afterEach, beforeEach, vi } from 'vitest'

import { onWindowFocus } from './onWindowFocus'

describe('onWindowFocus', () => {
  let mockCallback: ReturnType<typeof vi.fn>
  let addEventListenerSpy: ReturnType<typeof vi.spyOn>
  let removeEventListenerSpy: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    mockCallback = vi.fn()
    addEventListenerSpy = vi.spyOn(window, 'addEventListener')
    removeEventListenerSpy = vi.spyOn(window, 'removeEventListener')
  })

  afterEach(() => {
    vi.restoreAllMocks()
    vi.clearAllTimers()
  })

  it('should add event listeners for focus and visibilitychange', () => {
    /* 测试事件监听器是否正确添加 */
    onWindowFocus(mockCallback)

    expect(addEventListenerSpy).toHaveBeenCalledWith('focus', expect.any(Function), false)
    expect(addEventListenerSpy).toHaveBeenCalledWith('visibilitychange', expect.any(Function), false)
    expect(addEventListenerSpy).toHaveBeenCalledTimes(2)
  })

  it('should execute callback when window focus event is triggered', () => {
    /* 测试 focus 事件触发回调 */
    vi.useFakeTimers()
    onWindowFocus(mockCallback)

    /* 触发 focus 事件 */
    window.dispatchEvent(new Event('focus'))

    /* 等待 debounce 延迟 */
    vi.advanceTimersByTime(100)

    expect(mockCallback).toHaveBeenCalledTimes(1)
  })

    it('should execute callback when document becomes visible', () => {
    /* 测试文档可见时的 visibilitychange 事件 */
    vi.useFakeTimers()
    onWindowFocus(mockCallback)

    /* 设置文档为可见状态 */
    Object.defineProperty(document, 'visibilityState', {
      value: 'visible',
      writable: true,
    })

    /* 触发 visibilitychange 事件 - 在 window 对象上触发 */
    window.dispatchEvent(new Event('visibilitychange'))

    /* 等待 debounce 延迟 */
    vi.advanceTimersByTime(100)

    expect(mockCallback).toHaveBeenCalledTimes(1)
  })

    it('should not execute callback when document is hidden', () => {
    /* 测试文档隐藏时不触发回调 */
    vi.useFakeTimers()
    onWindowFocus(mockCallback)

    /* 设置文档为隐藏状态 */
    Object.defineProperty(document, 'visibilityState', {
      value: 'hidden',
      writable: true,
    })

    /* 触发 visibilitychange 事件 - 在 window 对象上触发 */
    window.dispatchEvent(new Event('visibilitychange'))

    /* 等待 debounce 延迟 */
    vi.advanceTimersByTime(100)

    expect(mockCallback).not.toHaveBeenCalled()
  })

  it('should debounce multiple rapid focus events', () => {
    /* 测试防抖功能 */
    vi.useFakeTimers()
    onWindowFocus(mockCallback)

    /* 快速触发多次 focus 事件 */
    window.dispatchEvent(new Event('focus'))
    window.dispatchEvent(new Event('focus'))
    window.dispatchEvent(new Event('focus'))

    /* 在防抖时间内，回调不应该被执行 */
    vi.advanceTimersByTime(50)
    expect(mockCallback).not.toHaveBeenCalled()

    /* 等待完整的防抖延迟后，回调应该只被执行一次 */
    vi.advanceTimersByTime(50)
    expect(mockCallback).toHaveBeenCalledTimes(1)
  })

  it('should return a cleanup function that removes event listeners', () => {
    /* 测试清理函数正确移除事件监听器 */
    const cleanup = onWindowFocus(mockCallback)

    /* 执行清理函数 */
    cleanup()

    expect(removeEventListenerSpy).toHaveBeenCalledWith('focus', expect.any(Function))
    expect(removeEventListenerSpy).toHaveBeenCalledWith('visibilitychange', expect.any(Function))
    expect(removeEventListenerSpy).toHaveBeenCalledTimes(2)
  })

  it('should not execute callback after cleanup', () => {
    /* 测试清理后不再执行回调 */
    vi.useFakeTimers()
    const cleanup = onWindowFocus(mockCallback)

    /* 执行清理 */
    cleanup()

    /* 触发事件 */
    window.dispatchEvent(new Event('focus'))
    vi.advanceTimersByTime(100)

    expect(mockCallback).not.toHaveBeenCalled()
  })

  it('should handle multiple callback arguments', () => {
    /* 测试回调函数接收多个参数 */
    vi.useFakeTimers()
    const mockCallbackWithArgs = vi.fn((...args: any[]) => args)
    onWindowFocus(mockCallbackWithArgs)

    window.dispatchEvent(new Event('focus'))
    vi.advanceTimersByTime(100)

    expect(mockCallbackWithArgs).toHaveBeenCalledTimes(1)
  })

  it('should work with async callbacks', async () => {
    /* 测试异步回调函数 */
    vi.useFakeTimers()
    const asyncCallback = vi.fn(async () => {
      await new Promise(resolve => setTimeout(resolve, 10))
    })

    onWindowFocus(asyncCallback)

    window.dispatchEvent(new Event('focus'))
    vi.advanceTimersByTime(100)

    expect(asyncCallback).toHaveBeenCalledTimes(1)
  })

  it('should handle visibility state edge cases', () => {
    /* 测试 visibilityState 边界情况 */
    vi.useFakeTimers()
    onWindowFocus(mockCallback)

    /* 测试 prerender 状态 */
    Object.defineProperty(document, 'visibilityState', {
      value: 'prerender',
      writable: true,
    })

    window.dispatchEvent(new Event('visibilitychange'))
    vi.advanceTimersByTime(100)

    expect(mockCallback).not.toHaveBeenCalled()
  })
})