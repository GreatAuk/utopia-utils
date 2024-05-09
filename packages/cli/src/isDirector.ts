import fs from 'node:fs/promises'

export async function isDirector(path: string): Promise<boolean> {
  try {
    const stat = await fs.stat(path)
    return stat.isDirectory()
  }
  catch {
    return false
  }
}
