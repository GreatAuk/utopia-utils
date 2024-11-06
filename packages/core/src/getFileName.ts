/**
 * get file name from path
 *
 * in Nodejs, you can use path.parse('/user/avatar.png').name
 * @param {string} path - The path to the file.
 * @returns file name
 * @linkcode https://github.com/GreatAuk/utopia-utils/blob/main/packages/core/src/getFileName.ts
 * @example
 * ```ts
 * getFileName('/user/avatar.png') // 'avatar.png'
 * getFileName('C:\\foo\\bar\\baz\\name.test.txt') // 'name.test.txt'
 * ```
 */
export function getFileName(path: string): string {
  return path.replace(/^.*(\\|\/)/, '')
}
