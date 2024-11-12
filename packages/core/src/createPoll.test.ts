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
})
