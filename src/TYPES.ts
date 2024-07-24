import { CipherKey } from 'crypto'
import { InspectOptions } from 'util'
import { LeveledLogMethod, LogEntry, LoggerOptions } from 'winston'

/**
 * List of debug features for the API logger.
 *
 * @type {readonly ["disableBlacklist", "enableDebug"]}
 */
export const API_LOGGER_DEBUG_FEATURES = [
  'disableBlacklist',
  'enableDebug'
] as const

/**
 * Type representing the possible debug features for the API logger.
 *
 * @export
 * @typedef {ApiLoggerDebugFeatures}
 */
export type ApiLoggerDebugFeatures = (typeof API_LOGGER_DEBUG_FEATURES)[number]

/**
 * Type representing the debug configuration for the API logger.
 *
 * @export
 * @typedef {ApiLoggerDebug}
 */
export type ApiLoggerDebug = Record<ApiLoggerDebugFeatures, boolean>

/**
 * Interface representing the constants used in the API logger.
 *
 * @export
 * @interface ApiLoggerConstants
 * @typedef {ApiLoggerConstants}
 */
export interface ApiLoggerConstants {
  /**
   * Unique tracking ID for the API logger.
   *
   * @type {string}
   */
  TRACKING_ID: string
  /**
   * Encryption algorithm used by the API logger.
   *
   * @type {string}
   */
  ENCRYPT_ALGO: string
  /**
   * List of keys to be blacklisted by the API logger.
   *
   * @type {string[]}
   */
  BLACKLIST_KEYS: string[]
  /**
   * Default master key in hexadecimal format.
   *
   * @type {string}
   */
  DEFAULT_MASTER_KEY_HEX: string
  /**
   * Default master IV in hexadecimal format.
   *
   * @type {string}
   */
  DEFAULT_MASTER_IV_HEX: string
  /**
   * Global master key in hexadecimal format.
   *
   * @type {string}
   */
  GLOBAL_MASTER_KEY_HEX: string
  /**
   * Global master IV in hexadecimal format.
   *
   * @type {string}
   */
  GLOBAL_MASTER_IV_HEX: string
  /**
   * Flag indicating if the global master key buffer is valid.
   *
   * @type {boolean}
   */
  GLOBAL_MASTER_KEY_BUFFER_VALID: boolean
  /**
   * Flag indicating if the global master IV buffer is valid.
   *
   * @type {boolean}
   */
  GLOBAL_MASTER_IV_BUFFER_VALID: boolean
  /**
   * Uint8Array containing the master key.
   *
   * @type {Uint8Array}
   */
  MASTER_KEY_BUFFER: Uint8Array
  /**
   * Uint8Array containing the master IV.
   *
   * @type {Uint8Array}
   */
  MASTER_IV_BUFFER: Uint8Array
}

/**
 * Type representing the log levels for the API logger.
 *
 * @export
 * @typedef {ApiLoggerLogLevel}
 */
export type ApiLoggerLogLevel =
  | 'httpInfo'
  | 'httpSuccess'
  | 'httpError'
  | 'debug'
  | 'info'
  | 'success'
  | 'fatal'
  | 'error'
  | 'warn'
  | 'trace'

/**
 * Type representing the options for the API logger.
 *
 * @export
 * @typedef {ApiLoggerOptions}
 */
export type ApiLoggerOptions = LoggerOptions & {
  levels: Record<ApiLoggerLogLevel, number>
}

/**
 * Type representing the log method for the API logger.
 *
 * @export
 * @typedef {ApiLoggerLogMethod}
 */
export type ApiLoggerLogMethod = LeveledLogMethod

/**
 * Type representing the API logger with various log levels and a log method.
 *
 * @export
 * @typedef {ApiLogger}
 */
export type ApiLogger = Record<ApiLoggerLogLevel, ApiLoggerLogMethod> & {
  log: ApiLoggerLogMethod
}

/**
 * Unique symbol key for the API logger splat.
 *
 * @internal
 * @type {unique symbol}
 */
export const API_LOGGER_SPLAT_KEY: unique symbol = Symbol.for('splat')

/**
 * Type representing a log entry for the API logger.
 *
 * @internal
 * @export
 * @typedef {ApiLoggerLogEntry}
 */
export type ApiLoggerLogEntry = LogEntry & {
  level: ApiLoggerLogLevel | string
  [API_LOGGER_SPLAT_KEY]?: string[]
}

/**
 * Type representing the configuration for a log level in the API logger.
 *
 * @internal
 * @export
 * @typedef {ApiLoggerLogLevelConfig}
 */
export type ApiLoggerLogLevelConfig = {
  inspectOptions: InspectOptions
  colorFunc: (text: string) => string
}

/**
 * Interface representing a request log object for the API logger.
 *
 * @export
 * @interface ApiLoggerLogObjectRequest
 * @typedef {ApiLoggerLogObjectRequest}
 */
export interface ApiLoggerLogObjectRequest {
  /**
   * HTTP version of the request.
   *
   * @type {?string}
   */
  httpVersion?: string
  /**
   * IP address of the client making the request.
   *
   * @type {?string}
   */
  ipAddress?: string
  /**
   * URL of the request.
   *
   * @type {string}
   */
  url: string
  /**
   * HTTP method of the request.
   *
   * @type {string}
   */
  method: string
  /**
   * Headers of the request.
   *
   * @type {?(string | object)}
   */
  headers?: string | object
  /**
   * Body of the request.
   *
   * @type {?any}
   */
  body?: any
}

/**
 * Interface representing a response log object for the API logger.
 *
 * @export
 * @interface ApiLoggerLogObjectResponse
 * @typedef {ApiLoggerLogObjectResponse}
 */
export interface ApiLoggerLogObjectResponse {
  /**
   * HTTP status code of the response.
   *
   * @type {number}
   */
  statusCode: number
  /**
   * Status message of the response.
   *
   * @type {string}
   */
  status: string
  /**
   * Headers of the response.
   *
   * @type {string | object}
   */
  headers?: string | object
  /**
   * Body of the response.
   *
   * @type {?any}
   */
  body?: any
  /**
   * Response message.
   *
   * @type {?string}
   */
  responseMessage?: string
  /**
   * Time taken to generate the response.
   *
   * @type {?number}
   */
  responseTime?: number
}

/**
 * Interface representing a log object for the API logger.
 *
 * @export
 * @interface ApiLoggerLogObject
 * @typedef {ApiLoggerLogObject}
 */
export interface ApiLoggerLogObject {
  /**
   * Service name associated with the log.
   *
   * @type {?string}
   */
  service?: string
  /**
   * Type of log.
   *
   * @type {?string}
   */
  type?: string
  /**
   * Unique identifier for the log.
   *
   * @type {?string}
   */
  logId?: string
  /**
   * Tracking ID associated with the log.
   *
   * @type {?string}
   */
  trackingId?: string
  /**
   * Log message.
   *
   * @type {?string}
   */
  message?: string
  /**
   * Timestamp of the log.
   *
   * @type {number}
   */
  timestamp?: number
  /**
   * Log level.
   *
   * @type {?ApiLoggerLogLevel}
   */
  level?: ApiLoggerLogLevel
  /**
   * Additional data associated with the log.
   *
   * @type {?(string | any[])}
   */
  data?: any
  /**
   * Request object associated with the log.
   *
   * @type {?ApiLoggerLogObjectRequest}
   */
  req?: ApiLoggerLogObjectRequest
  /**
   * Response object associated with the log.
   *
   * @type {?ApiLoggerLogObjectResponse}
   */
  res?: ApiLoggerLogObjectResponse
}

declare global {
  /**
   * Global variable for API logger blacklist keys.
   *
   * @type {string[]}
   */
  var API_LOGGER_BLACKLIST_KEYS: string[] | undefined
  /**
   * Global variable for API logger blacklist master key in hexadecimal format.
   *
   * @type {string}
   */
  var API_LOGGER_BLACKLIST_MASTER_KEY_HEX: string | undefined
  /**
   * Global variable for API logger blacklist master IV in hexadecimal format.
   *
   * @type {string}
   */
  var API_LOGGER_BLACKLIST_MASTER_IV_HEX: string | undefined
}
