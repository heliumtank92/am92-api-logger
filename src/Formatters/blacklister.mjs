import crypto from 'crypto'
import DEBUG from '../DEBUG.mjs'

export default function blacklister (logObject = {}) {
  if (
    DEBUG.disableBlacklist ||
    !global.API_LOGGER_BLACKLIST_MASTER_KEY_HEX ||
    !global.API_LOGGER_BLACKLIST_KEYS ||
    !global.API_LOGGER_BLACKLIST_KEYS.length
  ) { return logObject }

  const blacklistLogObj = _blacklist(logObject)
  return blacklistLogObj
}

function _blacklist (object = {}) {
  const BLACKLIST_KEYS = global.API_LOGGER_BLACKLIST_KEYS
  const iterable = object instanceof Array ? object : (object instanceof Object && object) ? object : {}

  for (const key in iterable) {
    const value = iterable[key]

    if (BLACKLIST_KEYS.includes(key)) {
      object[key] = _blacklistValue(value)
      continue
    }

    if (value !== null && (value instanceof Array || value instanceof Object)) {
      object[key] = _blacklist(value)
    }

    object[key] = value
    continue
  }

  return object
}

function _blacklistValue (plainText = '') {
  const MASTER_KEY_HEX = global.API_LOGGER_BLACKLIST_MASTER_KEY_HEX
  if (!plainText) { return plainText }

  const typeofPlaintext = typeof plainText
  if (typeofPlaintext !== 'string' && typeofPlaintext !== 'number') { return plainText }

  const keyBuffer = Buffer.from(MASTER_KEY_HEX, 'hex')
  const ivBuffer = Buffer.from('00000000000000000000000000000000', 'hex')

  const encryptor = crypto.createCipheriv('aes-128-cbc', keyBuffer, ivBuffer)
  const cipherTextBuffer = Buffer.concat([encryptor.update(`${plainText}`, 'utf8'), encryptor.final()])

  const cipherText = cipherTextBuffer.toString('base64')
  return cipherText
}
