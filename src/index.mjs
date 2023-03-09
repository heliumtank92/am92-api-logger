import winston from 'winston'
import LoggerOptions from './lib/LoggerOptions.mjs'
import DEBUG from './DEBUG.mjs'
import CONSTANTS from './CONSTANTS.mjs'
import CONFIG from './CONFIG.mjs'

const { IS_PRODUCTION, SERVICE } = CONFIG

const Logger = winston.createLogger(LoggerOptions)

const ApiLogger = {
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

export default ApiLogger

if (IS_PRODUCTION) {
  if (DEBUG.disableBlacklist) {
    ApiLogger.warn(`[${SERVICE} ApiLogger] Blacklisting Disabled as DEBUG is Set in Environment`)
  }

  if (!CONSTANTS.MASTER_KEY_HEX) {
    ApiLogger.warn(`[${SERVICE} ApiLogger] Blacklisting Disabled as API_LOGGER_BLACKLIST_MASTER_KEY_HEX is Not Set in Global`)
  }

  if (!CONSTANTS.BLACKLIST_KEYS || !CONSTANTS.BLACKLIST_KEYS.length) {
    ApiLogger.warn(`[${SERVICE} ApiLogger] Blacklisting Disabled as API_LOGGER_BLACKLIST_KEYS are Not Set in Global`)
  }

  if (CONSTANTS.MASTER_KEY_HEX && !CONSTANTS.MASTER_KEY_BUFFER) {
    ApiLogger.warn(`[${SERVICE} ApiLogger] Blacklisting Disabled as Invalid API_LOGGER_BLACKLIST_MASTER_KEY_HEX provided for algorithm '${CONSTANTS.ENCRYPT_ALGO}'`)
  }

  if (!DEBUG.enableDebug) {
    ApiLogger.warn(`[${SERVICE} ApiLogger] Log Levels Debug, Trace & Log are Suppressed`)
  }
} else {
  ApiLogger.info(`[${SERVICE} ApiLogger] Blacklisting Disabled for Non-Production Mode.`)

  if (DEBUG.disableBlacklist) {
    ApiLogger.warn(`[${SERVICE} ApiLogger] Blacklisting Disabled for Production Mode as DEBUG is Set in Environment`)
  }

  if (!CONSTANTS.MASTER_KEY_HEX) {
    ApiLogger.warn(`[${SERVICE} ApiLogger] Blacklisting Disabled for Production Mode as API_LOGGER_BLACKLIST_MASTER_KEY_HEX is Not Set in Global`)
  }

  if (!CONSTANTS.BLACKLIST_KEYS || !CONSTANTS.BLACKLIST_KEYS.length) {
    ApiLogger.warn(`[${SERVICE} ApiLogger] Blacklisting Disabled for Production Mode as API_LOGGER_BLACKLIST_KEYS are Not Set in Global`)
  }

  if (CONSTANTS.MASTER_KEY_HEX && !CONSTANTS.MASTER_KEY_BUFFER) {
    ApiLogger.warn(`[${SERVICE} ApiLogger] Blacklisting Disabled for Production Mode as Invalid API_LOGGER_BLACKLIST_MASTER_KEY_HEX provided for algorithm '${CONSTANTS.ENCRYPT_ALGO}'`)
  }
}
