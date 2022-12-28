import crypto from 'crypto'

const isProduction = process.env.NODE_ENV === 'production'
const disableBlacklist = process.env.DEBUG === '*' || process.env.DEBUG.includes('apiLogger:*')

export default function blacklister (logObject = {}) {
  if (!isProduction || disableBlacklist) { return logObject }

  const flatLogObj = _flattenObj(logObject)

  Object.keys(flatLogObj).forEach(key => {
    const value = flatLogObj[key]
    flatLogObj[key] = _blacklistKey(key, value)
  })

  logObject = _unflattenObj(flatLogObj)
  return logObject
}

function _flattenObj (obj, parent, flatObj = {}) {
  for (const key in obj) {
    const propName = parent ? `${parent}.${key}` : key
    if (typeof obj[key] === 'object') {
      _flattenObj(obj[key], propName, flatObj)
    } else {
      flatObj[propName] = obj[key]
    }
  }
  return flatObj
}

function _unflattenObj (data) {
  const obj = {}

  for (const flatKey in data) {
    const flatKeys = flatKey.split('.')
    flatKeys.reduce(function (acc, key, index) {
      return acc[key] || (acc[key] = isNaN(Number(flatKeys[index + 1])) ? (flatKeys.length - 1 === index ? data[flatKey] : {}) : [])
    }, obj)
  }

  return obj
}

function _blacklistKey (key, value) {
  const BLACKLIST_KEYS = global.API_LOGGER_BLACKLIST_KEYS || []

  for (const blacklistKey of BLACKLIST_KEYS) {
    const regex = new RegExp(`${blacklistKey}([.\\d]{2,})?$`, 'g')
    if (regex.test(key)) {
      return _encrypt(value)
    }
  }

  return value
}

function _encrypt (plainText = '') {
  const MASTER_KEY = global.API_LOGGER_BLACKLIST_MASTER_KEY
  if (!MASTER_KEY || !plainText) { return plainText }

  const typeofPlaintext = typeof plainText
  if (typeofPlaintext !== 'string' && typeofPlaintext !== 'number') { return plainText }

  const keyBuffer = Buffer.from(MASTER_KEY, 'hex')
  const ivBuffer = Buffer.from('00000000000000000000000000000000', 'hex')

  const encryptor = crypto.createCipheriv('aes-128-cbc', keyBuffer, ivBuffer)
  const cipherTextBuffer = Buffer.concat([encryptor.update(`${plainText}`, 'utf8'), encryptor.final()])

  const cipherText = cipherTextBuffer.toString('base64')
  return cipherText
}
