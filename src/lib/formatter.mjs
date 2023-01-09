import { inspect } from 'util'
import CONFIG from '../CONFIG.mjs'
import getSerializer from './getSerializer.mjs'
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

function formatter (logObj = {}) {
  const { level } = logObj
  const formatter = FORMATTER_MAP.get(level)
  const { inspectConfig, colorFunc } = LEVEL_CONFIG.get(logObj.level) || {}
  const serializer = getSerializer(inspectConfig)

  const logString = formatter(logObj, serializer, inspectConfig)
  return (colorFunc && colorFunc(logString)) || logString
}

export default formatter

function dataFormatter (logObj = {}, replacer, inspectConfig) {
  // Splat Handling
  const _splat = _formatSplat(logObj, replacer, inspectConfig)

  // Message Handling
  const msg = _formatMessage(logObj.message, _splat, replacer, inspectConfig)

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

function httpFormatter (logObj = {}, replacer, inspectConfig) {
  const msg = JSON.stringify(logObj.message, replacer)

  if (!IS_PRODUCTION) { return msg }

  const {
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
    message: msg,
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
        headers: JSON.stringify(req.headers, replacer),
        body: JSON.stringify(req.body, replacer)
      }
    }
  }

  if (res) {
    logObj = {
      ...logObj,
      res: {
        statusCode: res.statusCode || 0,
        status: res.status || '',
        headers: JSON.stringify(res.headers, replacer),
        body: JSON.stringify(res.body, replacer),
        responseMessage: res.responseMessage || '',
        responseTime: res.responseTime || -1
      }
    }
  }

  return JSON.stringify(logObj)
}

function _formatSplat (logobj, replacer, inspectConfig) {
  const { stack } = logobj
  let splatData = logobj[Symbol.for('splat')] || []
  if (stack) {
    splatData = [stack, ...splatData]
  }

  return IS_PRODUCTION
    ? JSON.stringify(splatData, replacer)
    : splatData.map(splat => {
      return inspect(splat, inspectConfig)
    })
}

function _formatMessage (message, _splat, replacer, inspectConfig) {
  let msg = message
  if (typeof msg !== 'string') {
    msg = IS_PRODUCTION ? JSON.stringify(message, replacer) : inspect(message, inspectConfig)
  }

  // Append Splat in dev mode
  if (!IS_PRODUCTION) {
    _splat.forEach(splat => {
      msg += ` ${splat}`
    })
  }

  return msg
}
