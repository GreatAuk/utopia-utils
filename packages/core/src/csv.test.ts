import { arrayToCSV } from './csv'

describe('csv', () => {
  it('arrayToCSV: array of array', () => {
    const csv = arrayToCSV([
      ['a', 'b', 'c'],
      [1, 2, 3],
      ['4', '5', '6'],
    ], {
      withPrefix: true,
    })

    expect(csv).toMatchInlineSnapshot(`
      "data:text/csv;charset=utf-8,a,b,c
      1,2,3
      4,5,6"
    `)
  })

  it('arrayToCSV: array of object', () => {
    const csv = arrayToCSV([
      { a: '1', b: '2', c: '3' },
      { a: '4', b: '5', c: '6' },
    ])

    expect(csv).toMatchInlineSnapshot(`
      "1,2,3
      4,5,6"
    `)
  })

  it('arrayToCSV: empty value', () => {
    const csv = arrayToCSV([
      { a: 0, b: '  ', c: null },
      { a: false, b: '', c: undefined },
    ], {
      withPrefix: true,
    })
    expect(csv).toMatchInlineSnapshot(`
      "data:text/csv;charset=utf-8,0,  ,
      false,,"
    `)
  })

  it('arrayToCSV: options.headers', () => {
    const csv = arrayToCSV([
      { a: 1, b: 2, c: 3 },
    ], {
      headers: ['A', 'B', 'C'],
    })

    expect(csv).toMatchInlineSnapshot(`
      "A,B,C
      1,2,3"
    `)
  })
  it('arrayToCSV: with getRow', () => {
    const csv = arrayToCSV([
      { a: 1, b: 2, c: 3 },
    ], {
      getRow: row => Object.values(row).map(v => v + 10),
    })

    expect(csv).toMatchInlineSnapshot('"11,12,13"')
  })
  it('arrayToCSV: options.separator', () => {
    const csv = arrayToCSV([
      { a: 1, b: 2, c: 3 },
      { a: 10, b: 20, c: 30 },
    ], {
      separator: ';',
      headers: ['A', 'B', 'C'],
    })

    expect(csv).toMatchInlineSnapshot(`
      "A;B;C
      1;2;3
      10;20;30"
    `)
  })
  it('arrayToCSV: item value with double quotes', () => {
    const csv = arrayToCSV([
      { a: 'hello "world"', b: 2, c: 'hello "world"' },
      { a: '"', b: 2, c: '"  "' },
    ], {
      headers: ['"A"', 'B', 'C'],
    })

    expect(csv).toMatchInlineSnapshot(`
      "\\"\\"A\\"\\",B,C
      hello \\"\\"world\\"\\",2,hello \\"\\"world\\"\\"
      \\"\\",2,\\"\\"  \\"\\""
    `)
  })
  it('arrayToCSV: options.prefix', () => {
    const csv = arrayToCSV([[1, 2, 3]], {
      headers: ['A', 'B', 'C'],
      withPrefix: true,
    })

    expect(csv).toMatchInlineSnapshot(`
      "data:text/csv;charset=utf-8,A,B,C
      1,2,3"
    `)
  })
  it('should throw error if options.separator is not valid', () => {
    expect(() => {
      arrayToCSV([
        { a: 1, b: 2, c: 3 },
      ], {
        separator: '',
      })
    }).toThrowError('The separator cannot be empty')
    expect(() => {
      arrayToCSV([
        { a: 1, b: 2, c: 3 },
      ], {
        separator: '||',
      })
    }).toThrowError('The separator must be single-character and cannot be a newline or double quotes')
  })
})
