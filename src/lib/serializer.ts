import crypto from 'crypto'
import { inspect } from 'util'
import CONSTANTS from '../CONSTANTS'
import DEBUG from '../DEBUG'

/** @ignore */
const shouldBlacklist: boolean =
  !DEBUG.disableBlacklist &&
  CONSTANTS.MASTER_KEY_BUFFER &&
  CONSTANTS.BLACKLIST_KEYS &&
  CONSTANTS.BLACKLIST_KEYS.length > 0

/** @ignore */
export default function serializer(key: string, value: any): any {
  if (value instanceof Error) {
    return value.stack
  }
  if (value instanceof Map) {
    return { dataType: 'Map', value: Array.from([...value]) }
  }
  if (value instanceof Set) {
    return { dataType: 'Set', value: Array.from([...value]) }
  }

  if (key && shouldBlacklist && CONSTANTS.BLACKLIST_KEYS.includes(key)) {
    return _blacklistValue(value)
  }

  if (value instanceof Object || value instanceof Array) {
    return value
  }

  return inspect(value)
}

/** @ignore */
function _blacklistValue(
  plainText: string | Array<any> = ''
): string | Array<any> {
  if (!plainText) {
    return plainText
  }

  const typeofPlaintext: string = typeof plainText

  if (
    !(
      typeofPlaintext === 'string' ||
      typeofPlaintext === 'number' ||
      (typeofPlaintext === 'object' &&
        plainText instanceof Array &&
        typeof plainText[0] !== 'object')
    )
  ) {
    return plainText
  }

  if (plainText instanceof Array) {
    return plainText.map(_blacklist)
  } else {
    return _blacklist(plainText)
  }
}

/** @ignore */
function _blacklist(plainText: string): string {
  const encryptor = crypto.createCipheriv(
    CONSTANTS.ENCRYPT_ALGO,
    CONSTANTS.MASTER_KEY_BUFFER,
    CONSTANTS.MASTER_IV_BUFFER
  )
  const cipherTextBuffer = Buffer.concat([
    encryptor.update(`${plainText}`, 'utf8'),
    encryptor.final()
  ])
  const cipherText = cipherTextBuffer.toString('base64')
  return cipherText
}
