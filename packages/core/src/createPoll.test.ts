import { createPoll } from './createPoll'
import { createControlledPromise } from './createControledPromise'

const task = () => 'hello'
const taskP = () => Promise.resolve('hello')
const taskDelay = () => () => new Promise(resolve => setTimeout(resolve, 10))

describe('createPoll', () => {
  // beforeEach(() => {
  //   vi.useFakeTimers()
  // })
  // afterEach(() => {
  //   vi.restoreAllMocks()
  // })
  it('happy path', async () => {
    const promise = createControlledPromise()
    const mockTaskFn = vi.fn().mockImplementation(taskP)

    const { startPoll } = createPoll({
      taskFn: mockTaskFn,
      maxTimes: 3,
      onEnd: () => {
        promise.resolve(undefined)
      },
    })
    startPoll()

    await promise

    expect(mockTaskFn).toHaveBeenCalledTimes(3)
  })

  it('maxTimes', async () => {
    const promise = createControlledPromise()
    let calledTimes = 0

    const { startPoll } = createPoll({
      taskFn: task,
      maxTimes: 3,
      onEnd({ times }) {
        calledTimes = times
        promise.resolve(undefined)
      },
    })
    startPoll()

    await promise

    expect(calledTimes).toBe(3)
  })

  it('call onEachCall every time', async () => {
    const promise = createControlledPromise()
    const mockEachCall = vi.fn()

    const { startPoll } = createPoll({
      taskFn: taskP,
      maxTimes: 3,
      onEachCall: (payload) => {
        mockEachCall(payload)
      },
      onEnd: () => {
        promise.resolve(undefined)
      },
    })
    startPoll()

    await promise

    expect(mockEachCall).toHaveBeenCalledTimes(3)
    expect(mockEachCall).toHaveBeenLastCalledWith({
      times: 3,
      res: 'hello',
      maxTimes: 3,
    })
  })

  it('call onEnd when onEachCall return false', async () => {
    const promise = createControlledPromise()
    const mockEnd = vi.fn()
    let calledTimes = 0

    const { startPoll } = createPoll({
      taskFn: taskP,
      maxTimes: 10,
      onEachCall: ({ times }) => {
        if (times === 3)
          return false
      },
      onEnd: (payload) => {
        mockEnd(payload)
        calledTimes = payload.times
        promise.resolve(undefined)
      },
    })
    startPoll()

    await promise

    expect(calledTimes).toBe(3)
    expect(mockEnd).toHaveBeenCalledTimes(1)
    expect(mockEnd).toHaveBeenLastCalledWith({
      times: 3,
      res: 'hello',
      maxTimes: 10,
    })
  })

  it('call onMaxTimes when maxTimes reached', async () => {
    const promise = createControlledPromise()
    const mockMaxTimes = vi.fn()

    const { startPoll } = createPoll({
      taskFn: taskP,
      maxTimes: 10,
      onMaxTimes: (payload) => {
        mockMaxTimes(payload)
        promise.resolve(undefined)
      },
    })
    startPoll()

    await promise

    expect(mockMaxTimes).toHaveBeenCalledTimes(1)
    expect(mockMaxTimes).toHaveBeenLastCalledWith({
      times: 10,
      res: 'hello',
      maxTimes: 10,
    })
  })

  function executeAfterTwoHours(func) {
    setTimeout(() => {
      setTimeout(() => {
        func()
      }, 100)
    }, 1000 * 60 * 60 * 2) // 2小时
  }
  const mock = vi.fn(() => console.log('executed'))

  // beforeEach(() => {
  //   vi.useFakeTimers()
  // })
  // afterEach(() => {
  //   vi.restoreAllMocks()
  // })
  it('should execute the function', () => {
    executeAfterTwoHours(mock)
    vi.runAllTimers()
    expect(mock).toHaveBeenCalledTimes(1)
  })
  it('interval', async () => {
    const promise = createControlledPromise()

    const { startPoll } = createPoll({
      taskFn: taskP,
      maxTimes: 3,
      interval: 2,
      onEnd: () => {
        promise.resolve(undefined)
      },
    })

    // vi.useFakeTimers()

    const start = Date.now()

    startPoll()

    // await vi.advanceTimersByTime(2000)

    await promise
    const end = Date.now()

    expect(end - start).toMatchInlineSnapshot(`11`)
  })
})
