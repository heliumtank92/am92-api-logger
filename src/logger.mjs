import winston from 'winston'
import LoggerOptions from './lib/LoggerOptions.mjs'
import DEBUG from './DEBUG.mjs'
import CONFIG from './CONFIG.mjs'

const { IS_PRODUCTION, SERVICE } = CONFIG

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

if (IS_PRODUCTION) {
  if (DEBUG.disableBlacklist) {
    logger.warn(`[${SERVICE} ApiLogger] Blacklisting Disabled as DEBUG is Set in Environment`)
  }

  if (!global.API_LOGGER_BLACKLIST_MASTER_KEY_HEX) {
    logger.warn(`[${SERVICE} ApiLogger] Blacklisting Disabled as API_LOGGER_BLACKLIST_MASTER_KEY_HEX is Not Set in Global`)
  }

  if (!global.API_LOGGER_BLACKLIST_KEYS || !global.API_LOGGER_BLACKLIST_KEYS.length) {
    logger.warn(`[${SERVICE} ApiLogger] Blacklisting Disabled as API_LOGGER_BLACKLIST_KEYS are Not Set in Global`)
  }

  if (!DEBUG.enableDebug) {
    logger.warn(`[${SERVICE} ApiLogger] Log Levels Debug, Trace & Log are Suppressed`)
  }
} else {
  logger.trace(`[${SERVICE} ApiLogger] Blacklisting Disabled for Non-Production Mode. Ensure API_LOGGER_BLACKLIST_MASTER_KEY_HEX & API_LOGGER_BLACKLIST_KEYS are set in Global to Enable Blacklisting in Production Mode`)
}
