import { isIOS } from './isIOS'

describe('isIOS', () => {
  afterEach(() => {
    vi.resetAllMocks()
  })
  it('return false if not ios', () => {
    expect(isIOS()).toBe(false)
  })
  it('return true if ios', () => {
    vi.spyOn(navigator, 'userAgent', 'get').mockReturnValueOnce(('iPad'))
    expect(isIOS()).toBe(true)
  })
})
