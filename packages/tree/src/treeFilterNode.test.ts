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
})
