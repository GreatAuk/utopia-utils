import { DEFAULT_FIELD_NAMES } from './constant'
import type { FieldNames } from './type'

interface Options<TreeNode> {
  /**
   * customize node field name
   *
   * @default { id: 'id', parentId: 'parentId', children: 'children' }
   * */
  fieldNames?: FieldNames
  /** Function called for each node in the tree */
  onEachTraverse?: (node: TreeNode) => void
}

/**
 * It takes a tree and returns a flat array of all the nodes in the tree
 * @param {TreeNode | TreeNode[]} tree - The tree to flatten.
 * @param [options]
 * @returns An array of all the nodes in the tree.
 * @linkcode https://github.com/GreatAuk/utopia-utils/blob/main/packages/tree/src/flattenTree.ts
 * @example
 * ```
    const tree = {
      id: 1,
      children: [
        {
          id: 2,
        },
      ],
    }
    const list = flattenTree(tree)
    console.log(list)
    // output
    // [
    //   {
    //     "ID": 1,
    //     "children": [
    //       {
    //         "ID": 2,
    //       },
    //     ],
    //   },
    //   {
    //     "ID": 2,
    //   },
    // ]
 * ```
 */
export function flattenTree<TreeNode>(tree: TreeNode | TreeNode[], options?: Options<TreeNode>): TreeNode[] {
  const { fieldNames, onEachTraverse } = options || {}
  const { children } = { ...DEFAULT_FIELD_NAMES, ...fieldNames }

  const queue = Array.isArray(tree) ? [...tree] : [tree]

  for (let i = 0; i < queue.length; i++) {
    const node = queue[i]
    onEachTraverse?.(node)
    // @ts-expect-error - dynamic field name
    if (node[children])
      // @ts-expect-error - dynamic field name
      queue.splice(i + 1, 0, ...node[children])
  }

  return queue
}
