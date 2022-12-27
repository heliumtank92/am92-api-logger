import winston from 'winston'
import chalk from 'chalk'

const LEVEL_COLOR_MAP = {
  error: chalk.redBright,
  warn: chalk.yellowBright,
  success: chalk.greenBright,
  info: chalk.blueBright,
  debug: chalk.whiteBright,
  trace: chalk.blackBright
}

const {
  npm_package_name: pkgName = '',
  npm_package_version: pkgVersion = ''
} = process.env

const SERVICE = `${pkgName}@${pkgVersion}`

const transports = [new winston.transports.Console()]

const DEFAULT_CONFIG = {
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

const DEFAULT_META = { service: SERVICE }

export {
  LEVEL_COLOR_MAP,
  DEFAULT_META,
  DEFAULT_CONFIG
}
