/**
 * It returns the version of the host project's package.json file
 * @returns version
 */
export function getHostProjectPkgVersion() {
  return process.env.npm_package_version as string
}
