type Fn<Arg, V> = (args: Arg) => V
type Fn2<Args extends unknown[], V> = (...args: Args) => V

/**
 * Composes single-argument functions from right to left. The rightmost
 * function can take multiple arguments as it provides the signature for the
 * resulting composite function.
 * @param {Function[]} fns The functions to compose.
 * @returns A function obtained by composing the argument functions from right
 *   to left. For example, `compose(f, g, h)` is identical to doing
 *   `(...args) => f(g(h(...args)))`.
 */
export function compose<Args extends unknown[], R1>(f1: Fn2<Args, R1>): (...args: Args) => R1
export function compose<Args extends unknown[], R1, R2>(f1: Fn<R2, R1>, f2: Fn2<Args, R2>): (...args: Args) => R1
export function compose<Args extends unknown[], R1, R2, R3>(f1: Fn<R2, R1>, f2: Fn<R3, R2>, f3: Fn2<Args, R3>): (...args: Args) => R1
export function compose<Args extends unknown[], R1, R2, R3, R4>(f1: Fn<R2, R1>, f2: Fn<R3, R2>, f3: Fn<R4, R3>, f4: Fn2<Args, R4>): (...args: Args) => R1
export function compose<Args extends unknown[], R1, R2, R3, R4, R5>(f1: Fn<R2, R1>, f2: Fn<R3, R2>, f3: Fn<R4, R3>, f4: Fn<R5, R4>, f5: Fn2<Args, R5>): (...args: Args) => R1
export function compose<Args extends unknown[], R1, R2, R3, R4, R5, R6>(f1: Fn<R2, R1>, f2: Fn<R3, R2>, f3: Fn<R4, R3>, f4: Fn<R5, R4>, f5: Fn<R6, R5>, f6: Fn2<Args, R6>): (...args: Args) => R1
export function compose<Args extends unknown[], R1, R2, R3, R4, R5, R6, R7>(f1: Fn<R2, R1>, f2: Fn<R3, R2>, f3: Fn<R4, R3>, f4: Fn<R5, R4>, f5: Fn<R6, R5>, f6: Fn<R7, R6>, f7: Fn2<Args, R7>): (...args: Args) => R1
export function compose<Args extends unknown[], R1, R2, R3, R4, R5, R6, R7, R8>(f1: Fn<R2, R1>, f2: Fn<R3, R2>, f3: Fn<R4, R3>, f4: Fn<R5, R4>, f5: Fn<R6, R5>, f6: Fn<R7, R6>, f7: Fn<R8, R7>, f8: Fn2<Args, R8>): (...args: Args) => R1
export function compose<Args extends unknown[], R1, R2, R3, R4, R5, R6, R7, R8, R9>(f1: Fn<R2, R1>, f2: Fn<R3, R2>, f3: Fn<R4, R3>, f4: Fn<R5, R4>, f5: Fn<R6, R5>, f6: Fn<R7, R6>, f7: Fn<R8, R7>, f8: Fn<R9, R8>, f9: Fn2<Args, R9>): (...args: Args) => R1
export function compose<Args extends unknown[], R1, R2, R3, R4, R5, R6, R7, R8, R9, R10>(f1: Fn<R2, R1>, f2: Fn<R3, R2>, f3: Fn<R4, R3>, f4: Fn<R5, R4>, f5: Fn<R6, R5>, f6: Fn<R7, R6>, f7: Fn<R8, R7>, f8: Fn<R9, R8>, f9: Fn<R10, R9>, f10: Fn2<Args, R10>): (...args: Args) => R1
export function compose<Args extends unknown[], R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11>(f1: Fn<R2, R1>, f2: Fn<R3, R2>, f3: Fn<R4, R3>, f4: Fn<R5, R4>, f5: Fn<R6, R5>, f6: Fn<R7, R6>, f7: Fn<R8, R7>, f8: Fn<R9, R8>, f9: Fn<R10, R9>, f10: Fn<R11, R10>, f11: Fn2<Args, R11>): (...args: Args) => R1
export function compose<Args extends unknown[], R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12>(f1: Fn<R2, R1>, f2: Fn<R3, R2>, f3: Fn<R4, R3>, f4: Fn<R5, R4>, f5: Fn<R6, R5>, f6: Fn<R7, R6>, f7: Fn<R8, R7>, f8: Fn<R9, R8>, f9: Fn<R10, R9>, f10: Fn<R11, R10>, f11: Fn<R12, R11>, f12: Fn2<Args, R12>): (...args: Args) => R1
export function compose(...fns: Function[]) {
  if (fns.length === 0)
    return <T extends unknown[]>(...args: T) => args

  const fn = fns.pop()!
  return function (this: any, ...args: unknown[]) {
    return fns.reduceRight((acc, cur) => cur.call(this, acc), fn.call(this, ...args))
  }
}
