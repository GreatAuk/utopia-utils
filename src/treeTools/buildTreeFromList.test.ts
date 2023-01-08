import { describe, expect, it } from 'vitest'

import { buildTreeFromList } from './buildTreeFromList'

describe('buildTreeFromList', () => {
  it('should build a tree from a list', () => {
    const list = [
      { id: '1', title: 'node 1', parentId: '' },
      { id: '1-1', title: 'node 1-1', parentId: '1' },
      { id: '1-2', title: 'node 1-2', parentId: '1' },
      { id: '1-1-1', title: 'node 1-1-1', parentId: '1-1' },
      { id: '2', title: 'node 2', parentId: '' },
      { id: '2-1', title: 'node 2-1', parentId: '2' },
    ]
    const tree = buildTreeFromList(list)
    expect(tree).toMatchInlineSnapshot(`
      [
        {
          "children": [
            {
              "children": [
                {
                  "children": [],
                  "id": "1-1-1",
                  "parentId": "1-1",
                  "title": "node 1-1-1",
                },
              ],
              "id": "1-1",
              "parentId": "1",
              "title": "node 1-1",
            },
            {
              "children": [],
              "id": "1-2",
              "parentId": "1",
              "title": "node 1-2",
            },
          ],
          "id": "1",
          "parentId": "",
          "title": "node 1",
        },
        {
          "children": [
            {
              "children": [],
              "id": "2-1",
              "parentId": "2",
              "title": "node 2-1",
            },
          ],
          "id": "2",
          "parentId": "",
          "title": "node 2",
        },
      ]
    `)
  })
  it('should build a tree from a list with custom field names', () => {
    const list = [
      { uid: '1', title: 'node 1', pid: '' },
      { uid: '1-1', title: 'node 1-1', pid: '1' },
      { uid: '1-2', title: 'node 1-2', pid: '1' },
      { uid: '1-1-1', title: 'node 1-1-1', pid: '1-1' },
    ]

    interface TreeNode {
      key: string
      title: string
      children: TreeNode[]
      pid: string
    }
    const tree = buildTreeFromList<TreeNode>(list, {
      listFieldNames: { id: 'uid', parentId: 'pid', children: '_Children' },
      treeFieldNames: { id: 'key', parentId: 'pid', children: 'children' },
    })
    expect(tree).toMatchInlineSnapshot(`
      [
        {
          "children": [
            {
              "children": [
                {
                  "children": [],
                  "key": "1-1-1",
                  "pid": "1-1",
                  "title": "node 1-1-1",
                  "uid": "1-1-1",
                },
              ],
              "key": "1-1",
              "pid": "1",
              "title": "node 1-1",
              "uid": "1-1",
            },
            {
              "children": [],
              "key": "1-2",
              "pid": "1",
              "title": "node 1-2",
              "uid": "1-2",
            },
          ],
          "key": "1",
          "pid": "",
          "title": "node 1",
          "uid": "1",
        },
      ]
    `)
  })
})
