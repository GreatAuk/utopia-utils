/**
 * get file name from path
 *
 * in Nodejs, you can use path.parse('/user/avatar.png').name
 * @param {string} path - The path to the file.
 * @returns file name
 */
export function getFileName(path: string) {
  return path.replace(/^.*(\\|\/)/, '')
}
