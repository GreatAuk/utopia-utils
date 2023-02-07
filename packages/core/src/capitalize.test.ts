import { capitalize } from './capitalize'

describe('capitalize', () => {
  it('should capitalize the first letter of a string', () => {
    expect(capitalize('foo')).toBe('Foo')
  })
})
