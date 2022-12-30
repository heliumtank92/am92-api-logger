import winston from 'winston'
import HttpLoggerConfig from './Config/HttpLoggerConfig.mjs'
import LoggerConfig from './Config/LoggerConfig.mjs'

const logger = _createLogger(LoggerConfig)
const httpLogger = _createLogger(HttpLoggerConfig)

export {
  logger as default,
  httpLogger
}

function _createLogger (config) {
  const Logger = winston.createLogger(config)
  const logger = {
    error: Logger.error.bind(Logger),
    warn: Logger.warn.bind(Logger),
    success: Logger.success.bind(Logger),
    info: Logger.info.bind(Logger),
    debug: Logger.debug.bind(Logger),
    trace: Logger.trace.bind(Logger),
    log: Logger.debug.bind(Logger)
  }

  return logger
}
