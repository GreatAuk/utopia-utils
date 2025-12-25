import { treeFilterNode } from './treeFilterNode'

describe('treeFilterNode', () => {
  it('should filter a tree', () => {
    const tree = [
      {
        id: 'root',
        children: [
          {
            id: 'child1',
            children: [
              {
                id: 'child1-1',
              },
            ],
          },
          {
            id: 'child2',
          },
        ],
      },
    ]
    expect(treeFilterNode(tree, node => node.id.includes('1'))).toMatchInlineSnapshot(`
      [
        {
          "children": [
            {
              "children": [
                {
                  "id": "child1-1",
                },
              ],
              "id": "child1",
            },
          ],
          "id": "root",
        },
      ]
    `)
    expect(treeFilterNode(tree, node => node.id === 'child2')).toMatchInlineSnapshot(`
      [
        {
          "children": [
            {
              "id": "child2",
            },
          ],
          "id": "root",
        },
      ]
    `)

    expect(treeFilterNode(tree, node => node.id === 'child1')).toMatchInlineSnapshot(`
      [
        {
          "children": [
            {
              "children": [],
              "id": "child1",
            },
          ],
          "id": "root",
        },
      ]
    `)
  })
  it('should filter a tree with custom fieldNames', () => {
    const tree = [
      {
        id: 'root',
        sub: [
          {
            id: 'child1',
            sub: [
              {
                id: 'child1-1',
              },
            ],
          },
          {
            id: 'child2',
          },
        ],
      },
    ]
    expect(
      treeFilterNode(tree, node => node.id.includes('1'), {
        fieldNames: {
          children: 'sub',
        },
      }),
    ).toMatchInlineSnapshot(`
      [
        {
          "id": "root",
          "sub": [
            {
              "id": "child1",
              "sub": [
                {
                  "id": "child1-1",
                },
              ],
            },
          ],
        },
      ]
    `)
  })

  it('onEachTraverse should be called for each node', () => {
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
    treeFilterNode(tree, node => node.id.includes('1'), {
      onEachTraverse: (node) => { titles.push(node.title) },
    })
    expect(titles).toMatchInlineSnapshot(`
      [
        "节点1-1",
        "节点1-2",
        "节点1",
        "节点2-1",
        "节点2",
      ]
    `)
  })
  it('support argument tree be a object instead of array', () => {
    const tree = {
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
        },
      ],
    }
    expect(treeFilterNode(tree, node => node.id === '1-1')).toMatchInlineSnapshot(`
      [
        {
          "children": [
            {
              "id": "1-1",
              "title": "节点1-1",
            },
          ],
          "id": "1",
          "title": "节点1",
        },
      ]
    `)
  })

  it('should return empty array for empty tree', () => {
    expect(treeFilterNode([], _node => true)).toEqual([])
  })

  it('should return empty array when no nodes match the predicate', () => {
    const tree = [
      {
        id: 'root',
        children: [
          {
            id: 'child1',
            children: [
              {
                id: 'child1-1',
              },
            ],
          },
          {
            id: 'child2',
          },
        ],
      },
    ]
    expect(treeFilterNode(tree, node => node.id === 'nonexistent')).toEqual([])
  })

  it('should handle tree with empty children array', () => {
    const tree = [
      {
        id: 'root',
        children: [],
      },
      {
        id: 'node',
        children: [],
      },
    ]
    expect(treeFilterNode(tree, node => node.id === 'root')).toMatchInlineSnapshot(`
      [
        {
          "children": [],
          "id": "root",
        },
      ]
    `)
  })

  it('should handle complex nested tree structure', () => {
    const tree = [
      {
        id: 'root',
        children: [
          {
            id: 'level1-1',
            children: [
              {
                id: 'level2-1',
                children: [
                  { id: 'level3-1' },
                  { id: 'level3-2' }
                ]
              },
              {
                id: 'level2-2',
              },
            ],
          },
          {
            id: 'level1-2',
            children: [
              {
                id: 'level2-3',
                children: [
                  { id: 'level3-3' }
                ]
              }
            ]
          },
        ],
      },
    ]

    // 测试深层次过滤
    expect(treeFilterNode(tree, node => node.id === 'level3-1')).toMatchInlineSnapshot(`
      [
        {
          "children": [
            {
              "children": [
                {
                  "children": [
                    {
                      "id": "level3-1",
                    },
                  ],
                  "id": "level2-1",
                },
              ],
              "id": "level1-1",
            },
          ],
          "id": "root",
        },
      ]
    `)

    // 测试多层级同时匹配
    expect(treeFilterNode(tree, node => node.id.includes('level2'))).toMatchInlineSnapshot(`
      [
        {
          "children": [
            {
              "children": [
                {
                  "children": [],
                  "id": "level2-1",
                },
                {
                  "id": "level2-2",
                },
              ],
              "id": "level1-1",
            },
            {
              "children": [
                {
                  "children": [],
                  "id": "level2-3",
                },
              ],
              "id": "level1-2",
            },
          ],
          "id": "root",
        },
      ]
    `)
  })
})
