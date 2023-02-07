import { defineDictionary } from './defineDictionary'

describe('defineDictionary', () => {
  it('should define a dictionary', () => {
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
    ] as const, 'MUSIC_TYPE')
    const MUSIC_TYPE_KEYS = get_MUSIC_TYPE_KEYS()
    const MUSIC_TYPE_VALUES = get_MUSIC_TYPE_VALUES()
    const MUSIC_TYPE_KV = get_MUSIC_TYPE_KV()
    const MUSIC_TYPE_VK = get_MUSIC_TYPE_VK()
    const MUSIC_TYPE_MAP_BY_KEY = get_MUSIC_TYPE_MAP_BY_KEY()
    const MUSIC_TYPE_MAP_BY_VALUE = get_MUSIC_TYPE_MAP_BY_VALUE()
    const MUSIC_TYPE_MAP = get_MUSIC_TYPE_MAP()
    const MUSIC_TYPE_OPTIONS = get_MUSIC_TYPE_OPTIONS()

    expect(MUSIC_TYPE_KEYS).toEqual(['POP', 'ROCK'])
    expect(MUSIC_TYPE_VALUES).toEqual([1, 2])
    expect(MUSIC_TYPE_KV).toEqual({ POP: 1, ROCK: 2 })
    expect(MUSIC_TYPE_VK).toEqual({ 1: 'POP', 2: 'ROCK' })
    expect(MUSIC_TYPE_MAP_BY_KEY).toEqual({
      POP: {
        key: 'POP',
        value: 1,
        label: '流行音乐',
        color: 'red',
      },
      ROCK: {
        key: 'ROCK',
        value: 2,
        label: '摇滚音乐',
        color: 'blue',
      },
    })
    expect(MUSIC_TYPE_MAP_BY_VALUE).toEqual({
      1: {
        key: 'POP',
        value: 1,
        label: '流行音乐',
        color: 'red',
      },
      2: {
        key: 'ROCK',
        value: 2,
        label: '摇滚音乐',
        color: 'blue',
      },
    })

    expect(MUSIC_TYPE_MAP).toEqual({ POP: 1, ROCK: 2 })
    expect(MUSIC_TYPE_OPTIONS).toEqual([
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
    ])
  })
})
