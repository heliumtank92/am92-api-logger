import winston from 'winston'
import LoggerOptions from './lib/LoggerOptions.mjs'
import DEBUG from './DEBUG.mjs'
import CONSTANTS from './CONSTANTS.mjs'
import CONFIG from './CONFIG.mjs'

const { IS_PRODUCTION, SERVICE } = CONFIG

const Logger = winston.createLogger(LoggerOptions)

const apiLogger = {
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

export default apiLogger

if (IS_PRODUCTION) {
  if (DEBUG.disableBlacklist) {
    apiLogger.warn(`[${SERVICE} ApiLogger] Blacklisting Disabled as DEBUG is Set in Environment`)
  }

  if (!CONSTANTS.MASTER_KEY_HEX) {
    apiLogger.warn(`[${SERVICE} ApiLogger] Blacklisting Disabled as API_LOGGER_BLACKLIST_MASTER_KEY_HEX is Not Set in Global`)
  }

  if (!CONSTANTS.BLACKLIST_KEYS || !CONSTANTS.BLACKLIST_KEYS.length) {
    apiLogger.warn(`[${SERVICE} ApiLogger] Blacklisting Disabled as API_LOGGER_BLACKLIST_KEYS are Not Set in Global`)
  }

  if (CONSTANTS.MASTER_KEY_HEX && !CONSTANTS.MASTER_KEY_BUFFER) {
    apiLogger.warn(`[${SERVICE} ApiLogger] Blacklisting Disabled as Invalid API_LOGGER_BLACKLIST_MASTER_KEY_HEX provided for algorithm '${CONSTANTS.ENCRYPT_ALGO}'`)
  }

  if (!DEBUG.enableDebug) {
    apiLogger.warn(`[${SERVICE} ApiLogger] Log Levels Debug, Trace & Log are Suppressed`)
  }
} else {
  apiLogger.trace(`[${SERVICE} ApiLogger] Blacklisting Disabled for Non-Production Mode. Ensure API_LOGGER_BLACKLIST_MASTER_KEY_HEX & API_LOGGER_BLACKLIST_KEYS are set in Global to Enable Blacklisting in Production Mode`)
}
