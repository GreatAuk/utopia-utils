import { describe, expect, vi } from 'vitest'

import { desensitizeName } from './stringDesensitize'

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
})
