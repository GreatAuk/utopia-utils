import { describe, expect, it } from 'vitest'
import { getHostProjectPkgVersion } from './getHostProjectPkgVersion'

describe('getHostProjectPkgVersion', () => {
  it('returns the version of the host project', () => {
    expect(getHostProjectPkgVersion()).not.toBeFalsy()
  })
})
