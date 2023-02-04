import { access } from 'node:fs/promises'

/**
 * It returns true if the path exists, and false if it doesn't
 * @param {string} path - The path to check.
 * @returns A promise that resolves to a boolean.
 */
export async function pathExists(path: string) {
  try {
    await access(path)
    return true
  }
  catch {
    return false
  }
}
