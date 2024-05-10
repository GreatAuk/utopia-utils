import { average, sum, toFixedWithoutZeros } from './math'

describe('math functions', () => {
  it('toFixedWithoutZeros', () => {
    expect(toFixedWithoutZeros(0.615, 2)).toBe('0.61')
    expect(toFixedWithoutZeros(10, 2)).toBe('10')
    expect(toFixedWithoutZeros(1.005, 2)).toBe('1')
  })
  it('average', () => {
    expect(average([1, 2, 3])).toBe(2)
    expect(average([1, 3])).toBe(2)
    expect(average([])).toBe(NaN)
    expect(average([{ value: 1 }, { value: 2 }], item => item.value)).toBe(1.5)
  })
  it('sum', () => {
    expect(sum([1, 2, 3])).toBe(6)
    expect(sum([1, 2, 3, 4])).toBe(10)
    expect(sum([])).toBe(0)
    expect(sum([
      { value: 1 },
      { value: 2 },
      { value: 3 },
    ], item => item.value)).toBe(6)
  })
})
