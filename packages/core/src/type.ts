/**
 * @example
 * ```ts
    type Intersected = {
      a: string
    } & {
      b: string
    } & {
      c: string
    }

    type Intersected2 = Prettify<Intersected>
    // type Intersected2 = {
    //   a: string
    //   b: string
    //   c: string
    // }
 * ```
 */
export type Prettify<T> = {
  [K in keyof T]: T[K]
} & {}
