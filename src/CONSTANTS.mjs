const ENCRYPT_ALGO = 'aes-256-cbc'

const BLACKLIST_KEYS = global.API_LOGGER_BLACKLIST_KEYS
const MASTER_KEY_HEX = global.API_LOGGER_BLACKLIST_MASTER_KEY_HEX || ''
const MASTER_IV_HEX = '00000000000000000000000000000000'

const MASTER_KEY_BUFFER = Buffer.from(MASTER_KEY_HEX, 'hex')
const MASTER_IV_BUFFER = Buffer.from(MASTER_IV_HEX, 'hex')
const MASTER_KEY_BUFFER_VALID = MASTER_KEY_BUFFER.length === 32

const CONSTANTS = {
  ENCRYPT_ALGO,
  BLACKLIST_KEYS,
  MASTER_KEY_HEX,
  MASTER_IV_HEX,
  MASTER_KEY_BUFFER: MASTER_KEY_BUFFER_VALID && MASTER_KEY_BUFFER,
  MASTER_IV_BUFFER
}

export default CONSTANTS
