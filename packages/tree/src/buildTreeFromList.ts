import { DEFAULT_FIELD_NAMES } from './constant'
import type { FieldNames } from './type'

interface Options {
  /**
   * custom list field names
   *
   * @default { id: 'id', parentId: 'parentId', children: 'children' }
   */
  listFieldNames?: FieldNames
  /**
   * custom tree field names
   *
   * @default { id: 'id', parentId: 'parentId', children: 'children' }
   */
  treeFieldNames?: FieldNames
}

/**
 * It takes a list of items and returns a tree of items
 * @param {any[]} list - the list of items to be converted to a tree
 * @param {Options} [options] - {
 * @returns A tree structure
 * @linkcode https://github.com/GreatAuk/utopia-utils/blob/main/packages/tree/src/buildTreeFromList.ts
 * @example
  * ```
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
 * ```
 */
export function buildTreeFromList<TreeNode>(list: any[], options?: Options) {
  const { listFieldNames, treeFieldNames } = options || {}
  const { id: listIdField, parentId: listParentIdField } = { ...DEFAULT_FIELD_NAMES, ...listFieldNames }
  const { id: treeIdField, parentId: treeParentIdField, children: treeChildrenField } = { ...DEFAULT_FIELD_NAMES, ...treeFieldNames }

  const nodeMap = new Map<string, any>()
  const treeRes: TreeNode[] = []

  list.forEach((item) => {
    if (treeFieldNames) {
      item[treeIdField] = item[listIdField]
      item[treeParentIdField] = item[listParentIdField]
    }
    item[treeChildrenField] = []
    nodeMap.set(item[listIdField], item)
  })

  list.forEach((item) => {
    const parent = nodeMap.get(item[listParentIdField])
    if (parent)
      parent[treeChildrenField].push(item)

    else
      treeRes.push(item)
  })

  return treeRes
}
