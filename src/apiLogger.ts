import winston, { Logger } from 'winston'
import loggerOptions from './lib/loggerOptions'
import { ApiLogger } from './TYPES'
import { IS_PRODUCTION, SERVICE } from './CONFIG'
import DEBUG from './DEBUG'
import CONSTANTS from './CONSTANTS'

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

if (IS_PRODUCTION) {
  if (DEBUG.disableBlacklist) {
    apiLogger.warn(
      `[${SERVICE} ApiLogger] Blacklisting Disabled as DEBUG is Set in Environment`
    )
  }

  if (!CONSTANTS.BLACKLIST_KEYS || !CONSTANTS.BLACKLIST_KEYS.length) {
    apiLogger.warn(
      `[${SERVICE} ApiLogger] Blacklisting Disabled as API_LOGGER_BLACKLIST_KEYS are Not Set in Global`
    )
  }

  if (!CONSTANTS.GLOBAL_MASTER_KEY_BUFFER_VALID) {
    apiLogger.warn(
      `[${SERVICE} ApiLogger] Blacklisting using DEFAULT_MASTER_KEY`
    )
  }

  if (!CONSTANTS.GLOBAL_MASTER_IV_BUFFER_VALID) {
    apiLogger.warn(
      `[${SERVICE} ApiLogger] Blacklisting using DEFAULT_MASTER_IV`
    )
  }

  if (!DEBUG.enableDebug) {
    apiLogger.warn(
      `[${SERVICE} ApiLogger] Log Levels Debug, Trace & Log are Suppressed`
    )
  }
} else {
  apiLogger.info(
    `[${SERVICE} ApiLogger] Blacklisting Disabled for Non-Production Mode.`
  )

  if (DEBUG.disableBlacklist) {
    apiLogger.warn(
      `[${SERVICE} ApiLogger] Blacklisting Disabled for Production Mode as DEBUG is Set in Environment`
    )
  }

  if (!CONSTANTS.BLACKLIST_KEYS || !CONSTANTS.BLACKLIST_KEYS.length) {
    apiLogger.warn(
      `[${SERVICE} ApiLogger] Blacklisting Disabled for Production Mode as API_LOGGER_BLACKLIST_KEYS are Not Set in Global`
    )
  }

  if (!CONSTANTS.GLOBAL_MASTER_KEY_BUFFER_VALID) {
    apiLogger.warn(
      `[${SERVICE} ApiLogger] Blacklisting in Production Mode will use DEFAULT_MASTER_KEY`
    )
  }

  if (!CONSTANTS.GLOBAL_MASTER_IV_BUFFER_VALID) {
    apiLogger.warn(
      `[${SERVICE} ApiLogger] Blacklisting in Production Mode will use DEFAULT_MASTER_IV`
    )
  }
}
