/**
 * The function checks if the DOM (Document Object Model) can be used in the current environment.
 * @returns a boolean value indicating whether the DOM (Document Object Model) can be used.
 * @linkcode https://github.com/GreatAuk/utopia-utils/blob/main/packages/dom/src/canUseDom.ts
 */
export function canUseDom() {
  return !!(typeof window !== 'undefined' && window.document && window.document.createElement)
}
