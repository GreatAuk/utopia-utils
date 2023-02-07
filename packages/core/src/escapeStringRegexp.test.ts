import { escapeStringRegexp } from './escapeStringRegexp'

describe('escapeStringRegexp', () => {
  it('main', () => {
    expect(escapeStringRegexp('\\ ^ $ * + ? . ( ) | { } [ ]')).toBe('\\\\ \\^ \\$ \\* \\+ \\? \\. \\( \\) \\| \\{ \\} \\[ \\]')
  })
  it('escapes `-` in a way compatible with PCRE', () => {
    expect(escapeStringRegexp('foo - bar')).toBe('foo \\x2d bar')
  })
})
