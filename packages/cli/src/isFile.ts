import fs from 'node:fs/promises'

/**
 * It returns true if the path is a file, and false if it's not
 * @param {string} path - The path to the file to check.
 * @returns A boolean value.
 */
export async function isFile(path: string) {
  try {
    const stat = await fs.stat(path)
    return stat.isFile()
  }
  catch {
    return false
  }
}
