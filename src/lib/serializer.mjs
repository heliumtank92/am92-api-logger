import crypto from 'crypto'
import { inspect } from 'util'
import DEBUG from '../DEBUG.mjs'

const BLACKLIST_KEYS = global.API_LOGGER_BLACKLIST_KEYS
const MASTER_KEY_HEX = global.API_LOGGER_BLACKLIST_MASTER_KEY_HEX || ''
const KEY_BUFFER = Buffer.from(MASTER_KEY_HEX, 'hex')
const IV_BUFFER = Buffer.from('00000000000000000000000000000000', 'hex')

const shouldBlacklist = (
  !DEBUG.disableBlacklist &&
  MASTER_KEY_HEX &&
  BLACKLIST_KEYS &&
  BLACKLIST_KEYS.length > 0
)

export default function serializer (key, value) {
  if (value instanceof Error) { return value.stack }
  if (value instanceof Map) { return { dataType: 'Map', value: Array.from([...value]) } }
  if (value instanceof Set) { return { dataType: 'Set', value: Array.from([...value]) } }

  if (
    key &&
    shouldBlacklist &&
    BLACKLIST_KEYS.includes(key)
  ) {
    return _blacklistValue(value)
  }

  if (value instanceof Object || value instanceof Array) { return value }

  return inspect(value)
}

function _blacklistValue (plainText = '') {
  if (!plainText) { return plainText }

  const typeofPlaintext = typeof plainText

  if (
    typeofPlaintext !== 'string' &&
    typeofPlaintext !== 'number' &&
    (typeofPlaintext === 'object' && plainText instanceof Array && typeof plainText[0] === 'object')
  ) {
    return plainText
  }

  if (plainText instanceof Array) {
    return plainText.map(_blacklist)
  } else {
    return _blacklist(plainText)
  }
}

function _blacklist (plainText) {
  const encryptor = crypto.createCipheriv('aes-128-cbc', KEY_BUFFER, IV_BUFFER)
  const cipherTextBuffer = Buffer.concat([encryptor.update(`${plainText}`, 'utf8'), encryptor.final()])
  const cipherText = cipherTextBuffer.toString('base64')
  return cipherText
}
