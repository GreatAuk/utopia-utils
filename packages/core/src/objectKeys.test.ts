import { objectKeys } from './objectKeys'

describe('objectKeys', () => {
  it('should return the keys of an object', () => {
    const obj = { a: 1, b: 2, true: 3, null: 4, undefined: 5, 6: 6 }
    expect(objectKeys(obj)).toEqual(['6', 'a', 'b', 'true', 'null', 'undefined'])
  })
})
