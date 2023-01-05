import { inspect } from 'util'

export {
  dataNormalizer,
  httpNormalizer
}

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
        httpVersion: req.httpVersion,
        ipAddress: req.ipAddress,
        url: req.url,
        method: req.method,
        headers: _normaliseHttpObject(req.headers),
        body: _normaliseHttpObject(req.body)
      }
    }
  }

  if (res) {
    logobj = {
      ...logobj,
      res: {
        statusCode: res.statusCode,
        status: res.status,
        headers: _normaliseHttpObject(res.headers),
        body: _normaliseHttpObject(res.body),
        responseMessage: res.responseMessage,
        responseTime: res.responseTime
      }
    }
  }

  return logobj
}

function _normaliseMessage (logobj) {
  const { message = '' } = logobj
  if (message.stack) { return message.stack }
  if (typeof message === 'function') { return inspect(message) }
  return JSON.parse(JSON.stringify(message))
}

function _normaliseSplat (logobj) {
  const { stack } = logobj
  const splatData = logobj[Symbol.for('splat')] || []
  let data = splatData.map(splat => {
    const { stack } = splat
    if (stack) { return stack }
    if (splat === undefined) { return '' }
    if (typeof splat === 'function') { return inspect(splat) }
    return JSON.parse(JSON.stringify(splat))
  })

  if (stack) {
    data = [stack, ...data]
  }
  return data
}

function _normaliseHttpObject (data) {
  if (typeof data === 'string') {
    try {
      return JSON.parse(data)
    } catch (error) {
      return {}
    }
  }

  const parseObj = JSON.parse(JSON.stringify(data))
  if (parseObj?.constructor.name !== 'Object') { return {} }
  return parseObj
}
