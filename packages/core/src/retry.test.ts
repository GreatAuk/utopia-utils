import { retry } from './retry'
import { sleep } from './sleep'

describe('retry', async () => {
  it('throws if retryTime is not a positive number', async () => {
    await expect(() => retry(() => {}, -1)).rejects.toThrowError()
  })

  it('should return the result of the function', async () => {
    const fn = () => Promise.resolve('foo')
    const [err, res] = await retry(fn, 1)
    expect(err).toBe(null)
    expect(res).toBe('foo')
  })

  it('should retry the function', async () => {
    let attempt = 0
    const fn = () => {
      attempt++
      return Promise.resolve('foo')
    }

    const [err, res] = await retry(fn, 2)
    expect(err).toBe(null)
    expect(res).toBe('foo')
    expect(attempt).toBe(1)
  })

  it('should retry the function in retryTime', async () => {
    let callNum = 0
    const fn = () => {
      callNum++
      return Promise.reject(new Error('foo'))
    }
    await retry(fn, 2)
    expect(callNum).toBe(3)

    let callNum2 = 0
    const fn2 = () => {
      callNum2++
      return Promise.reject(new Error('foo'))
    }
    await retry(fn2, 0)
    expect(callNum2).toBe(1)
  })

  it('should retry the function with delay (number)', async () => {
    let callNum = 0
    const fn = () => {
      callNum++
      return Promise.reject(new Error('foo'))
    }
    const startTime = Date.now()
    const [err, res] = await retry(fn, 2, 10)
    const endTime = Date.now()
    expect(err).toBeInstanceOf(Error)
    expect(res).toBe(null)
    expect(callNum).toBe(3)
    expect(endTime - startTime).toBeGreaterThanOrEqual(19)
  })
  it('should retry the function with delay (function return number)', async () => {
    let callNum = 0
    const fn = () => {
      callNum++
      return Promise.reject(new Error('foo'))
    }
    const startTime = Date.now()
    const [err, res] = await retry(fn, 2, (attemptTime) => {
      return attemptTime * 5
    })
    const endTime = Date.now()
    expect(err).toBeInstanceOf(Error)
    expect(res).toBe(null)
    expect(callNum).toBe(3)
    // 1 * 5 + 2 * 5
    expect(endTime - startTime).toBeGreaterThanOrEqual(15)
  })
  it('should retry the function with delay (function return promise)', async () => {
    let callNum = 0
    const fn = () => {
      callNum++
      return Promise.reject(new Error('foo'))
    }
    const startTime = Date.now()
    const [err, res] = await retry(fn, 2, async () => {
      return await sleep(5)
    })
    const endTime = Date.now()
    expect(err).toBeInstanceOf(Error)
    expect(res).toBe(null)
    expect(callNum).toBe(3)
    expect(endTime - startTime).toBeGreaterThanOrEqual(10)
  })
  it('should retry normal function', async () => {
    const sum = (a: number, b: number) => {
      return a + b
    }
    const [err, res] = await retry(() => sum(2, 10), 2)
    expect(err).toBe(null)
    expect(res).toBe(12)
  })
})
