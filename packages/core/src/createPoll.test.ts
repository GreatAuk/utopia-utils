import { createPoll } from './createPoll'

const task = () => 'hello'
const taskDelay = () => new Promise<string>(resolve => setTimeout(() => resolve('hello'), 10))

describe('createPoll', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })
  afterEach(() => {
    vi.restoreAllMocks()
  })
  it('happy path', async () => {
    const mockTaskFn = vi.fn().mockImplementation(taskDelay)
    const mockOnEnd = vi.fn()

    let end = 0
    const { startPoll } = createPoll({
      taskFn: mockTaskFn,
      maxTimes: 3,
      onEnd: () => {
        mockOnEnd()
        end = Date.now()
      },
    })

    const start = Date.now()
    startPoll()
    await vi.runAllTimersAsync()

    expect(mockTaskFn).toHaveBeenCalledTimes(3)
    expect(mockOnEnd).toHaveBeenCalledTimes(1)
    expect(end - start).greaterThanOrEqual(30)
  })

  it('call onMaxTimes when maxTimes reached', async () => {
    const mockTaskFn = vi.fn().mockImplementation(taskDelay)
    const mockOnMaxTimes = vi.fn()

    const { startPoll } = createPoll({
      taskFn: mockTaskFn,
      maxTimes: 10,
      onMaxTimes: mockOnMaxTimes,
    })
    startPoll()

    await vi.runAllTimersAsync()

    expect(mockTaskFn).toHaveBeenCalledTimes(10)
    expect(mockOnMaxTimes).toHaveBeenCalledTimes(1)
    expect(mockOnMaxTimes).toHaveBeenLastCalledWith({
      times: 10,
      res: 'hello',
      maxTimes: 10,
    })
  })

  it('call onEachCall every time', async () => {
    const mockEachCall = vi.fn()

    const { startPoll } = createPoll({
      taskFn: task,
      maxTimes: 3,
      onEachCall: (payload) => {
        mockEachCall(payload)
      },
    })
    startPoll()

    await vi.runAllTimersAsync()

    expect(mockEachCall).toHaveBeenCalledTimes(3)
    expect(mockEachCall).toHaveBeenLastCalledWith({
      times: 3,
      res: 'hello',
      maxTimes: 3,
    })
  })

  it('stop poll when onEachCall return false', async () => {
    const mockEnd = vi.fn()
    let calledTimes = 0

    const { startPoll } = createPoll({
      taskFn: taskDelay,
      maxTimes: 10,
      onEachCall: ({ times }) => {
        if (times === 3)
          return false
      },
      onEnd: (payload) => {
        mockEnd(payload)
        calledTimes = payload.times
      },
    })
    startPoll()

    await vi.runAllTimersAsync()

    expect(calledTimes).toBe(3)
    expect(mockEnd).toHaveBeenCalledTimes(1)
    expect(mockEnd).toHaveBeenLastCalledWith({
      times: 3,
      res: 'hello',
      maxTimes: 10,
    })
  })

  it('interval', async () => {
    let end = 0

    const { startPoll } = createPoll({
      taskFn: taskDelay,
      maxTimes: 3,
      interval: 10,
      onEnd: () => {
        end = Date.now()
      },
    })

    const start = Date.now()
    startPoll()
    await vi.runAllTimersAsync()

    expect(end - start).greaterThanOrEqual(20)
  })

  it('call stopPoll to stop poll', async () => {
    const mockTaskFn = vi.fn().mockImplementation(task)
    const mockOnEnd = vi.fn()

    const { startPoll, stopPoll } = createPoll({
      taskFn: mockTaskFn,
      interval: 10,
      onEnd: () => {
        mockOnEnd()
      },
    })

    startPoll()
    await vi.advanceTimersByTimeAsync(30)
    stopPoll()

    expect(mockTaskFn).toHaveBeenCalledTimes(4)
    expect(mockOnEnd).toHaveBeenCalledTimes(1)
  })

  it('timeout', async () => {
    const timeoutMs = 100
    const mockTaskFn = vi.fn().mockImplementation(taskDelay)
    const mockTimeout = vi.fn()
    const mockOnEnd = vi.fn()

    let end = 0

    const { startPoll } = createPoll({
      taskFn: mockTaskFn,
      interval: 10,
      timeout: timeoutMs,
      onTimeout: mockTimeout,
      onEnd: () => {
        mockOnEnd()
        end = Date.now()
      },
    })

    const start = Date.now()
    startPoll()
    await vi.runAllTimersAsync()

    expect(mockTaskFn).toHaveBeenCalledTimes(5)
    expect(mockTimeout).toHaveBeenCalledTimes(1)
    expect(mockOnEnd).toHaveBeenCalledTimes(1)
    expect(end - start).greaterThanOrEqual(timeoutMs)
  })

  it('options.immediate', async () => {
    const mockTaskFn = vi.fn().mockImplementation(taskDelay)

    const { startPoll } = createPoll({
      taskFn: mockTaskFn,
      interval: 100,
      immediate: false,
      maxTimes: 3,
    })

    startPoll()
    await vi.advanceTimersByTimeAsync(90)
    expect(mockTaskFn).toHaveBeenCalledTimes(0)

    await vi.advanceTimersByTimeAsync(10)
    expect(mockTaskFn).toHaveBeenCalledTimes(1)

    await vi.runAllTimersAsync()
    expect(mockTaskFn).toHaveBeenCalledTimes(3)
  })

  it('call onError when taskFn throws error', async () => {
    const testError = new Error('test error')
    const mockTaskFn = vi.fn().mockImplementation(() => Promise.reject(testError))
    const mockOnError = vi.fn()
    const mockOnEnd = vi.fn()

    const { startPoll, stopPoll } = createPoll({
      taskFn: mockTaskFn,
      interval: 10,
      onError: (payload) => {
        mockOnError(payload)
        return true // 继续轮询
      },
      onEnd: mockOnEnd,
    })

    startPoll()
    await vi.advanceTimersByTimeAsync(30)

    expect(mockTaskFn).toHaveBeenCalledTimes(4)
    expect(mockOnError).toHaveBeenCalledTimes(4)
    expect(mockOnError).toHaveBeenLastCalledWith({
      times: 4,
      error: testError,
      maxTimes: 0,
    })
    expect(mockOnEnd).not.toHaveBeenCalled()

    stopPoll()
    expect(mockOnEnd).toHaveBeenCalledTimes(1)
  })

  it('stop poll when onError returns false', async () => {
    const testError = new Error('test error')
    const mockTaskFn = vi.fn().mockImplementation(() => Promise.reject(testError))
    const mockOnError = vi.fn().mockReturnValue(false)
    const mockOnEnd = vi.fn()

    const { startPoll } = createPoll({
      taskFn: mockTaskFn,
      interval: 10,
      maxTimes: 10,
      onError: mockOnError,
      onEnd: mockOnEnd,
    })

    startPoll()
    await vi.runAllTimersAsync()

    expect(mockTaskFn).toHaveBeenCalledTimes(1)
    expect(mockOnError).toHaveBeenCalledTimes(1)
    expect(mockOnError).toHaveBeenCalledWith({
      times: 1,
      error: testError,
      maxTimes: 10,
    })
    expect(mockOnEnd).toHaveBeenCalledTimes(1)
    expect(mockOnEnd).toHaveBeenCalledWith({
      times: 1,
      res: undefined,
      maxTimes: 10,
      error: testError,
    })
  })

  it('stops when maxTimes reached after consecutive errors', async () => {
    /** testError: 连续失败时抛出的错误 */
    const testError = new Error('persistent error')
    /** mockTaskFn: 持续抛出错误的任务函数 */
    const mockTaskFn = vi.fn().mockRejectedValue(testError)
    /** mockOnError: 记录错误回调的调用信息 */
    const mockOnError = vi.fn()
    /** mockOnEnd: 记录结束回调的调用信息 */
    const mockOnEnd = vi.fn()

    const { startPoll } = createPoll({
      taskFn: mockTaskFn,
      interval: 10,
      maxTimes: 3,
      onError: mockOnError,
      onEnd: mockOnEnd,
    })

    startPoll()
    await vi.runAllTimersAsync()

    expect(mockTaskFn).toHaveBeenCalledTimes(3)
    expect(mockOnError).toHaveBeenCalledTimes(3)
    expect(mockOnError).toHaveBeenLastCalledWith({
      times: 3,
      error: testError,
      maxTimes: 3,
    })
    expect(mockOnEnd).toHaveBeenCalledTimes(1)
    expect(mockOnEnd).toHaveBeenCalledWith({
      times: 3,
      res: undefined,
      maxTimes: 3,
      error: testError,
    })
  })

  it('handles synchronous error from taskFn', async () => {
    /** testError: 同步抛出的错误实例 */
    const testError = new Error('sync error')
    const mockTaskFn = vi.fn().mockImplementation(() => {
      throw testError
    })
    const mockOnError = vi.fn().mockReturnValue(false)
    const mockOnEnd = vi.fn()

    const { startPoll } = createPoll({
      taskFn: mockTaskFn,
      interval: 10,
      onError: mockOnError,
      onEnd: mockOnEnd,
    })

    startPoll()
    await vi.runAllTimersAsync()

    expect(mockTaskFn).toHaveBeenCalledTimes(1)
    expect(mockOnError).toHaveBeenCalledTimes(1)
    expect(mockOnError).toHaveBeenCalledWith({
      times: 1,
      error: testError,
      maxTimes: 0,
    })
    expect(mockOnEnd).toHaveBeenCalledTimes(1)
    expect(mockOnEnd).toHaveBeenCalledWith({
      times: 1,
      res: undefined,
      maxTimes: 0,
      error: testError,
    })
  })

  it('getPollStatus returns current polling status', async () => {
    const mockTaskFn = vi.fn().mockImplementation(taskDelay)

    const { startPoll, getPollStatus, stopPoll } = createPoll({
      taskFn: mockTaskFn,
      interval: 10,
      maxTimes: 5,
    })

    // 初始状态
    expect(getPollStatus()).toEqual({
      isPolling: false,
      times: 0,
      maxTimes: 5,
    })

    startPoll()
    expect(getPollStatus().isPolling).toBe(true)

    // 执行一次后
    await vi.advanceTimersByTimeAsync(15)
    expect(getPollStatus()).toEqual({
      isPolling: true,
      times: 1,
      maxTimes: 5,
    })

    // 手动停止
    stopPoll()
    expect(getPollStatus().isPolling).toBe(false)
  })

  it('throws error for invalid parameter values', () => {
    const mockTaskFn = vi.fn()

    // 测试负数 interval
    expect(() => {
      createPoll({
        taskFn: mockTaskFn,
        interval: -10,
      })
    }).toThrow('interval must be a non-negative number')

    // 测试负数 maxTimes
    expect(() => {
      createPoll({
        taskFn: mockTaskFn,
        maxTimes: -5,
      })
    }).toThrow('maxTimes must be a non-negative number')

    // 测试负数 timeout
    expect(() => {
      createPoll({
        taskFn: mockTaskFn,
        timeout: -100,
      })
    }).toThrow('timeout must be a non-negative number')
  })

  it('works with non-Promise return values', async () => {
    const mockOnEachCall = vi.fn()
    const mockTaskFn = vi.fn().mockReturnValue(42)
    const mockOnEnd = vi.fn()

    const { startPoll } = createPoll({
      taskFn: mockTaskFn,
      maxTimes: 3,
      interval: 5,
      onEachCall: (payload) => {
        mockOnEachCall(payload)
      },
      onEnd: mockOnEnd,
    })

    startPoll()
    await vi.runAllTimersAsync()

    expect(mockTaskFn).toHaveBeenCalledTimes(3)
    expect(mockOnEachCall).toHaveBeenCalledTimes(3)
    expect(mockOnEachCall).toHaveBeenLastCalledWith({
      times: 3,
      res: 42,
      maxTimes: 3,
    })
    expect(mockOnEnd).toHaveBeenCalledTimes(1)
    expect(mockOnEnd).toHaveBeenCalledWith({
      times: 3,
      res: 42,
      maxTimes: 3,
    })
  })
})
