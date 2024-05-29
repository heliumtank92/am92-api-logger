/** @ignore */
const {
  npm_package_name: pkgName = '',
  npm_package_version: pkgVersion = '',
  NODE_ENV
} = process.env

/** @ignore */
export const SERVICE = `${pkgName}@${pkgVersion}`

/** @ignore */
export const IS_PRODUCTION = NODE_ENV === 'production'
