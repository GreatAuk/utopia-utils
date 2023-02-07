import { createEnumFromOptions } from './createEnumFromOptions'

describe('createEnumFromOptions', () => {
  const optionsLevel = [
    {
      value: 0,
      label: 'level1',
    },
    {
      value: 1,
      label: 'level2',
    },
  ] as const
  const enumLevel = createEnumFromOptions(optionsLevel)
  it('should return a map of the values and labels of the options', () => {
    expect(enumLevel.level1).toBe(0)
    expect(enumLevel['0']).toBe('level1')
    expect(enumLevel.level2).toBe(1)
    expect(enumLevel['1']).toBe('level2')
  })
})
