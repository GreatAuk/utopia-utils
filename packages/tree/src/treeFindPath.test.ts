import { describe, expect, it } from 'vitest'
import { treeFindPath } from './treeFindPath'

describe('treeFindPath', () => {
  it('should find the first path', () => {
    const tree = [
      {
        name: 'a',
        children: [
          { name: 'b' },
        ],
      },
      {
        name: 'c',
      },
    ]
    const path = treeFindPath(tree, node => node.name === 'b')
    expect(path).toMatchInlineSnapshot(`
      [
        {
          "children": [
            {
              "name": "b",
            },
          ],
          "name": "a",
        },
        {
          "name": "b",
        },
      ]
    `)
    expect(path?.map(v => v.name)).toEqual(['a', 'b'])
  })
  it('should return null if not found', () => {
    const tree = {
      name: 'a',
      children: [
        { name: 'b' },
      ],
    }
    const path = treeFindPath(tree, node => node.name === 'd')
    expect(path).toBe(null)
  })
  // it('should find all paths', () => {
  //   const tree = [
  //     {
  //       name: 'a',
  //       children: [
  //         { name: 'b' },
  //       ],
  //     },
  //     {
  //       name: 'c',
  //     },
  //   ]
  //   const res = treeFindPath(tree, node => node.name === 'b' || node.name === 'c', { isFindAll: true })
  //   expect(res).toEqual([
  //     [{ name: 'a' }, { name: 'b' }],
  //     [{ name: 'c' }],
  //   ])
  // })
  it('fieldNames should work', () => {
    const customTree = [
      {
        name: 'a',
        Children_: [
          { name: 'b' },
        ],
      },
    ]
    const path = treeFindPath(customTree, node => node.name === 'b', { fieldNames: { children: 'Children_' } })
    expect(path?.map(v => v.name)).toEqual(['a', 'b'])
  })
})
