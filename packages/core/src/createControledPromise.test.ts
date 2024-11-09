import { createControledPromise } from './createControledPromise'

describe('createControledPromise', () => {
  it('happy path', async () => {
    vi.useFakeTimers()
    const promise = createControledPromise<number>()
    setTimeout (() => {
      promise.resolve(111)
    }, 60 * 1000)

    vi.runAllTimersAsync()
    const res = await promise

    expect(res).toBe(111)
  })
})
