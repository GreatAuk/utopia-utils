import { isPlainObject } from '@utopia-utils/share'

/**
 * The function sets CSS variables on the root element of a document using the provided variables
 * object.
 * @param variables - The `variables` parameter is an object that contains key-value pairs representing
 * CSS variable names and their corresponding values.
 * @param root - The `root` parameter is an optional parameter that represents the root element where
 * the CSS variables should be set. By default, it is set to `window?.document?.documentElement`, which
 * refers to the root element of the current document.
 * @linkcode https://github.com/GreatAuk/utopia-utils/blob/main/packages/dom/src/setCssVar.ts
 */
export function setCssVar(variables: Record<string, any>, root = window?.document?.documentElement) {
  if (variables && isPlainObject(variables) && root) {
    Object.keys(variables).forEach((key) => {
      root.style.setProperty(key, variables[key])
    })
  }
}
