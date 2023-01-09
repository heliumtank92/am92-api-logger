import { inspect } from 'util'
import utils from './utils.mjs'

const NORMALIZER_MAP = new Map([
  ['httpInfo', httpNormalizer],
  ['httpSuccess', httpNormalizer],
  ['httpError', httpNormalizer],
  ['debug', dataNormalizer],
  ['info', dataNormalizer],
  ['success', dataNormalizer],
  ['fatal', dataNormalizer],
  ['error', dataNormalizer],
  ['warn', dataNormalizer],
  ['trace', dataNormalizer]
])

function normalizer (logObj = {}) {
  const { level } = logObj
  return NORMALIZER_MAP.get(level)(logObj)
}

export default normalizer

function dataNormalizer (logobj = {}) {
  const {
    type = '',
    service = '',
    timestamp = '',
    level = ''
  } = logobj

  const normalizedLogObj = {
    type,
    service,
    message: _normaliseMessage(logobj),
    timestamp,
    level,
    data: _normaliseSplat(logobj)
  }

  return normalizedLogObj
}

function httpNormalizer (logobj = {}) {
  const {
    type = '',
    service = '',
    timestamp = '',
    level = '',
    req,
    res
  } = logobj

  logobj = {
    type,
    service,
    message: _normaliseMessage(logobj),
    timestamp,
    level
  }

  if (req) {
    logobj = {
      ...logobj,
      req: {
        httpVersion: req.httpVersion || '',
        ipAddress: req.ipAddress || '',
        url: req.url || '',
        method: req.method || '',
        headers: _normaliseHttpObject(req.headers),
        body: _normaliseHttpObject(req.body)
      }
    }
  }

  if (res) {
    logobj = {
      ...logobj,
      res: {
        statusCode: res.statusCode || 0,
        status: res.status || '',
        headers: _normaliseHttpObject(res.headers),
        body: _normaliseHttpObject(res.body),
        responseMessage: res.responseMessage || '',
        responseTime: res.responseTime || -1
      }
    }
  }

  return logobj
}

function _normaliseMessage (logobj) {
  const { message = '' } = logobj
  if (message.stack) { return message.stack }
  if (typeof message === 'function') { return inspect(message) }
  return JSON.parse(JSON.stringify(message, utils.serializeReplacer), utils.deserializeReviver)
}

function _normaliseSplat (logobj) {
  const { stack } = logobj
  const splatData = logobj[Symbol.for('splat')] || []
  let data = splatData.map(splat => {
    if (splat === undefined) { return undefined }
    const { stack } = splat
    if (stack) { return stack }
    if (typeof splat === 'function') { return inspect(splat) }
    return JSON.parse(JSON.stringify(splat, utils.serializeReplacer), utils.deserializeReviver)
  })

  if (stack) {
    data = [stack, ...data]
  }
  return data
}

function _normaliseHttpObject (data = '') {
  if (typeof data === 'string') {
    try {
      return JSON.parse(data)
    } catch (error) {
      return {}
    }
  }

  const parseObj = JSON.parse(JSON.stringify(data, utils.serializeReplacer), utils.deserializeReviver)
  if (parseObj?.constructor.name !== 'Object') { return {} }
  return parseObj
}
