import { isNumber } from '@utopia-utils/share'

import { fenToYuan } from './fenToYuan'

interface Options {
  /**
   * 单位，分或元, 如果单位是分，则会将金额转换为元
   * @default 'fen'
   */
  unit?: 'fen' | 'yuan'
  /**
   * 前缀，如果是 true 则使用 ¥，或者使用传入的字符
   * @default undefined
   */
  prefix?: string | true
  /**
   * 是否在前缀 prefix 和数值之间添加空格
   * @default undefined
   */
  space?: boolean
}

/**
 * 金额格式化￥ 分转元(如果单位是分)，并保留两位小数，最后添加千位分隔符
 * @param num 金额
 * @param options 格式化选项
 * @param options.unit 单位，分或元，如果单位是分，则会将金额转换为元
 * @default 'fen'
 * @param options.prefix 前缀，如果是 true 则使用 ¥，或者使用传入的字符串
 * @default undefined
 * @param options.space 是否在前缀和数值之间添加空格
 * @default undefined
 * @returns 格式化后的金额, 如果输入不是数字，则返回 '-'
 * @example
 * ```ts
 * yuanFormat(100) // '1.00'
 * yuanFormat(100, { unit: 'yuan' }) // '100.00'
 * yuanFormat(100, { prefix: true }) // '¥1.00'
 * yuanFormat(100, { prefix: '元' }) // '元1.00'
 * yuanFormat(100, { prefix: true, space: true }) // '¥ 1.00'
 * yuanFormat(100000, { prefix: 'CNY', space: true }) // 'CNY 1,000.00'
 * yuanFormat(100000, { prefix: '元', space: true }) // '元 1,000.00'
 * yuanFormat('not number') // '-'
 * ```
 */
export function yuanFormat(num?: number, options?: Options): string | '-' {
  try {
    if (!isNumber(num) || Number.isNaN(num) || !Number.isFinite(num))
      return '-'
    const { unit = 'fen', prefix, space } = options ?? {}
    const yuan = unit === 'fen' ? fenToYuan(num) : num
    if (yuan === null || yuan === undefined)
      return '-'

    const formattedAmount = yuan.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')

    if (!prefix)
      return formattedAmount

    const prefixStr = prefix === true ? '¥' : prefix
    const spacing = space ? ' ' : ''

    return `${prefixStr}${spacing}${formattedAmount}`
  }
  catch (err) {
    console.error(err)
    return '-'
  }
}
