import { describe, expect, it } from 'vitest'

import { breadthFirstTraverse } from './breadthFirstTraverse'

describe('breadthFirstTraverse', () => {
  it('should traverse the tree in breadth-first order', () => {
    const tree = [
      {
        id: '1',
        title: '节点1',
        children: [
          {
            id: '1-1',
            title: '节点1-1',
          },
          {
            id: '1-2',
            title: '节点1-2',
            children: [
              {
                id: '1-2-1',
                title: '节点1-2-1',
              },
            ],
          },
        ],
      },
      {
        id: '2',
        title: '节点2',
        children: [
          {
            id: '2-1',
            title: '节点2-1',
          },
        ],
      },
    ]
    const titles: string[] = []
    breadthFirstTraverse(tree, node => titles.push(node.title))
    expect(titles).toEqual(['节点1', '节点2', '节点1-1', '节点1-2', '节点2-1', '节点1-2-1'])
  })
  it('snapshot', () => {
    const rootNode = [
      {
        name: 'a',
        Children_: [
          { name: 'b' },
        ],
      },
      {
        name: 'c',
      },
    ]

    const names: string[] = []
    breadthFirstTraverse(rootNode, node => names.push(node.name), {
      fieldNames: {
        children: 'Children_',
      },
    })
    expect(names).toMatchInlineSnapshot(`
      [
        "a",
        "c",
        "b",
      ]
    `)
  })
})
