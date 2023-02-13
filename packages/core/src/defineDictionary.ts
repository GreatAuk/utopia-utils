interface BaseOption {
  key: PropertyKey
  value: string | number
}

type ToPropertyPrefix<N extends string = ''> = N extends '' ? '' : `get_${N}_`

type ToProperty<
  Property extends string,
  N extends string = '',
> = `${ToPropertyPrefix<N>}${Property}`

type ToKeys<T> = T extends readonly [infer A, ...infer B]
  ? A extends {
    readonly key: infer K
  }
    ? B['length'] extends 0
      ? [K]
      : [K, ...ToKeys<B>]
    : never
  : []
type ToValues<T> = T extends readonly [infer A, ...infer B]
  ? A extends {
    readonly value: infer K
  }
    ? B['length'] extends 0
      ? [K]
      : [K, ...ToValues<B>]
    : never
  : []

type ToSingleKeyMap<T> = T extends {
  readonly key: infer K
}
  ? K extends PropertyKey
    ? {
        readonly [Key in K]: T;
      }
    : never
  : never

export type MergeIntersection<A> = A extends infer T
  ? { [Key in keyof T]: T[Key] }
  : never

type ToKeyMap<T> = T extends readonly [infer A, ...infer B]
  ? B['length'] extends 0
    ? ToSingleKeyMap<A>
    : MergeIntersection<ToSingleKeyMap<A> & ToKeyMap<B>>
  : []

type ToSingleValueMap<T> = T extends {
  readonly value: infer K
}
  ? K extends PropertyKey
    ? {
        readonly [Key in K]: T;
      }
    : never
  : never

type ToValueMap<T> = T extends readonly [infer A, ...infer B]
  ? B['length'] extends 0
    ? ToSingleValueMap<A>
    : MergeIntersection<ToSingleValueMap<A> & ToValueMap<B>>
  : []

type ToSingleKeyValue<T> = T extends {
  readonly key: infer K
  readonly value: infer V
}
  ? K extends PropertyKey
    ? {
        readonly [Key in K]: V;
      }
    : never
  : never

type ToKeyValue<T> = T extends readonly [infer A, ...infer B]
  ? B['length'] extends 0
    ? ToSingleKeyValue<A>
    : MergeIntersection<ToSingleKeyValue<A> & ToKeyValue<B>>
  : []

type ToSingleValueKey<T> = T extends {
  readonly key: infer K
  readonly value: infer V
}
  ? V extends PropertyKey
    ? {
        readonly [Key in V]: K;
      }
    : never
  : never

type ToValueKey<T> = T extends readonly [infer A, ...infer B]
  ? B['length'] extends 0
    ? ToSingleValueKey<A>
    : MergeIntersection<ToSingleValueKey<A> & ToValueKey<B>>
  : []

/**
 * 定义业务字典
 * @param {T} options - The options of the dictionary. (ts as const is required !!!)
 * @param {N} namespace - The namespace of the dictionary.
 * @returns
 * @example
 * ```ts
    // at src/constant.ts
    const { get_MUSIC_TYPE_KEYS, get_MUSIC_TYPE_KV, get_MUSIC_TYPE_MAP, get_MUSIC_TYPE_MAP_BY_KEY, get_MUSIC_TYPE_MAP_BY_VALUE, get_MUSIC_TYPE_OPTIONS, get_MUSIC_TYPE_VALUES, get_MUSIC_TYPE_VK } = defineDictionary([
      {
        key: 'POP',
        value: 1,
        label: '流行音乐',
        color: 'red',
      },
      {
        key: 'ROCK',
        value: 2,
        label: '摇滚音乐',
        color: 'blue',
      },
    ] as const, 'MUSIC_TYPE') // !!! as const is required for type safe

    export const { MUSIC_TYPE_KEYS } = get_MUSIC_TYPE_KEYS()
    // ['POP', 'ROCK']
    export const { MUSIC_TYPE_VALUES } = get_MUSIC_TYPE_VALUES()
    // [1, 2]
    export const { MUSIC_TYPE_KV } = get_MUSIC_TYPE_KV()
    // { POP: 1, ROCK: 2 }
    export const { MUSIC_TYPE_VK } = get_MUSIC_TYPE_VK()
    // { 1: 'POP', 2: 'ROCK' }
    export const { MUSIC_TYPE_MAP_BY_KEY } = get_MUSIC_TYPE_MAP_BY_KEY()
    // POP: {
    //   key: 'POP',
    //   value: 1,
    //   label: '流行音乐',
    //   color: 'red',
    // },
    // ROCK: {
    //   key: 'ROCK',
    //   value: 2,
    //   label: '摇滚音乐',
    //   color: 'blue',
    // },
    export const { MUSIC_TYPE_MAP_BY_VALUE } = get_MUSIC_TYPE_MAP_BY_VALUE()
    // 1: {
    //   key: 'POP',
    //   value: 1,
    //   label: '流行音乐',
    //   color: 'red',
    // },
    // 2: {
    //   key: 'ROCK',
    //   value: 2,
    //   label: '摇滚音乐',
    //   color: 'blue',
    // },
    export const { MUSIC_TYPE_MAP } = get_MUSIC_TYPE_MAP()
    // { POP: 1, ROCK: 2 }
    export const { MUSIC_TYPE_OPTIONS } = get_MUSIC_TYPE_OPTIONS()
    // [
    //   {
    //     key: 'POP',
    //     value: 1,
    //     label: '流行音乐',
    //     color: 'red',
    //   },
    //   {
    //     key: 'ROCK',
    //     value: 2,
    //     label: '摇滚音乐',
    //     color: 'blue',
    //   }
    // ]
 * ```
 */
export function defineDictionary<
  T extends readonly BaseOption[],
  N extends string,
>(options: T, namespace: N) {
  if (!namespace)
    throw new Error('namespace is required')

  const prefix = `get_${namespace}_`
  return {
    [`${prefix}KEYS`]: () => ({
      [`${namespace}_KEYS`]: options.map(item => item.key),
    }),
    [`${prefix}VALUES`]: () => ({
      [`${namespace}_VALUES`]: options.map(item => item.value),
    }),
    [`${prefix}KV`]: () => {
      return {
        [`${namespace}_KV`]: options.reduce(
          (prev, cur) => ({
            ...prev,
            [cur.key]: cur.value,
          }),
          {},
        ),
      }
    },
    [`${prefix}VK`]: () => {
      return {
        [`${namespace}_VK`]: options.reduce(
          (prev, cur) => ({
            ...prev,
            [cur.value]: cur.key,
          }),
          {},
        ),
      }
    },
    [`${prefix}MAP_BY_KEY`]: () => {
      return {
        [`${namespace}_MAP_BY_KEY`]: options.reduce(
          (prev, cur) => ({
            ...prev,
            [cur.key]: cur,
          }),
          {},
        ),
      }
    },
    [`${prefix}MAP_BY_VALUE`]: () => {
      return {
        [`${namespace}_MAP_BY_VALUE`]: options.reduce(
          (prev, cur) => ({
            ...prev,
            [cur.value]: cur,
          }),
          {},
        ),
      }
    },
    // [`${prefix}KEY_MAP`]: () => {
    //   return {
    //     [`${namespace}_KEY_MAP`]: options.reduce(
    //       (prev, cur) => ({
    //         ...prev,
    //         [cur.key]: cur,
    //       }),
    //       {},
    //     ),
    //   }
    // },
    [`${prefix}MAP`]: () => {
      return {
        [`${namespace}_MAP`]: options.reduce(
          (prev, cur) => ({
            ...prev,
            [cur.key]: cur.value,
          }),
          {},
        ),
      }
    },
    [`${prefix}OPTIONS`]: () => ({
      [`${namespace}_OPTIONS`]: options,
    }),
  } as MergeIntersection<
    {
      [Key in ToProperty<'KV', N>]: () => {
        [K in `${N}_KV`]: ToKeyValue<T>
      };
    } & {
      [Key in ToProperty<'VK', N>]: () => {
        [K in `${N}_VK`]: ToValueKey<T>
      };
    } & {
      [Key in ToProperty<'KEYS', N>]: () => {
        [K in `${N}_KEYS`]: ToKeys<T>
      };
    } & {
      [Key in ToProperty<'VALUES', N>]: () => {
        [K in `${N}_VALUES`]: ToValues<T>
      };
    } & {
      [Key in ToProperty<'MAP_BY_KEY', N>]: () => {
        [K in `${N}_MAP_BY_KEY`]: ToKeyMap<T>
      };
    } & {
      [Key in ToProperty<'MAP_BY_VALUE', N>]: () => {
        [K in `${N}_MAP_BY_VALUE`]: ToValueMap<T>
      };
    } & {
      [Key in ToProperty<'MAP', N>]: () => {
        [K in `${N}_MAP`]: ToKeyValue<T>
      };
    } & {
      [Key in ToProperty<'OPTIONS', N>]: () => {
        [K in `${N}_OPTIONS`]: T
      };
    }
  >
}
