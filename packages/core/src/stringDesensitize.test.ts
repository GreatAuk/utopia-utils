import { describe, expect, it } from 'vitest'

import { desensitizeName, desensitizePhone } from './stringDesensitize'

describe('stringDesensitize', () => {
  it('desensitizeName', () => {
    expect(desensitizeName()).toBeUndefined()
    expect(desensitizeName('')).toBe('')
    expect(desensitizeName('张')).toBe('张')
    expect(desensitizeName('张三')).toMatchInlineSnapshot(`"张*"`)
    expect(desensitizeName('张三丰')).toMatchInlineSnapshot(`"张*丰"`)
    expect(desensitizeName('张二三丰')).toMatchInlineSnapshot(`"张**丰"`)
    expect(desensitizeName('张二三四丰')).toMatchInlineSnapshot(`"张***丰"`)
  })

  it('desensitizePhone', () => {
    expect(desensitizePhone()).toBeUndefined()
    expect(desensitizePhone('')).toBe('')
    expect(desensitizePhone('12345678910')).toMatchInlineSnapshot(`"123****8910"`)
  })
})
