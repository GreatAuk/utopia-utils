import { DEFAULT_FIELD_NAMES } from './constant'
import type { FieldNames } from './type'

interface Options {
  /** Customize node children field name */
  fieldNames?: Pick<FieldNames, 'children'>
}

/**
 * Tree Structure - Breadth-First Traverse (BFS or 广度优先遍历)
 * @param {TreeNode[] | TreeNode} tree - The tree to traverse.
 * @param options
 * @returns
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
export function breadthFirstTraverse<TreeNode>(tree: TreeNode[] | TreeNode, action: (node: TreeNode) => void, options?: Options) {
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

    action(node)
    // @ts-expect-error - This is ok
    if (node[children])
    // @ts-expect-error - This is ok
      queue.push(...node[children])
  }
}

