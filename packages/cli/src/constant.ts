import path from 'node:path'

/** The path to the node_modules cache directory. */
export const CACHE_DIR = path.resolve(process.cwd(), 'node_modules/.cache')
