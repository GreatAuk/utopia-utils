import { getGitCommitHash } from './getGitCommitHash'

describe('getGitCommitHash', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })
  it('returns the current commit hash', () => {
    // for example 'a1b2c3d'
    expect(getGitCommitHash()).toHaveLength(7)
  })
  // it('should throw an error when returned is undefined', () => {
  //   const mockExecSync = vi.fn().mockImplementation(execSync)
  //   mockExecSync.mockReturnValueOnce('undefined')
  //   // for example 'a1b2c3d'
  //   expect(getGitCommitHash()).toThrowError('Could not retrieve git commit hash.')
  // })
})
