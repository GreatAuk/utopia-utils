import { flattenTree } from './flattenTree'

describe('flattenTree', () => {
  it('should flatten tree', () => {
    const tree = [
      {
        id: 1,
        children: [
          {
            id: 2,
            children: [
              {
                id: 3,
              },
            ],
          },
        ],
      },
      {
        id: 4,
      },
    ]

    expect(flattenTree(tree)).toMatchInlineSnapshot(`
      [
        {
          "children": [
            {
              "children": [
                {
                  "id": 3,
                },
              ],
              "id": 2,
            },
          ],
          "id": 1,
        },
        {
          "children": [
            {
              "id": 3,
            },
          ],
          "id": 2,
        },
        {
          "id": 3,
        },
        {
          "id": 4,
        },
      ]
    `)
  })

  it('should flatten tree with custom field names', () => {
    const tree = {
      ID: 1,
      children: [
        {
          ID: 2,
        },
      ],
    }
    expect(flattenTree(tree, {
      fieldNames: {
        id: 'ID',
      },
    })).toMatchInlineSnapshot(`
      [
        {
          "ID": 1,
          "children": [
            {
              "ID": 2,
            },
          ],
        },
        {
          "ID": 2,
        },
      ]
    `)
  })

  it('options.onEachTraverse should be called for each node', () => {
    const tree = {
      id: 1,
      children: [
        {
          id: 2,
        },
      ],
    }

    const ids: number[] = []
    flattenTree(tree, {
      onEachTraverse: node => ids.push(node.id),
    })
    expect(ids).toEqual([1, 2])
  })

  it('should handle empty array input', () => {
    const tree: any[] = []
    expect(flattenTree(tree)).toEqual([])
  })

  it('should handle a single node without children', () => {
    const tree = { id: 1 }
    expect(flattenTree(tree)).toEqual([{ id: 1 }])
  })

  it('should flatten tree with custom children field name', () => {
    const tree = {
      id: 1,
      subItems: [
        {
          id: 2,
          subItems: [
            {
              id: 3,
            }
          ]
        }
      ]
    }
    expect(flattenTree(tree, {
      fieldNames: {
        children: 'subItems',
      },
    })).toEqual([
      { id: 1, subItems: [{ id: 2, subItems: [{ id: 3 }] }] },
      { id: 2, subItems: [{ id: 3 }] },
      { id: 3 }
    ])
  })

  it('should handle deeply nested tree structure', () => {
    const tree = {
      id: 1,
      children: [
        {
          id: 2,
          children: [
            {
              id: 3,
              children: [
                {
                  id: 4,
                  children: [
                    { id: 5 }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }

    const result = flattenTree(tree)
    expect(result.length).toBe(5)
    expect(result.map(node => node.id)).toEqual([1, 2, 3, 4, 5])
  })
})
