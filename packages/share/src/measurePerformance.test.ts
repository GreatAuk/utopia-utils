import { measurePerformance } from './measurePerformance'

describe('measurePerformance', () => {
  it('should works', () => {
    const fn = () => {
      let i = 0
      while (i < 100)
        i++
    }

    const consoleTimeEnd = vi.spyOn(console, 'log')
    const diff = measurePerformance(fn)
    expect(consoleTimeEnd).toBeCalledTimes(1)
    expect(typeof diff === 'number').toBe(true)
  })
})
