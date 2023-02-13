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
})
