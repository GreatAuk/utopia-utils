import fs from 'node:fs/promises'

export async function isDirector(path: string) {
  try {
    const stat = await fs.stat(path)
    return stat.isDirectory()
  }
  catch {
    return false
  }
}
