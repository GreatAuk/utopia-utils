import { DEFAULT_FIELD_NAMES } from './constant'
import type { FieldNames } from './type'

interface Options {
  /** Customize node children field name */
  fieldNames?: Pick<FieldNames, 'children'>
}

/**
 * Breadth-First Traverse (BFS or 广度优先遍历)
 * @param {TreeNode[] | TreeNode} tree - The tree to traverse.
 * @param action - (node: TreeNode) => unknown ; function called for each node in the tree, return false to stop traverse
 * @param {Options} [options]
 * @example
 * ```
    const tree = [
      {
        name: 'a',
        children: [
          { name: 'b' }
        ],
      },
      {
        name: 'c',
      }
    ]
    breadthFirstTraverse(tree, node => console.log(node.name), {
      fieldNames: {
        children: 'Children_', // default is children
      }
    })
    // output 'a', 'c', 'b'
  * ```
 */
export function breadthFirstTraverse<TreeNode>(tree: TreeNode[] | TreeNode, action: (node: TreeNode) => unknown, options?: Options) {
  if (!action) {
    console.warn('traverse action is required')
    return
  }

  const { fieldNames } = options || {}
  const { children } = { ...DEFAULT_FIELD_NAMES, ...fieldNames }
  const queue = Array.isArray(tree) ? [...tree] : [tree]

  while (queue.length) {
    const node = queue.shift()
    if (!node)
      continue

    // if action return false, stop traverse
    if (action(node) === false)
      break

    // @ts-expect-error - This is ok
    if (node[children])
    // @ts-expect-error - This is ok
      queue.push(...node[children])
  }
}

