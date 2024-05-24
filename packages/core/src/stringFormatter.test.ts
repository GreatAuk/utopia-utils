import { describe, expect, it } from 'vitest'

import { formatterBankCard, formatterPhoneNumber } from './stringFormatter'

describe('stringFormatter', () => {
  it('formatterBankCard', () => {
    expect(formatterBankCard('1234567890123456')).toMatchInlineSnapshot(`"1234 5678 9012 3456"`)
    expect(formatterBankCard('   1234  56  7890  23456')).toMatchInlineSnapshot(`"1234 5678 9023 456"`)
    expect(formatterBankCard('_  3232 32432 32432  ')).toMatchInlineSnapshot(`"3232 3243 2324 32"`)
    expect(formatterBankCard('_  Sdj 32 32432 jds3232ds  ')).toMatchInlineSnapshot(`"3232 4323 232"`)
    expect(formatterBankCard('')).toMatchInlineSnapshot(`""`)
    expect(formatterBankCard('null')).toMatchInlineSnapshot(`""`)
    // @ts-expect-error test undefined
    expect(formatterBankCard(undefined)).toMatchInlineSnapshot(`""`)
  })

  it('formatterPhoneNumber', () => {
    expect(formatterPhoneNumber('12345678901')).toMatchInlineSnapshot(`"123 4567 8901"`)
    expect(formatterPhoneNumber('123456789012345678901')).toMatchInlineSnapshot(`"123 4567 8901"`)
    expect(formatterPhoneNumber('  SD 123 4567 8901 23fdss  ')).toMatchInlineSnapshot(`"123 4567 8901"`)
    expect(formatterPhoneNumber('')).toMatchInlineSnapshot(`""`)
    expect(formatterPhoneNumber('null')).toMatchInlineSnapshot(`""`)
    // @ts-expect-error test undefined
    expect(formatterPhoneNumber(undefined)).toMatchInlineSnapshot(`""`)
  })
})
