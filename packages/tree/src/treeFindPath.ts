import { DEFAULT_FIELD_NAMES } from './constant'
import type { FieldNames } from './type'

interface Options {
  /** Customize node field name */
  fieldNames?: Pick<FieldNames, 'children'>
}

/**
 * It takes a tree and a predicate, and returns the path to the first node that satisfies the predicate
 * @param {TreeNode[] | TreeNode} tree - The tree to search.
 * @param predicate - (node: TreeNode) => boolean
 * @param {Options}
 * @returns A path to a node in a tree that matches the predicate.
 * @linkcode https://github.com/GreatAuk/utopia-utils/blob/main/packages/tree/src/treeFindPath.ts
 * @example
 * ```ts
    const tree = [
      {
        name: 'a',
        children: [
          { name: 'b' },
        ],
      },
      {
        name: 'c',
      },
    ]

    const path = treeFindPath(tree, node => node.name === 'b')
    console.log(path?.map(v => v.name)) // ['a', 'b']
 * ```
 */
export function treeFindPath<TreeNode>(tree: TreeNode[] | TreeNode, predicate: (node: TreeNode) => boolean, options?: Options): TreeNode[] | null {
  const { fieldNames } = options || {}
  const { children: childrenField } = { ...DEFAULT_FIELD_NAMES, ...fieldNames }

  const path: TreeNode[] = []
  const queue = Array.isArray(tree) ? [...tree] : [tree]
  const visitedSet = new Set<TreeNode>()

  while (queue.length) {
    const node = queue[0]
    if (visitedSet.has(node)) {
      path.pop()
      queue.shift()
    }
    else {
      visitedSet.add(node)
      // @ts-expect-error - dynamic field name
      node[childrenField] && queue.unshift(...node[childrenField])
      path.push(node)
      if (predicate(node))
        return path
    }
  }
  return null
}
