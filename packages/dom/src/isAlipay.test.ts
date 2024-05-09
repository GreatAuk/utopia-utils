import { isAlipay } from './isAlipay'

describe('isAlipay', () => {
  afterEach(() => {
    vi.resetAllMocks()
  })
  it('should return false if ua does not contain Alipay', () => {
    expect(isAlipay()).toBe(false)
  })
  it('should return true if ua contains Alipay', () => {
    vi.spyOn(navigator, 'userAgent', 'get').mockReturnValueOnce('Alipay')
    expect(isAlipay()).toBe(true)
  })
})
