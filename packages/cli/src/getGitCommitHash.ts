import { execSync } from 'node:child_process'

/**
 * return the current commit hash
 * @returns The git commit hash
 */
export function getGitCommitHash(): string | undefined {
  try {
    const hash = execSync('git rev-parse --short HEAD').toString().replace('\n', '').trim()
    if (hash === 'undefined')
      throw new Error('Could not retrieve git commit hash.')
    return hash
  }
  catch {
    console.error('Could not retrieve git commit hash.')
  }
}
