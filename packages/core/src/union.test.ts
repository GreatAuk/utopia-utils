import { union } from './union'

describe('union', () => {
  it('should return the union of two arrays', () => {
    expect(union([1, 2, 3], [2, 3, 4])).toEqual([1, 2, 3, 4])
  })
  it('should return the union of multiple arrays', () => {
    expect(union([1, 2, 3], [2, 3, 4], [3, 4, 5])).toEqual([1, 2, 3, 4, 5])
  })
  it('should not flatten nested arrays', () => {
    expect(union([1, 2, 3], [2, 3, [4]])).toEqual([1, 2, 3, [4]])
  })
})
