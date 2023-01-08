import { DEFAULT_FIELD_NAMES } from './constant'
import type { FieldNames } from './type'

interface Options {
  /**
   * custom list field names
   *
   * default is { id: 'id', parentId: 'parentId', children: 'children' }
   */
  listFieldNames?: FieldNames
  /**
   * custom tree field names
   *
   * default is { id: 'id', parentId: 'parentId', children: 'children' }
   */
  treeFieldNames?: FieldNames
}

/**
 * It takes a list of items and returns a tree of items
 * @param {any[]} list - the list of items to be converted to a tree
 * @param {Options} [options] - {
 * @returns A tree structure
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
