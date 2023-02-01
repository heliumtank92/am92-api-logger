import { inspect } from 'util'
import CONFIG from '../CONFIG.mjs'
import serializer from './serializer.mjs'
import LEVEL_CONFIG from './LEVEL_CONFIG.mjs'

const { IS_PRODUCTION } = CONFIG

const FORMATTER_MAP = new Map([
  ['httpInfo', httpFormatter],
  ['httpSuccess', httpFormatter],
  ['httpError', httpFormatter],
  ['debug', dataFormatter],
  ['info', dataFormatter],
  ['success', dataFormatter],
  ['fatal', dataFormatter],
  ['error', dataFormatter],
  ['warn', dataFormatter],
  ['trace', dataFormatter]
])

export default function formatter (logObj = {}) {
  const { level } = logObj
  const logFormatter = FORMATTER_MAP.get(level)
  const { inspectConfig, colorFunc } = LEVEL_CONFIG.get(logObj.level) || {}

  const logString = logFormatter(logObj, inspectConfig)
  return (colorFunc && colorFunc(logString)) || logString
}

function dataFormatter (logObj = {}, inspectConfig) {
  // Splat Handling
  const _splat = _formatSplat(logObj, inspectConfig)

  // Message Handling
  const msg = _formatMessage(logObj.message, _splat, inspectConfig)

  if (!IS_PRODUCTION) { return msg }

  const {
    type = '',
    service = '',
    timestamp = '',
    level = ''
  } = logObj

  const normalizedLogObj = {
    type,
    service,
    message: msg,
    timestamp,
    level,
    data: _splat
  }

  return JSON.stringify(normalizedLogObj)
}

function httpFormatter (logObj = {}) {
  if (typeof logObj.message !== 'string') {
    logObj.message = JSON.stringify(logObj.message, serializer)
  }

  if (!IS_PRODUCTION) { return logObj.message }

  const {
    message = '',
    type = '',
    service = '',
    timestamp = '',
    level = '',
    req,
    res
  } = logObj

  logObj = {
    type,
    service,
    message,
    timestamp,
    level
  }

  if (req) {
    logObj = {
      ...logObj,
      req: {
        httpVersion: req.httpVersion || '',
        ipAddress: req.ipAddress || '',
        url: req.url || '',
        method: req.method || '',
        headers: JSON.stringify(req.headers, serializer),
        body: JSON.stringify(req.body, serializer)
      }
    }
  }

  if (res) {
    logObj = {
      ...logObj,
      res: {
        statusCode: res.statusCode || 0,
        status: res.status || '',
        headers: JSON.stringify(res.headers, serializer),
        body: JSON.stringify(res.body, serializer),
        responseMessage: res.responseMessage || '',
        responseTime: res.responseTime || -1
      }
    }
  }

  return JSON.stringify(logObj)
}

function _formatSplat (logobj, inspectConfig) {
  const { stack } = logobj
  const splatData = logobj[Symbol.for('splat')] || []
  if (stack && !splatData.length) {
    splatData.unshift(stack)
  }

  return IS_PRODUCTION
    ? JSON.stringify(splatData, serializer)
    : splatData.map(splat => {
      return inspect(splat, inspectConfig)
    })
}

function _formatMessage (message, _splat, inspectConfig) {
  let msg = message
  if (typeof msg !== 'string') {
    msg = IS_PRODUCTION ? JSON.stringify(message, serializer) : inspect(message, inspectConfig)
  }

  // Append Splat in dev mode
  if (!IS_PRODUCTION) {
    _splat.forEach(splat => {
      msg += ` ${splat}`
    })
  }

  return msg
}
