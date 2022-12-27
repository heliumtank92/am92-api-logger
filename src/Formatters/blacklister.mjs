import crypto from 'crypto'

const isProduction = process.env.NODE_ENV === 'production'

export default function blacklister (logObject = {}) {
  if (!isProduction) { return logObject }
  const flatLogObj = _flattenObj(logObject)
  Object.keys(flatLogObj).forEach(key => {
    const value = flatLogObj[key]
    flatLogObj[key] = _blacklistKey(key, value)
  })
  logObject = _unflattenObj(flatLogObj)
  return logObject
}

function _flattenObj (obj, parent, res = {}) {
  for (const key in obj) {
    const propName = parent ? parent + '.' + key : key
    if (typeof obj[key] === 'object') {
      _flattenObj(obj[key], propName, res)
    } else {
      res[propName] = obj[key]
    }
  }
  return res
}

function _unflattenObj (data) {
  const result = {}
  for (const i in data) {
    const keys = i.split('.')
    keys.reduce(function (r, e, j) {
      return r[e] || (r[e] = isNaN(Number(keys[j + 1])) ? (keys.length - 1 === j ? data[i] : {}) : [])
    }, result)
  }
  return result
}

function _blacklistKey (key, value) {
  const BLACKLIST_KEYS = global.API_LOGGER_BLACKLIST_KEYS || []
  for (const blacklistKey of BLACKLIST_KEYS) {
    const regex = new RegExp(`${blacklistKey}([.\\d]{2,})?$`, 'g')
    const isBlacklistedKey = regex.test(key)
    if (isBlacklistedKey) {
      const encryptedValue = _encrypt(value)
      return encryptedValue
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
