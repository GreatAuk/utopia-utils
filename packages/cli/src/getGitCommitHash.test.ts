import { getGitCommitHash } from './getGitCommitHash'

describe('getGitCommitHash', () => {
  it('returns the current commit hash', () => {
    // for example 'a1b2c3d'
    expect(getGitCommitHash()).toHaveLength(7)
  })
})
