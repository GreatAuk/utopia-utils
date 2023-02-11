import { uniqueWith } from './uniqueWith'

describe('uniqueWith', () => {
  it('should return an array with only unique values', () => {
    const input = [1, 2, 3, 4, 5, 1, 2, 3, 4, 5]
    const output = uniqueWith(input, (a, b) => a === b)
    expect(output).toEqual([1, 2, 3, 4, 5])
  })

  it('should return an array with only unique values using a custom comparator', () => {
    const input = [
      { id: 1, name: 'User1' },
      { id: 2, name: 'User2' },
      { id: 3, name: 'User1' },
    ]
    const output = uniqueWith(input, (a, b) => a.name === b.name)
    expect(output).toEqual([
      { id: 1, name: 'User1' },
      { id: 2, name: 'User2' },
    ])
  })
  it('should throw an error if the first argument is not an array', () => {
    const input = { a: 1, b: 2, c: 3 }
    expect(() => uniqueWith(input as any, (a, b) => a === b)).toThrowError('arr must be an array')
  })
})
