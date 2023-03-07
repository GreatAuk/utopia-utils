import { deepClone } from './deepClone'

describe('deepClone', () => {
  it('Returns equal data for Null/undefined/functions/etc', () => {
    // Null
    expect(deepClone(null)).toBeNull()

    // Undefined
    expect(deepClone(undefined)).toBeUndefined()

    // Function
    const func = () => {}
    expect(deepClone(func)).toBe(func)

    // Etc: numbers and string
    expect(deepClone(5)).toBe(5)
    expect(deepClone('string')).toBe('string')
    expect(deepClone(false)).toBe(false)
    expect(deepClone(true)).toBe(true)
  })
  it('Returns equal data for Date', () => {
    const date = '2012-01-26T13:51:50.417Z'
    expect(deepClone(new Date(date))).toEqual(new Date(date))
  })

  it('Returns equal data for RegExp', () => {
    const regexp = /^$/
    expect(deepClone(regexp)).toEqual(regexp)
  })

  it('Returns equal data for Arrays', () => {
    const tests = [
      [5, 5, 8, 'string'], // Flat
      [5, 5, 8, { a: 'string' }, [7, 9]], // Attached
    ]

    tests.forEach((src) => {
      const copy = deepClone(src)

      expect(src).toEqual(copy)
    })
  })

  it('Returns equal data for Object', () => {
    const src = {
      a: 5,
      b: 6,
    }

    const copy = deepClone(src)

    expect(src).toEqual(copy)
  })

  it('Returns equal data for Map', () => {
    const src = new Map([['foo', 'bar']])

    const copy = deepClone(src)

    expect(src).toEqual(copy)
  })

  it('Returns equal data for Set', () => {
    const src = new Set(['foo', 'bar'])

    const copy = deepClone(src)

    expect(src).toEqual(copy)
  })

  test('Doesn\'t clone function', () => {
    const src = function b() {}

    const copy = deepClone(src)

    expect(copy).toBe(src)
  })

  test('Clones Date object', () => {
    const src = new Date()

    const copy = deepClone(src)

    copy.setHours(src.getHours() + 1) // +1 hour

    expect(copy.getHours()).not.toBe(src.getHours())
  })

  test('Clones RegExp', () => {
    const src = /\d/g

    const copy = deepClone(src)

    expect(copy).not.toBe(src)
  })

  test('Clones Array with nested data', () => {
    const src = [1, 'hello', [null, 'lalka']]

    let copy = deepClone(src)

    // @ts-expect-error for test
    copy[2][0] = 'mutated'
    // @ts-expect-error for test
    expect(src[2][0]).toBeNull()

    copy = copy.map(_ => 'mutated')

    expect(src.every(i => i !== 'mutated')).toBeTruthy()
  })

  test('Clones nested Arrays', () => {
    // @ts-expect-error for test
    const src = []
    // @ts-expect-error for test
    src.push(src, 2, src, 3)

    const copy = deepClone(src)
    expect(copy[0]).toEqual(copy)
    expect(src[0]).toEqual(src)
    expect(copy[0]).not.toBe(src[0])
  })

  test('Clones nested Objects', () => {
    const src = { a: 1, b: { c: 1, d: [1, 2, 3] } }
    const srcValues = { a: 1, b: { c: 1, d: [1, 2, 3] } }

    const copy = deepClone(src)
    copy.a = 2
    // @ts-expect-error for test
    copy.b.c = 'asdf'
    copy.b.d[1] = 4
    expect(src).toEqual(srcValues)
  })

  it('clones circular data', () => {
    const a = { foo: 'bar' }
    // @ts-expect-error for test
    a.baz = a
    const b = { foo: 'bar' }
    // @ts-expect-error for test
    b.baz = b
    expect(deepClone(a)).toEqual(b)
  })

  it('Clones Map', () => {
    const src = new Map([['foo', 'bar']])

    const copy = deepClone(src)

    copy.set('foo', 'baz')

    expect(src.get('foo')).toEqual('bar')
  })

  it('Clones Set', () => {
    const src = new Set(['foo', 'bar'])

    const copy = deepClone(src)

    copy.add('baz')

    expect(src.has('baz')).toBeFalsy()
  })

  it('circular deps', () => {
    const src = {
      a: 1,
      test: new Map(),
    }
    src.test.set('key', src)

    const copy = deepClone(src)

    copy.a = 2

    expect(src.a === copy.a).toBeFalsy()
    expect(src.test.get('key') === copy.test.get('key')).toBeFalsy()
  })
  it('clone dom', () => {
    const div = document.createElement('div')
    div.innerHTML = '<span>hello</span>'
    const clone = deepClone(div)
    expect(clone).not.toBe(div)
    expect(clone.innerHTML).toBe('<span>hello</span>')
  })
})
