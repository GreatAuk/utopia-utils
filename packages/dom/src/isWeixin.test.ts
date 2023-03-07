import { isWeixin } from './isWeixin'

describe('isWeixin', () => {
  afterEach(() => {
    vi.resetAllMocks()
  })
  it('should return false if ua does not contain MicroMessenger', () => {
    expect(isWeixin()).toBe(false)
  })
  it('should return true if ua contains MicroMessenger', () => {
    vi.spyOn(navigator, 'userAgent', 'get').mockReturnValueOnce('MicroMessenger')
    expect(isWeixin()).toBe(true)
  })
})
