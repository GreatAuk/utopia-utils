/**
 * get file name from path
 *
 * in Nodejs, you can use path.parse('/user/avatar.png').name
 * @param {string} path - The path to the file.
 * @returns file name
 * @linkcode https://github.com/GreatAuk/utopia-utils/blob/main/packages/core/src/getFileName.ts
 */
export function getFileName(path: string) {
  return path.replace(/^.*(\\|\/)/, '')
}
