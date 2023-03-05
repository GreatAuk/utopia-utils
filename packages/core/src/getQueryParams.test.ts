import { getQueryParams } from './getQueryParams'

describe('getQueryParams', () => {
  it('history router', () => {
    const { name, id, foo } = getQueryParams<{
      name: string[]
      id: string
      foo: string
    }>('http://url.com/page?name=Adam&name=Smith&id=1&foo')
    expect(id).toBe('1')
    expect(name).toEqual(['Adam', 'Smith'])
    expect(foo).toBe(null)
  })
  it('hash router', () => {
    const { name, id, foo } = getQueryParams<{
      name: string[]
      id: string
      foo: string
    }>('http://url.com/page#?name=Adam&name=Smith&id=1&foo#home')
    expect(id).toBe('1')
    expect(name).toEqual(['Adam', 'Smith'])
    expect(foo).toBe(null)
  })
})
