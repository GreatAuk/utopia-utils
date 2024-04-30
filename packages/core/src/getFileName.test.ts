import { getFileName } from './getFileName'

describe('getFileName', () => {
  it('should return the file name', () => {
    // http url
    expect(getFileName('http://foo.com/name:png.svg')).toBe('name:png.svg')
    // window file path
    expect(getFileName('C:\\foo\\bar\\baz\\name.txt')).toBe('name.txt')
    // linux file path
    expect(getFileName('/foo/bar/baz/name.txt')).toBe('name.txt')
    expect(getFileName('name.test.text')).toBe('name.test.text')
  })
})
