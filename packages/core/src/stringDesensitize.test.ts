import { describe, expect, it } from 'vitest'

import { desensitizeIDCard, desensitizeName, desensitizePhone } from './stringDesensitize'

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

  it('desensitizeIDCard', () => {
    expect(desensitizeIDCard()).toBeUndefined()
    expect(desensitizeIDCard('')).toBe('')

    expect(desensitizeIDCard('12345678901234567X')).toMatchInlineSnapshot(`"123456********567X"`)
    expect(desensitizeIDCard('12345678901234567x')).toMatchInlineSnapshot(`"123456********567x"`)
    expect(desensitizeIDCard('123456789012345678')).toMatchInlineSnapshot(`"123456********5678"`)

    expect(desensitizeIDCard('12345678901234567X', 'medium')).toMatchInlineSnapshot(`"123************67X"`)
    expect(desensitizeIDCard('12345678901234567x', 'medium')).toMatchInlineSnapshot(`"123************67x"`)
    expect(desensitizeIDCard('123456789012345678', 'medium')).toMatchInlineSnapshot(`"123************678"`)

    expect(desensitizeIDCard('12345678901234567X', 'high')).toMatchInlineSnapshot(`"1****************X"`)
    expect(desensitizeIDCard('12345678901234567x', 'high')).toMatchInlineSnapshot(`"1****************x"`)
    expect(desensitizeIDCard('123456789012345678', 'high')).toMatchInlineSnapshot(`"1****************8"`)
  })
})
