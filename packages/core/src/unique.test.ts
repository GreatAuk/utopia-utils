import { unique } from './unique'

describe('unique', () => {
  it('should remove duplicates', () => {
    const arr = [1, 2, 1, null, null, 'a', 'a', undefined, undefined]
    expect(unique(arr)).toEqual([1, 2, null, 'a', undefined])
  })
  it('should throw an error if the argument is not an array', () => {
    expect(() => unique(1 as any)).toThrowError('arr must be an array')
  })
})
