import { DEFAULT_FIELD_NAMES } from './constant'
import type { FieldNames } from './type'

interface Options<TreeNode> {
  /** Customize node field name */
  fieldNames?: Pick<FieldNames, 'children'>
  /** Function called for each node in the tree */
  onEachTraverse?: (node: TreeNode) => void
}

/**
 * It takes a tree, a predicate function, and returns a filtered tree with
 * only the nodes that pass the predicate
 * @param {TreeNode[] | TreeNode} tree - The tree to filter.
 * @param predicate - (node: TreeNode) => boolean
 * @param {Options} [options] - {
 * @returns A filtered tree
 */
export function treeFilterNode<TreeNode>(tree: TreeNode[] | TreeNode, predicate: (node: TreeNode) => boolean, options?: Options<TreeNode>) {
  const { fieldNames, onEachTraverse } = options || {}
  const { children } = { ...DEFAULT_FIELD_NAMES, ...fieldNames }
  const _tree = Array.isArray(tree) ? [...tree] : [tree]

  function recursionFilter(_tree: TreeNode[]) {
    // copy the array to avoid mutating the original tree
    const copyTree = _tree.map(node => ({ ...node }))
    return copyTree.filter((node) => {
      // @ts-expect-error - dynamic field name
      if (node[children])
        // @ts-expect-error - dynamic field name
        node[children] = recursionFilter(node[children])

      onEachTraverse?.(node)
      // @ts-expect-error - dynamic field name
      return predicate(node) || !!node[children]?.length
    })
  }

  return recursionFilter(_tree)
}
