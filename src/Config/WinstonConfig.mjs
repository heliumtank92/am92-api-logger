import winston from 'winston'
import DEBUG from '../DEBUG.mjs'

const {
  npm_package_name: pkgName = '',
  npm_package_version: pkgVersion = '',
  NODE_ENV
} = process.env
const SERVICE = `${pkgName}@${pkgVersion}`

const defaultMeta = { service: SERVICE }
const transports = [new winston.transports.Console()]

const DEFAULT_CONFIG = {
  defaultMeta,
  levels: {
    fatal: 0,
    error: 0,
    success: 0,
    httpError: 0,
    httpSuccess: 0,
    httpInfo: 0,
    warn: 1,
    info: 2,
    debug: 3,
    trace: 4
  },
  level: (DEBUG.enableDebug && 'trace') || (NODE_ENV === 'production' ? 'info' : 'trace'),
  exitOnError: false,
  transports
}

export {
  DEFAULT_CONFIG,
  SERVICE
}
