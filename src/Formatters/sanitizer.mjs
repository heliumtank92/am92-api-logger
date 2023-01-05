import { inspect } from 'util'
import INSPECT_CONFIG_MAP from '../Config/INSPECT_CONFIG_MAP.mjs'

const MAX_STRING_LENGTH = 50000

const isProduction = process.env.NODE_ENV === 'production'
export {
  dataSanitizer,
  httpSanitizer
}

function dataSanitizer (logObj = {}) {
  logObj.message = _sanitizeMessage(logObj)
  logObj.data = _sanitizeData(logObj)
  return logObj
}

function httpSanitizer (logObj = {}) {
  const { req, res } = logObj
  logObj.message = _sanitizeMessage(logObj)

  if (req) {
    logObj.req.headers = _sanitizeHttpObject(req.headers)
    logObj.req.body = _sanitizeHttpObject(req.body)
  }

  if (res) {
    logObj.res.headers = _sanitizeHttpObject(res.headers)
    logObj.res.body = _sanitizeHttpObject(res.body)
  }

  return logObj
}

function _sanitizeMessage (logObj) {
  const { level, message } = logObj
  if (typeof message === 'string') { return message }
  if (isProduction) { return JSON.stringify(message) }
  return inspect(message, INSPECT_CONFIG_MAP[level])
}

function _sanitizeData (logObj) {
  const { level, data = [] } = logObj
  if (isProduction) { return JSON.stringify(data) }

  let dataString = ''
  const inspectConfig = INSPECT_CONFIG_MAP[level]
  data.forEach(d => {
    if (typeof d === 'string') {
      dataString += ` ${d}`
      return
    }
    dataString += ` ${inspect(d, inspectConfig)}`
  })

  return dataString
}

function _sanitizeHttpObject (data) {
  if (isProduction) {
    const string = JSON.stringify(data)
    return string.length <= MAX_STRING_LENGTH ? string : ''
  }
  return data
}
