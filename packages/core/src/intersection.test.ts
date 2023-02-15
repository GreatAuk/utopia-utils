import { intersection } from './intersection'

describe('intersection', () => {
  it('should return intersection of two arrays', () => {
    expect(intersection([1, 2, 2, 3], [2, 3, 3, 4])).toEqual([2, 3])
    expect(intersection([1, 2], [])).toEqual([])
  })
})
