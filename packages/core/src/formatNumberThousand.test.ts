import { formatNumberThousand } from './formatNumberThousand'

describe('formatNumberThousand', () => {
  it('should format number with default options', () => {
    const num = 1234567
    const expected = '1,234,567'
    const result = formatNumberThousand(num)
    expect(result).toBe(expected)
  })

  it('should format number with custom options', () => {
    const num = 1234.56789
    const options = {
      precision: 2,
      groupSeparator: '-',
    }
    const expected = '1-234.56'
    const result = formatNumberThousand(num, options)
    expect(result).toBe(expected)
  })

  it('should return empty string for NaN', () => {
    const num = NaN
    const expected = ''
    const result = formatNumberThousand(num)
    expect(result).toBe(expected)
  })
})
