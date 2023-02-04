/**
 * strict type Object.keys()
 * @param {T} obj - T
 */
export function objectKeys<T extends object>(obj: T) {
  return Object.keys(obj) as (keyof T & (string | number | boolean | null | undefined))[]
}

// const symbol = Symbol('symbol')
// const obj = { a: 1, null: 34, undefined: 2, true: 33, [symbol]: 200 }
// type K = keyof typeof obj //  "undefined" | typeof symbol | "a" | "null" | "true"
