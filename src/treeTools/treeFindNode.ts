import { DEFAULT_FIELD_NAMES } from './constant'
import type { FieldNames } from './type'

interface Options {
  /** Customize node children field name */
  fieldNames?: Pick<FieldNames, 'children'>
  /** whether to find all nodes, default is find first node */
  isFindAll?: boolean
}

/**
 * Returns the first node or all nodes in the tree that matches the predicate (use breadth-first traverse).
 * @param {TreeNode[] | TreeNode} tree - TreeNode[] | TreeNode
 * @param predicate - (node: TreeNode) => boolean
 * @param {Options} [options]
 * @returns {TreeNode[]} - a array of TreeNode that matches the predicate
 * @example
 * ```
    const tree = [
      {
        name: 'a',
        children: [
          { name: 'b' },
        ],
      }
    ]
    const res = treeFindNode(tree, node => node.name === 'b') // res is [{ name: 'b' }]
 * ```
 */
export function treeFindNode<TreeNode>(tree: TreeNode[] | TreeNode, predicate: (node: TreeNode) => boolean, options?: Options) {
  if (!predicate) {
    console.warn('predicate is required')
    return []
  }
  const { fieldNames, isFindAll } = options || {}
  const { children } = { ...DEFAULT_FIELD_NAMES, ...fieldNames }
  const queue = Array.isArray(tree) ? [...tree] : [tree]
  const res: TreeNode[] = []

  while (queue.length) {
    const node = queue.shift()
    if (!node)
      continue

    if (predicate(node)) {
      res.push(node)
      if (!isFindAll)
        return res
    }
    // @ts-expect-error - This is ok
    if (node[children])
    // @ts-expect-error - This is ok
      queue.push(...node[children])
  }
  return res
}
