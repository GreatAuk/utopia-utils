import { divide } from 'number-precision'
import { isNumber } from '@utopia-utils/share'

/**
 * 金额￥ 分转元
 * @param fen 分
 * @returns 元, 如果输入不是数字，则返回 undefined
 * @example
 * ```ts
 * fenToYuan(100) // 1
 * fenToYuan(99) // 0.99
 * fenToYuan('not number') // undefined
 * ```
 */
export function fenToYuan(fen: number | undefined): number | undefined {
  try {
    if (!isNumber(fen) || Number.isNaN(fen))
      return undefined
    return divide(fen, 100)
  }
  catch (err) {
    console.error(err)
    return undefined
  }
}
