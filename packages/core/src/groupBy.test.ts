import { groupBy } from './groupBy'

describe('groupBy', () => {
  it('should group by a string', () => {
    const array = [
      { name: 'John', age: 20 },
      { name: 'Jane', age: 25 },
      { name: 'Jack', age: 20 },
    ]

    const result = groupBy(array, item => `${item.age}`)

    expect(result).toEqual({
      20: [
        { name: 'John', age: 20 },
        { name: 'Jack', age: 20 },
      ],
      25: [{ name: 'Jane', age: 25 }],
    })

    const arr2 = [4.2, 6.3, 6.5]
    const result2 = groupBy(arr2, v => `${Math.floor(v)}`)
    expect(result2).toEqual({
      4: [4.2],
      6: [6.3, 6.5],
    })
  })
  it('if options.oneToOne is true, the result will be a Record<K, T> instead of Record<K, T[]>', () => {
    const array = [
      { name: 'John', age: 20 },
      { name: 'Jane', age: 25 },
      { name: 'Jack', age: 20 },
      { name: 'Jack', age: 100 },
    ]

    const result = groupBy(array, item => `${item.name}`, { oneToOne: true })
    expect(result).toEqual({
      John: { name: 'John', age: 20 },
      Jane: { name: 'Jane', age: 25 },
      Jack: { name: 'Jack', age: 100 },
    })
  })
})
