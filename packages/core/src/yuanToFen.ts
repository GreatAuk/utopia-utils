import { times } from 'number-precision'
import { isNumber } from '@utopia-utils/share'

/**
 * 金额￥ 元转分
 * @param yuan 元
 * @returns 分, 如果输入不是数字，则返回 undefined
 * @example
 * ```ts
 * yuanToFen(1) // 100
 * yuanToFen(0.99) // 99
 * yuanToFen('not number') // undefined
 * yuanToFen('1.23') // 123
 * ```
 */
export function yuanToFen(yuan: number | string | undefined): number | undefined {
  try {
    /* 处理非数字输入 */
    if (yuan === undefined || yuan === null || yuan === '')
      return undefined

    /* 尝试将字符串转换为数字 */
    const numValue = typeof yuan === 'string' ? Number(yuan) : yuan

    /* 验证转换后的值是否为有效数字 */
    if (!isNumber(numValue) || Number.isNaN(numValue))
      return undefined

    /* 使用 number-precision 避免浮点数精度问题 */
    return times(numValue, 100)
  }
  catch (err) {
    console.error(err)
    return undefined
  }
}
