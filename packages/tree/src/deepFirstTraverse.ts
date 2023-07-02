import { isFunction } from '@utopia-utils/share'
import type { FieldNames } from './type'
import { DEFAULT_FIELD_NAMES } from './constant'

interface Options {
  /** Customize node children field name */
  fieldNames?: Pick<FieldNames, 'children'>
  /** Traverse order, support 'pre' and 'post' */
  order?: 'pre' | 'post'
}

interface TraverseAction<TreeNode> {
  (node: TreeNode, parent: TreeNode | null, level: number): unknown
}

/**
 * The function performs a deep first traversal of a tree data structure and applies a given action to
 * each node.
 * @param {TreeNode | TreeNode[]} tree - The tree parameter is either a single TreeNode or an array of
 * TreeNodes.
 * @param action - The function to be executed on each node of the tree during traversal. It takes
 * three arguments: the current node, its parent node (or null if it's the root node), and the current
 * level of the node in the tree. If the action function returns false, the traversal will be stopped.
 * @param {Options} [options]
 * @linkcode https://github.com/GreatAuk/utopia-utils/blob/main/packages/tree/src/deepFirstTraverse.ts
 * @example
 * ```ts
 * const tree = [
 *  {
 *    name: 'a',
 *    children: [
 *      { name: 'b' }
 *    ],
 *  },
 *  {
 *    name: 'c',
 *  }
 * ]
 * deepFirstTraverse(tree, node => console.log(node.name))
 * // output 'a', 'b', 'c'
 * ```
 */
export function deepFirstTraverse<TreeNode>(tree: TreeNode | TreeNode[], action: TraverseAction<TreeNode>, options?: Options) {
  if (!isFunction(action))
    throw new Error('traverse action should be a function')

  const { fieldNames, order = 'pre' } = options || {}
  const { children } = { ...DEFAULT_FIELD_NAMES, ...fieldNames }

  const traverseInner = (tree: TreeNode[], parent: TreeNode | null, level: number) => {
    for (const node of tree) {
      if (order === 'pre') {
        if (action(node, parent, level) === false)
          return false
      }

      // @ts-expect-error - children field is dynamic
      if (node[children]) {
        // @ts-expect-error - children field is dynamic
        const res = traverseInner(node[children], node, level + 1)
        if (res === false)
          return false
      }

      if (order === 'post') {
        if (action(node, parent, level) === false)
          return false
      }
    }
  }

  traverseInner(Array.isArray(tree) ? tree : [tree], null, 0)
}
