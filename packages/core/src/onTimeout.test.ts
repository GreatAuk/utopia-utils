import { describe, expect, it, vi } from 'vitest'

import { onTimeout } from './onTimeout'

describe('onTimeout', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })
  afterEach(() => {
    vi.restoreAllMocks()
  })
  it('should execute the callback', () => {
    const callback = vi.fn()
    onTimeout(callback, 1000)
    vi.runAllTimers()
    expect(callback).toHaveBeenCalledOnce()
  })
  it('should call the callback after the timeout', () => {
    const start = Date.now()
    let end = 0
    const callback = vi.fn(() => {
      end = Date.now()
    })
    const timeout = 100
    onTimeout(callback, timeout)
    vi.runAllTimers()
    expect(callback).toHaveBeenCalled()

    const diff = end - start
    expect(diff).toBeGreaterThanOrEqual(timeout)
  })
  it('should call the callback with the given arguments', async () => {
    const callback = vi.fn()
    const args = [1, 2, 3]
    onTimeout(callback, 100, ...args)
    vi.runAllTimers()
    expect(callback).toHaveBeenCalledWith(...args)
  })
  it('return value:removeTimeout should remove the timeout', async () => {
    const callback = vi.fn()
    const timeout = 100
    const start = Date.now()
    const { removeTimeout } = onTimeout(callback, timeout)
    removeTimeout()
    vi.runAllTimers()
    const end = Date.now()
    expect(callback).not.toHaveBeenCalled()
    expect(end - start).toBeLessThan(timeout)
  })
})
