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
 * ```
 */
export function yuanToFen(yuan: number | undefined): number | undefined {
  try {
    if (!isNumber(yuan) || Number.isNaN(yuan))
      return undefined
    return times(yuan, 100)
  }
  catch (err) {
    console.error(err)
    return undefined
  }
}
