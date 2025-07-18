import { treeFindNode } from './treeFindNode'

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
describe('treeFindNode', () => {
  it('should find the first node', () => {
    const res = treeFindNode(tree, node => node.name === 'b')
    expect(res).toEqual([{ name: 'b' }])
  })
  it('should return empty array if not found', () => {
    const res = treeFindNode(tree, node => node.name === 'd')
    expect(res).toEqual([])
  })
  it('should find all nodes', () => {
    const res = treeFindNode(tree, node => node.name === 'b' || node.name === 'c', { isFindAll: true })
    expect(res).toEqual([{ name: 'c' }, { name: 'b' }])
  })
  it('fieldNames should work', () => {
    const customTree = [
      {
        name: 'a',
        Children_: [
          { name: 'b' },
        ],
      },
    ]
    const res = treeFindNode(customTree, node => node.name === 'b', { fieldNames: { children: 'Children_' } })
    expect(res).toEqual([{ name: 'b' }])
  })
  it('options.onEachTraverse should be called for each node', () => {
    const ids: string[] = []
    treeFindNode(tree, node => node.name === 'b', {
      onEachTraverse: node => ids.push(node.name),
    })
    expect(ids).toEqual(['a', 'c', 'b'])
  })
  it('should throw error if predicate is not a function', () => {
    expect(() => {
      treeFindNode(tree, 'not a function' as any)
    }).toThrowError('predicate should be a function')
  })

  it('should support tree as a single node object', () => {
    const singleNodeTree = {
      name: 'a',
      children: [
        { name: 'b' },
        { name: 'c' },
      ],
    }
    const res = treeFindNode(singleNodeTree, node => node.name === 'c')
    expect(res).toEqual([{ name: 'c' }])
  })

  it('should work with deeply nested structure', () => {
    const deepTree = [
      {
        name: 'level1',
        children: [
          {
            name: 'level2-1',
            children: [
              {
                name: 'level3-1',
                children: [
                  { name: 'level4-1' }
                ]
              }
            ]
          },
          { name: 'level2-2' }
        ]
      }
    ]

    const res = treeFindNode(deepTree, node => node.name === 'level4-1')
    expect(res).toEqual([{ name: 'level4-1' }])
  })

  it('should stop traversing after finding the first match when isFindAll is false', () => {
    const visitedNodes: string[] = []
    treeFindNode(tree, node => {
      visitedNodes.push(node.name)
      return node.name === 'c'
    })
    // 由于使用广度优先遍历，第一个匹配的是c，应该不会继续遍历到b
    expect(visitedNodes).toEqual(['a', 'c'])
  })

  it('should continue traversing after finding a match when isFindAll is true', () => {
    const visitedNodes: string[] = []
    treeFindNode(tree, node => {
      visitedNodes.push(node.name)
      return node.name === 'a'
    }, { isFindAll: true })
    // 匹配到a后应继续遍历全部节点
    expect(visitedNodes).toEqual(['a', 'c', 'b'])

    // 验证返回结果中只包含a
    const res = treeFindNode(tree, node => node.name === 'a', { isFindAll: true })
    expect(res).toEqual([{
      name: 'a',
      children: [
        { name: 'b' },
      ],
    }])
  })

  it('should handle large trees efficiently', () => {
    // 创建一个大型树结构
    const generateLargeTree = (depth: number, childrenPerNode: number): any => {
      if (depth <= 0) return { id: 'leaf', value: Math.random() }

      const children = []
      for (let i = 0; i < childrenPerNode; i++) {
        children.push(generateLargeTree(depth - 1, childrenPerNode))
      }

      return {
        id: `node-${depth}-${Math.random().toString(36).substring(2, 6)}`,
        value: Math.random(),
        children
      }
    }

    const largeTree = generateLargeTree(4, 3) // 深度4，每个节点有3个子节点

    // 在大型树结构中搜索特定节点
    const targetValue = 0.42
    const nodeToFind = {
      id: 'target-node',
      value: targetValue,
      children: []
    }

    // 将目标节点添加到树的某个位置
    const someNode = largeTree.children[1].children[0]
    someNode.children.push(nodeToFind)

    // 查找目标节点
    const result = treeFindNode(largeTree, node => node.value === targetValue)

    // 验证找到的是正确的节点
    expect(result.length).toBe(1)
    expect(result[0].id).toBe('target-node')
    expect(result[0].value).toBe(targetValue)
  })
})
