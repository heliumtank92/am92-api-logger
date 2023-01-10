const {
  npm_package_name: pkgName = '',
  npm_package_version: pkgVersion = '',
  NODE_ENV
} = process.env

const IS_PRODUCTION = NODE_ENV === 'production'
const SERVICE = `${pkgName}@${pkgVersion}`

const CONFIG = {
  IS_PRODUCTION,
  SERVICE
}

export default CONFIG
