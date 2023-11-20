type Fn<Arg, V> = (args: Arg) => V
type Fn2<Args extends unknown[], V> = (...args: Args) => V

/**
 * @linkcode https://github.com/GreatAuk/utopia-utils/blob/main/packages/core/src/pipe.ts
 */
export function pipe<Args extends unknown[]>(): (...args: Args) => Args
export function pipe<Args extends unknown[], R1>(f1: Fn2<Args, R1>): (...args: Args) => R1
export function pipe<Args extends unknown[], R1, R2>(f1: Fn2<Args, R1>, f2: Fn<R1, R2>): (...args: Args) => R2
export function pipe<Args extends unknown[], R1, R2, R3>(f1: Fn2<Args, R1>, f2: Fn<R1, R2>, f3: Fn<R2, R3>): (...args: Args) => R3
export function pipe<Args extends unknown[], R1, R2, R3, R4>(f1: Fn2<Args, R1>, f2: Fn<R1, R2>, f3: Fn<R2, R3>, f4: Fn<R3, R4>): (...args: Args) => R4
export function pipe<Args extends unknown[], R1, R2, R3, R4, R5>(f1: Fn2<Args, R1>, f2: Fn<R1, R2>, f3: Fn<R2, R3>, f4: Fn<R3, R4>, f5: Fn<R4, R5>): (...args: Args) => R5
export function pipe<Args extends unknown[], R1, R2, R3, R4, R5, R6>(f1: Fn2<Args, R1>, f2: Fn<R1, R2>, f3: Fn<R2, R3>, f4: Fn<R3, R4>, f5: Fn<R4, R5>, f6: Fn<R5, R6>): (...args: Args) => R6
export function pipe<Args extends unknown[], R1, R2, R3, R4, R5, R6, R7>(f1: Fn2<Args, R1>, f2: Fn<R1, R2>, f3: Fn<R2, R3>, f4: Fn<R3, R4>, f5: Fn<R4, R5>, f6: Fn<R5, R6>, f7: Fn<R6, R7>): (...args: Args) => R7
export function pipe<Args extends unknown[], R1, R2, R3, R4, R5, R6, R7, R8>(f1: Fn2<Args, R1>, f2: Fn<R1, R2>, f3: Fn<R2, R3>, f4: Fn<R3, R4>, f5: Fn<R4, R5>, f6: Fn<R5, R6>, f7: Fn<R6, R7>, f8: Fn<R7, R8>): (...args: Args) => R8
export function pipe<Args extends unknown[], R1, R2, R3, R4, R5, R6, R7, R8, R9>(f1: Fn2<Args, R1>, f2: Fn<R1, R2>, f3: Fn<R2, R3>, f4: Fn<R3, R4>, f5: Fn<R4, R5>, f6: Fn<R5, R6>, f7: Fn<R6, R7>, f8: Fn<R7, R8>, f9: Fn<R8, R9>): (...args: Args) => R9
export function pipe<Args extends unknown[], R1, R2, R3, R4, R5, R6, R7, R8, R9, R10>(f1: Fn2<Args, R1>, f2: Fn<R1, R2>, f3: Fn<R2, R3>, f4: Fn<R3, R4>, f5: Fn<R4, R5>, f6: Fn<R5, R6>, f7: Fn<R6, R7>, f8: Fn<R7, R8>, f9: Fn<R8, R9>, f10: Fn<R9, R10>): (...args: Args) => R10
export function pipe<Args extends unknown[], R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11>(f1: Fn2<Args, R1>, f2: Fn<R1, R2>, f3: Fn<R2, R3>, f4: Fn<R3, R4>, f5: Fn<R4, R5>, f6: Fn<R5, R6>, f7: Fn<R6, R7>, f8: Fn<R7, R8>, f9: Fn<R8, R9>, f10: Fn<R9, R10>, f11: Fn<R10, R11>): (...args: Args) => R11
export function pipe<Args extends unknown[], R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12>(f1: Fn2<Args, R1>, f2: Fn<R1, R2>, f3: Fn<R2, R3>, f4: Fn<R3, R4>, f5: Fn<R4, R5>, f6: Fn<R5, R6>, f7: Fn<R6, R7>, f8: Fn<R7, R8>, f9: Fn<R8, R9>, f10: Fn<R9, R10>, f11: Fn<R10, R11>, f12: Fn<R11, R12>): (...args: Args) => R12
export function pipe(...fns: Function[]) {
  if (fns.length === 0)
    return <T extends unknown[]>(...args: T) => args

  const fn = fns.shift()!
  return function (this: any, ...args: unknown[]) {
    return fns.reduce((acc, cur) => cur.call(this, acc), fn.call(this, ...args))
  }
}
