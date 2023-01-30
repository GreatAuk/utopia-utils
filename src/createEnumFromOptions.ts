/**
 * It takes an array of options and returns an object that maps the value and label of each option to
 * each other
 * @param {T} options - T: The options that you want to create an enum from.
 * @returns A map of the values and labels of the options.
 * @deprecated Use `defineDictionary` instead.
 * @example
 * ```ts
 *
  const optionsLevel = [
    {
      value: 0,
      label: 'level1',
    },
    {
      value: 1,
      label: 'level2',
    },
  ] as const // as const is required to make the type safe

  const enumLevel = createEnumFromOptions(optionsLevel)
  console.log(enumLevel.level1) // 0
  console.log(enumLevel['0']) // 'level1'
  console.log(enumLevel)
  // {
  //   "0": "level1",
  //   "1": "level2",
  //   "level1": 0,
  //   "level2": 1
  // }
 * ```
 */
export function createEnumFromOptions<T extends readonly Option[]>(options: T) {
  const res: Record<string, unknown> = {}
  try {
    options.forEach((v) => {
      res[v.value] = v.label
      res[v.label] = v.value
    })
  }
  catch (err) {
    console.error(err)
  }
  return res as MapTuple<T>
}

interface Option {
  value: string | number
  label: string
}

type MapTuple<T extends readonly Option[]> = {
  [value in T[number]['value']]: ArrayFindValue<T, value>
} & {
  [label in T[number]['label']]: ArrayFindLabel<T, label>
}

type ArrayFindValue<
  T extends readonly Option[],
  V,
> = T extends Readonly<[infer F, ...infer Tail]>
  // @ts-expect-error - This is ok
  ? F extends { value: V; label: infer Res } ? Res : ArrayFindValue<Tail, V>
  : never
type ArrayFindLabel<
  T extends readonly Option[],
  L,
> = T extends Readonly<[infer F, ...infer Tail]>
  // @ts-expect-error - This is ok
  ? F extends { value: infer Res; label: L } ? Res : Tail extends unknown[] ? never : ArrayFindLabel<Tail, L>
  : never
