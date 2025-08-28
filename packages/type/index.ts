/**
 * Void function
 */
export type Fn = () => void

/**
 * Any function
 */
export type AnyFn = (...args: any[]) => any

/**
 * setTimeout return type
 */
export type TimeOut = ReturnType<typeof setTimeout>