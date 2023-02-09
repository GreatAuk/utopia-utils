import { memoize } from './memoize'

describe('memoize', () => {
  it('should return a memoized version of the function', () => {
    const add = (a: number, b: number) => a + b
    const addMock = vi.fn(add)
    const addMemoized = memoize(addMock)

    expect(addMemoized(1, 2)).toBe(3)
    expect(addMemoized(1, 2)).toBe(3)
    expect(addMemoized(1, 2)).toBe(3)
    expect(addMock).toHaveBeenCalledTimes(1)
  })
  it('cache operation', () => {
    const add = (a: number, b: number) => a + b
    const addMemoized = memoize(add)
    addMemoized(1, 2)
    addMemoized(1, 2)
    addMemoized(1, 1)

    expect(addMemoized.cache.size).toBe(2)
    expect(addMemoized.cache.get(JSON.stringify([1, 2]))).toBe(3)

    // Modify the result cache.
    addMemoized.cache.set(JSON.stringify([1, 2]), 4)
    expect(addMemoized(1, 2)).toBe(4)

    // clear cache
    addMemoized.clear()
    expect(addMemoized.cache.size).toBe(0)
  })

  it('should support custom serializer', () => {
    const add = (a: number, b: number) => a + b
    const addMemoized = memoize(add, {
      serializer: args => args.join('-'),
    })
    addMemoized(1, 2)
    addMemoized(1, 2)
    addMemoized(1, 1)

    expect(addMemoized.cache.size).toBe(2)
    expect(addMemoized.cache).toMatchInlineSnapshot(`
      Map {
        "1-2" => 3,
        "1-1" => 2,
      }
    `)
    expect(addMemoized.cache.get('1-2')).toBe(3)
  })
})
