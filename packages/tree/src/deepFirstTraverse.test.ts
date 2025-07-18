import { describe, expect, it } from 'vitest'

import { deepFirstTraverse } from './deepFirstTraverse'

const commonTree = [
  {
    name: 'a',
    children: [
      { name: 'b' },
      { name: 'c' },
    ],
  },
  {
    name: 'd',
    children: [
      { name: 'e' },
      { name: 'f' },
    ],
  },
]
describe('deepTraverse', () => {
  it('should traverse tree in pre order', () => {
    const result: string[] = []
    deepFirstTraverse(commonTree, (node) => {
      result.push(node.name)
    })

    expect(result).toEqual(['a', 'b', 'c', 'd', 'e', 'f'])
  })

  it('should traverse tree in post order', () => {
    const result: string[] = []
    deepFirstTraverse(commonTree, (node) => {
      result.push(node.name)
    }, { order: 'post' })

    expect(result).toEqual(['b', 'c', 'a', 'e', 'f', 'd'])
  })

  it('should stop traverse when action return false', () => {
    const result: string[] = []
    deepFirstTraverse(commonTree, (node) => {
      result.push(node.name)
      if (node.name === 'c')
        return false
    })
    expect(result).toMatchInlineSnapshot(`
      [
        "a",
        "b",
        "c",
      ]
    `)

    const result2: string[] = []
    deepFirstTraverse(commonTree, (node) => {
      result2.push(node.name)
      if (node.name === 'e')
        return false
    }, { order: 'post' })
    expect(result2).toMatchInlineSnapshot(`
      [
        "b",
        "c",
        "a",
        "e",
      ]
    `)
  })

  it('should throw an error when action is not a function', () => {
    expect(() => {
      // @ts-expect-error - action is not a function
      deepFirstTraverse(commonTree, 'action')
    }).toThrowError('traverse action should be a function')
  })

  it('pass level to action', () => {
    const levelArr: number[] = []
    deepFirstTraverse(commonTree, (node, parent, level) => {
      levelArr.push(level)
    })
    expect(levelArr).toEqual([0, 1, 1, 0, 1, 1])
  })

  it('support customize children field name', () => {
    const result: string[] = []
    const tree = [
      {
        name: 'a',
        child: [
          { name: 'b' },
          { name: 'c' },
        ],
      },
      {
        name: 'd',
        child: [
          { name: 'e' },
          { name: 'f' },
        ],
      },
    ]
    deepFirstTraverse(tree, (node) => {
      result.push(node.name)
    }, { fieldNames: { children: 'child' } })

    expect(result).toEqual(['a', 'b', 'c', 'd', 'e', 'f'])
  })

  it('support traverse single node', () => {
    const result: string[] = []
    const tree = {
      name: 'a',
      children: [
        { name: 'b' },
        { name: 'c' },
      ],
    }
    deepFirstTraverse(tree, (node) => {
      result.push(node.name)
    })

    expect(result).toEqual(['a', 'b', 'c'])
  })

  it('should handle empty tree array', () => {
    const result: string[] = []
    deepFirstTraverse([] as any[], () => {
      // This action should not be called
      result.push('should not be called')
    })
    expect(result).toEqual([])
  })

  it('should handle nodes without children property', () => {
    const tree = [
      { name: 'a' },
      { name: 'b' },
    ]
    const result: string[] = []
    deepFirstTraverse(tree, (node) => {
      result.push(node.name)
    })
    expect(result).toEqual(['a', 'b'])
  })

  it('should pass correct parent to action', () => {
    const parentChildPairs: Array<[string | null, string]> = []
    deepFirstTraverse(commonTree, (node, parent) => {
      parentChildPairs.push([parent?.name || null, node.name])
    })
    expect(parentChildPairs).toEqual([
      [null, 'a'],
      ['a', 'b'],
      ['a', 'c'],
      [null, 'd'],
      ['d', 'e'],
      ['d', 'f'],
    ])
  })

  it('should handle deeply nested tree structure', () => {
    const deepTree = {
      name: 'root',
      children: [
        {
          name: 'level1-1',
          children: [
            {
              name: 'level2-1',
              children: [
                { name: 'level3-1' },
                { name: 'level3-2' },
              ],
            },
            { name: 'level2-2' },
          ],
        },
        {
          name: 'level1-2',
          children: [
            { name: 'level2-3' },
          ],
        },
      ],
    }

    const preOrderResult: string[] = []
    deepFirstTraverse(deepTree, (node) => {
      preOrderResult.push(node.name)
    })
    expect(preOrderResult).toEqual([
      'root',
      'level1-1',
      'level2-1',
      'level3-1',
      'level3-2',
      'level2-2',
      'level1-2',
      'level2-3',
    ])

    const postOrderResult: string[] = []
    deepFirstTraverse(deepTree, (node) => {
      postOrderResult.push(node.name)
    }, { order: 'post' })
    expect(postOrderResult).toEqual([
      'level3-1',
      'level3-2',
      'level2-1',
      'level2-2',
      'level1-1',
      'level2-3',
      'level1-2',
      'root',
    ])
  })
})
