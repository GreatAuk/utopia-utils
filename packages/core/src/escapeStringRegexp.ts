/**
 * It escapes all the special characters in a string so that it can be used in a regular expression
 *
 * fork from {@link https://github.com/sindresorhus/escape-string-regexp}
 * @param [string] - The string to escape. Defaults to an empty string.
 * @linkcode https://github.com/GreatAuk/utopia-utils/blob/main/packages/core/src/escapeStringRegexp.ts
 */
export function escapeStringRegexp(string = ''): string {
  return string.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&').replace(/-/g, '\\x2d')
}
