import winston from 'winston'
import LoggerOptions, { SERVICE } from './lib/LoggerOptions.mjs'
import DEBUG from './DEBUG.mjs'
import CONFIG from './CONFIG.mjs'

const { IS_PRODUCTION } = CONFIG

const Logger = winston.createLogger(LoggerOptions)

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

if (!DEBUG.enableDebug && IS_PRODUCTION) {
  logger.warn(`[${SERVICE} ApiLogger] Log Levels Debug, Trace & Log are Suppressed`)
}
