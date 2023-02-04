import { describe, expect, it } from 'vitest'
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
})
