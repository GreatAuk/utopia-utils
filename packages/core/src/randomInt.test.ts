import { randomInt } from './randomInt'

describe('randomInt', () => {
  it('should return a random integer between min and max, inclusive', () => {
    const min = 0
    const max = 10
    const random = randomInt(max, min)
    expect(random).toBeGreaterThanOrEqual(min)
    expect(random).toBeLessThanOrEqual(max)
  })
})
