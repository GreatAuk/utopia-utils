import { sleep } from './sleep'

describe('sleep', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })
  it('should sleep for the specified duration', async () => {
    const ms = 90 * 1000
    const startTime = Date.now()
    let endTime = 0

    sleep(ms).then(() => {
      endTime = Date.now()
    })

    await vi.runAllTimersAsync()

    expect(endTime - startTime).toBeGreaterThanOrEqual(ms)
  })
})
