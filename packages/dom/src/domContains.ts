/**
 * The function checks if a given node is contained within a root node, using either the native
 * `contains` method or a fallback method for older browsers.
 * @param {Node | null | undefined} root - The `root` parameter represents the root node of a tree or
 * subtree.
 * @param {Node | null} n - The parameter `n` represents a Node object that we want to check if it is
 * contained within the `root` Node object.
 * @returns a boolean value. It returns `true` if the `root` node contains the `n` node, and `false`
 * otherwise.
 * @linkcode https://github.com/GreatAuk/utopia-utils/blob/main/packages/dom/src/contains.ts
 */
export function domContains(root: Node | null | undefined, n: Node | null) {
  if (!root)
    return false

  // Use native if support
  if (root.contains)
    return root.contains(n)

  // `document.contains` not support with IE11
  let node = n
  while (node) {
    if (node === root)
      return true

    node = node.parentNode
  }

  return false
}
