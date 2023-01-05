import winston from 'winston'
import chalk from 'chalk'

const LEVEL_COLOR_MAP = {
  error: chalk.redBright,
  warn: chalk.yellowBright,
  success: chalk.greenBright,
  info: chalk.blueBright,
  trace: chalk.whiteBright
}

const {
  npm_package_name: pkgName = '',
  npm_package_version: pkgVersion = ''
} = process.env
const SERVICE = `${pkgName}@${pkgVersion}`

const defaultMeta = { service: SERVICE }
const transports = [new winston.transports.Console()]

const DEFAULT_CONFIG = {
  defaultMeta,
  levels: {
    error: 0,
    warn: 1,
    success: 2,
    info: 3,
    debug: 4,
    trace: 5
  },
  level: 'trace',
  exitOnError: false,
  transports
}

export {
  LEVEL_COLOR_MAP,
  DEFAULT_CONFIG,
  SERVICE
}
