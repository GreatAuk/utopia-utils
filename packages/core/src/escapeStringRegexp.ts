/**
 * It escapes all the special characters in a string so that it can be used in a regular expression
 *
 * fork from {@link https://github.com/sindresorhus/escape-string-regexp}
 * @param [string] - The string to escape. Defaults to an empty string.
 *
 */
export const escapeStringRegexp = (string = '') =>
  string.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&').replace(/-/g, '\\x2d')
