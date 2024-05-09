function clone<T>(src: T, seen = new Map()): T {
  // Immutable things - null, undefined, functions, symbols, etc.
  if (!src || typeof src !== 'object')
    return src

  // Things we've seen already (circular refs)
  if (seen.has(src))
    return seen.get(src)

  // Basic pattern for cloning something below here is:
  // 1. Create copy
  // 2. Add it to `seen` immediately, so we recognize it if we see it in
  //    subordinate members
  // 3. clone subordinate members

  let copy
  if (isDom(src)) {
    // DOM Node
    copy = src.cloneNode(true)
    seen.set(src, copy)
  }
  else if (src instanceof Date) {
    // Date
    copy = new Date(src.getTime())
    seen.set(src, copy)
  }
  else if (src instanceof RegExp) {
    // RegExp
    copy = new RegExp(src)
    seen.set(src, copy)
  }
  else if (Array.isArray(src)) {
    // Array
    copy = new Array(src.length)
    seen.set(src, copy)
    for (let i = 0; i < src.length; i++) copy[i] = clone(src[i], seen)
  }
  else if (src instanceof Map) {
    // Map
    copy = new Map()
    seen.set(src, copy)
    for (const [k, v] of src.entries()) copy.set(k, clone(v, seen))
  }
  else if (src instanceof Set) {
    // Set
    copy = new Set()
    seen.set(src, copy)
    for (const v of src) copy.add(clone(v, seen))
  }
  else if (src instanceof Object) {
    // Object
    copy = {} as any
    seen.set(src, copy)
    for (const [k, v] of Object.entries(src)) copy[k] = clone(v, seen)
  }
  else {
    // Unrecognized thing.  It's better to throw here than to return `src`, as
    // we don't know whether src needs to be deep-copied here.
    throw new TypeError(`Unable to clone ${src}`)
  }

  return copy
}

/**
 * It takes a source object and returns a deep clone of it
 * fork from nanoclone, and add type definition. https://github.com/Kelin2025/nanoclone
 * @param {T} src - The object to be cloned.
 * @returns A new object with the same properties as the original object.
 *
 * JSON.parse(JSON.stringify(obj)) performance is very bad. https://miro.medium.com/v2/resize:fit:1400/format:webp/1*MqzPusKjyc5uRk6qaalWwA.png
 * @linkcode https://github.com/GreatAuk/utopia-utils/blob/main/packages/core/src/deepClone.ts
 */
export function deepClone<T>(src: T): T {
  return clone(src, new Map())
}

function isDom(obj: any): obj is Node {
  return obj.nodeType && 'cloneNode' in obj
}
