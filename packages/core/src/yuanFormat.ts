import { isNumber } from '@utopia-utils/share'

import { fenToYuan } from './fenToYuan'

interface Options {
  /**
   * 单位，分或元, 如果单位是分，则会将金额转换为元
   * @default 'fen'
   */
  unit?: 'fen' | 'yuan'
}

/**
 * 金额格式化￥ 分转元(如果单位是分)，并保留两位小数，最后添加千位分隔符
 * @param num 金额
 * @param options (单位默认是 分),
 * @returns 格式化后的金额, 如果输入不是数字，则返回 '-'
 * @example
 * ```ts
 * yuanFormat(100) // '1.00'
 * yuanFormat(100, { unit: 'yuan' }) // '100.00'
 * yuanFormat('not number') // '-'
 * ```
 */
export function yuanFormat(num?: number, options?: Options): string | '-' {
  try {
    if (!isNumber(num) || Number.isNaN(num))
      return '-'
    const { unit = 'fen' } = options ?? {}
    const yuan = unit === 'fen' ? fenToYuan(num) : num
    if (yuan === null || yuan === undefined)
      return '-'
    return yuan.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }
  catch (err) {
    console.error(err)
    return '-'
  }
}
