import { describe, expect, it } from 'vitest'
import { sleep } from './sleep'

describe('sleep', () => {
  it('should sleep for the specified duration', async () => {
    const startTime = Date.now()
    await sleep(10)
    const endTime = Date.now()
    expect(endTime - startTime).toBeGreaterThanOrEqual(10)
  })
})
