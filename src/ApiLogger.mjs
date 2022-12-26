import winston from 'winston'

import ConsoleConfig from './Config/ConsoleConfig.mjs'
import ConsoleVerboseConfig from './Config/ConsoleVerboseConfig.mjs'

const isProduction = process.env.NODE_ENV === 'production'
const LoggerConfig = isProduction ? ConsoleVerboseConfig : ConsoleConfig

const Logger = winston.createLogger(LoggerConfig)

const ApiLogger = {
  error: Logger.error.bind(Logger),
  warn: Logger.warn.bind(Logger),
  info: Logger.info.bind(Logger),
  debug: Logger.debug.bind(Logger),
  trace: Logger.trace.bind(Logger),
  log: Logger.debug.bind(Logger)
}

export default ApiLogger
