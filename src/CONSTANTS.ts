import { ApiLoggerConstants } from './TYPES'

/** @ignore */
const ENCRYPT_ALGO = 'aes-256-cbc'

/** @ignore */
const BLACKLIST_KEYS = global.API_LOGGER_BLACKLIST_KEYS || []
/** @ignore */
const GLOBAL_MASTER_KEY_HEX = global.API_LOGGER_BLACKLIST_MASTER_KEY_HEX || ''
/** @ignore */
const GLOBAL_MASTER_IV_HEX = global.API_LOGGER_BLACKLIST_MASTER_IV_HEX || ''

/** @ignore */
const DEFAULT_MASTER_KEY_HEX =
  '0000000000000000000000000000000000000000000000000000000000000000'
/** @ignore */
const DEFAULT_MASTER_IV_HEX = '00000000000000000000000000000000'

/** @ignore */
const GLOBAL_MASTER_KEY_BUFFER = Buffer.from(GLOBAL_MASTER_KEY_HEX, 'hex')
/** @ignore */
const GLOBAL_MASTER_IV_BUFFER = Buffer.from(GLOBAL_MASTER_IV_HEX, 'hex')

/** @ignore */
const GLOBAL_MASTER_KEY_BUFFER_VALID = GLOBAL_MASTER_KEY_BUFFER.length === 32
/** @ignore */
const GLOBAL_MASTER_IV_BUFFER_VALID = GLOBAL_MASTER_IV_BUFFER.length === 16

/** @ignore */
const MASTER_KEY_BUFFER = GLOBAL_MASTER_KEY_BUFFER_VALID
  ? GLOBAL_MASTER_KEY_BUFFER
  : Buffer.from(DEFAULT_MASTER_KEY_HEX, 'hex')

/** @ignore */
const MASTER_IV_BUFFER = GLOBAL_MASTER_IV_BUFFER_VALID
  ? GLOBAL_MASTER_IV_BUFFER
  : Buffer.from(DEFAULT_MASTER_IV_HEX, 'hex')

/**
 * Constants for API Logger configuration including encryption settings and master keys.
 *
 * @type {ApiLoggerConstants}
 */
const CONSTANTS: ApiLoggerConstants = {
  TRACKING_ID: 'api-logger-tracking-id',
  ENCRYPT_ALGO,
  BLACKLIST_KEYS,

  DEFAULT_MASTER_KEY_HEX,
  DEFAULT_MASTER_IV_HEX,

  GLOBAL_MASTER_KEY_HEX,
  GLOBAL_MASTER_IV_HEX,
  GLOBAL_MASTER_KEY_BUFFER_VALID,
  GLOBAL_MASTER_IV_BUFFER_VALID,

  MASTER_KEY_BUFFER,
  MASTER_IV_BUFFER
}

export default CONSTANTS
