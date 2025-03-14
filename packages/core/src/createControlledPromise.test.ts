import { createControlledPromise } from './createControlledPromise'

describe('createControlledPromise', () => {
  it('happy path', async () => {
    vi.useFakeTimers()
    const promise = createControlledPromise<number>()
    setTimeout (() => {
      promise.resolve(111)
    }, 60 * 1000)

    vi.runAllTimersAsync()
    const res = await promise

    expect(res).toBe(111)
  })
})
