import winston from 'winston'
import LoggerConfig from './Config/LoggerConfig.mjs'
import { SERVICE } from './Config/WinstonConfig.mjs'
import DEBUG from './DEBUG.mjs'

const isProduction = process.env.NODE_ENV === 'production'
const Logger = winston.createLogger(LoggerConfig)
const logger = {
  fatal: Logger.fatal.bind(Logger),
  error: Logger.error.bind(Logger),
  success: Logger.success.bind(Logger),
  httpError: Logger.httpError.bind(Logger),
  httpSuccess: Logger.httpSuccess.bind(Logger),
  httpInfo: Logger.httpInfo.bind(Logger),
  warn: Logger.warn.bind(Logger),
  info: Logger.info.bind(Logger),
  debug: Logger.debug.bind(Logger),
  trace: Logger.trace.bind(Logger),
  log: Logger.debug.bind(Logger)
}

export default logger

if (DEBUG.disableBlacklist) {
  logger.warn(`[${SERVICE} ApiLogger] Blacklisting Disabled as DEBUG Value is Set in Environment`)
}

if (!global.API_LOGGER_BLACKLIST_MASTER_KEY_HEX) {
  logger.warn(`[${SERVICE} ApiLogger] Blacklisting Disabled as API_LOGGER_BLACKLIST_MASTER_KEY_HEX is Not Set in Global`)
}

if (!global.API_LOGGER_BLACKLIST_KEYS || !global.API_LOGGER_BLACKLIST_KEYS.length) {
  logger.warn(`[${SERVICE} ApiLogger] Blacklisting Disabled as API_LOGGER_BLACKLIST_KEYS are Not Set in Global`)
}

if (!DEBUG.enableDebug && isProduction) {
  logger.warn(`[${SERVICE} ApiLogger] Log Levels Debug, Trace & Log are Suppressed`)
}
