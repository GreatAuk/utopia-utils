/**
 * @vitest-environment happy-dom
 */
import { isAndroid } from './isAndroid'

describe('isAndroid', () => {
  afterEach(() => {
    vi.resetAllMocks()
  })
  it('return false if not android', () => {
    expect(isAndroid()).toBe(false)
  })
  it('return true if android', () => {
    vi.spyOn(navigator, 'userAgent', 'get').mockReturnValueOnce(('Android'))
    expect(isAndroid()).toBe(true)
  })
})
