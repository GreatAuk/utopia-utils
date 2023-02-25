import { onlyResolvesLast } from './onlyResolvesLast'

describe('onlyResolvesLast', () => {
  it('should resolve the last call', async () => {
    const foo_ = async (n: number) => {
      return new Promise<number>((resolve) => {
        setTimeout(() => resolve(n), Math.random())
      })
    }
    const foo = onlyResolvesLast(foo_)
    let lastValue = 0

    await Promise.race([
      foo(1).then(v => lastValue = v),
      foo(2).then(v => lastValue = v),
      foo(3).then(v => lastValue = v),
      foo(4).then(v => lastValue = v),
    ])
    expect(lastValue).toBe(4)
  })
  it('should reject the last call', async () => {
    const foo_ = async (n: number) => {
      return new Promise<number>((resolve, reject) => {
        setTimeout(() => reject(n), Math.random())
      })
    }
    const foo = onlyResolvesLast(foo_)
    let lastError = 0

    await Promise.race([
      foo(1).catch(e => lastError = e),
      foo(2).catch(e => lastError = e),
      foo(3).catch(e => lastError = e),
    ])
    expect(lastError).toBe(3)
  })
})
