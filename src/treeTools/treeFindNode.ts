import type { FieldNames } from './type'
import { breadthFirstTraverse } from './breadthFirstTraverse'

interface Options {
  /** Customize node field name */
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
  const { isFindAll, fieldNames } = options || {}
  if (!predicate) {
    console.warn('predicate is required')
    return []
  }

  const res: TreeNode[] = []

  breadthFirstTraverse<TreeNode>(
    tree,
    (node) => {
      if (predicate(node)) {
        res.push(node)
        if (!isFindAll)
          return false
      }
    },
    {
      fieldNames,
    },
  )
  return res
}
