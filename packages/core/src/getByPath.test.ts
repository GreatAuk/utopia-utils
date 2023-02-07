import { getByPath } from './getByPath'

describe('getByPath', () => {
  const obj = {
    a: {
      b: {
        c: 1,
      },
    },
    d: [
      { e: 2 },
      { e: 3 },
    ],
  }

  it('should return the value at the specified path', () => {
    expect(getByPath(obj, 'a.b.c')).toBe(1)
    expect(getByPath(obj, 'd.0')).toBe(obj.d[0])
    expect(getByPath(obj, 'd.1.e')).toBe(3)
  })

  it('should return undefined if the path does not exist', () => {
    // @ts-expect-error for test
    expect(getByPath(obj, 'a.b.c.d')).toBeUndefined()
    expect(getByPath(obj, 'd.2')).toBeUndefined()
  })

  it('should work with arrays', () => {
    // @ts-expect-error TODO: fix this type error ([number] case)
    expect(getByPath(obj, 'd[1]')).toEqual({ e: 3 })
    expect(getByPath(obj, 'd.0.e')).toEqual(2)
  })
})
