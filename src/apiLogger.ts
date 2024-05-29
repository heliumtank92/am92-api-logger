import winston, { Logger } from 'winston'
import loggerOptions from './lib/loggerOptions'
import { ApiLogger } from './TYPES'

/** @ignore */
const logger = winston.createLogger(loggerOptions) as Logger & ApiLogger

/** @ignore */
export const apiLogger: ApiLogger = {
  fatal: logger.fatal.bind(logger),
  error: logger.error.bind(logger),
  success: logger.success.bind(logger),
  httpError: logger.httpError.bind(logger),
  httpSuccess: logger.httpSuccess.bind(logger),
  httpInfo: logger.httpInfo.bind(logger),
  warn: logger.warn.bind(logger),
  info: logger.info.bind(logger),
  debug: logger.debug.bind(logger),
  trace: logger.trace.bind(logger),
  log: logger.debug.bind(logger)
}
