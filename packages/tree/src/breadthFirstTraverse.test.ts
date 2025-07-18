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
    let callNum = 0
    breadthFirstTraverse(tree, node => {
      titles.push(node.title)
      callNum++
    })
    expect(callNum).toBe(6)
    expect(titles).toEqual(['节点1', '节点2', '节点1-1', '节点1-2', '节点2-1', '节点1-2-1'])
  })
  it('snapshot', () => {
    const tree = [
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
    breadthFirstTraverse(tree, node => names.push(node.name), {
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
  it('if action returns false, should stop traversing', () => {
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
    let count = 0
    breadthFirstTraverse(tree, (node) => {
      count++
      return node.name !== 'c'
    })
    expect(count).toBe(2)
  })
  it('throw error if action is not function', () => {
    const tree = [
      {
        name: 'a',
        children: [
          { name: 'b' },
        ],
      },
    ]
    expect(() => breadthFirstTraverse(tree, null as any)).toThrowError('traverse action should be a function')
  })
  it('support argument tree be a object instead of array', () => {
    const tree = {
      name: 'a',
      children: [
        { name: 'b' },
      ],
    }
    const names: string[] = []
    breadthFirstTraverse(tree, node => names.push(node.name))
    expect(names).toEqual(['a', 'b'])
  })
  it('should handle empty tree array', () => {
    const tree: any[] = []
    const results: any[] = []
    breadthFirstTraverse(tree, node => results.push(node))
    expect(results).toEqual([])
  })

  it('should handle nodes with undefined children', () => {
    const tree = [
      {
        name: 'a',
        children: undefined,
      },
      {
        name: 'b',
        children: null,
      },
      {
        name: 'c',
      },
    ]
    const names: string[] = []
    breadthFirstTraverse(tree, node => names.push(node.name))
    expect(names).toEqual(['a', 'b', 'c'])
  })

  it('should traverse deeply nested tree correctly', () => {
    const tree = {
      name: 'level1',
      children: [
        {
          name: 'level2-1',
          children: [
            { name: 'level3-1' },
            {
              name: 'level3-2',
              children: [
                { name: 'level4-1' }
              ]
            },
          ],
        },
        { name: 'level2-2' },
      ],
    }

    const names: string[] = []
    breadthFirstTraverse(tree, node => names.push(node.name))
    expect(names).toEqual(['level1', 'level2-1', 'level2-2', 'level3-1', 'level3-2', 'level4-1'])
  })

  it('should work with custom children field at multiple nesting levels', () => {
    const tree = {
      name: 'root',
      items: [
        {
          name: 'child1',
          items: [
            { name: 'grandchild1' },
            { name: 'grandchild2' }
          ]
        },
        {
          name: 'child2',
          items: [
            { name: 'grandchild3' }
          ]
        }
      ]
    }

    const names: string[] = []
    breadthFirstTraverse(tree, node => names.push(node.name), {
      fieldNames: {
        children: 'items'
      }
    })
    expect(names).toEqual(['root', 'child1', 'child2', 'grandchild1', 'grandchild2', 'grandchild3'])
  })

  it('should handle single node without children', () => {
    const tree = { name: 'standalone' }
    const names: string[] = []
    breadthFirstTraverse(tree, node => names.push(node.name))
    expect(names).toEqual(['standalone'])
  })

  it('should handle mixed standard and custom children fields', () => {
    const tree = {
      name: 'root',
      items: [
        {
          name: 'child1',
          children: [
            { name: 'grandchild1' }
          ]
        },
        {
          name: 'child2',
          items: [
            { name: 'grandchild2' }
          ]
        }
      ]
    }

    const names: string[] = []
    breadthFirstTraverse(tree, node => names.push(node.name), {
      fieldNames: {
        children: 'items'
      }
    })

    // Should only traverse using the 'items' field, not 'children'
    expect(names).toEqual(['root', 'child1', 'child2', 'grandchild2'])
  })

  it('should handle empty children arrays', () => {
    const tree = {
      name: 'root',
      children: [
        {
          name: 'child1',
          children: []
        },
        {
          name: 'child2',
          children: [
            { name: 'grandchild' }
          ]
        }
      ]
    }

    const names: string[] = []
    breadthFirstTraverse(tree, node => names.push(node.name))
    expect(names).toEqual(['root', 'child1', 'child2', 'grandchild'])
  })
})