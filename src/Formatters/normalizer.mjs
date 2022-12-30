
export {
  dataNormalizer,
  httpNormalizer
}

function dataNormalizer (logObj = {}) {
  logObj.data = _toJSON(logObj.data)
  return logObj
}

function httpNormalizer (logObj = {}) {
  const {
    type = '',
    service = '',
    message = '',
    timestamp = '',
    level = '',
    data,
    req,
    res
  } = logObj

  logObj = {
    type,
    service,
    message,
    timestamp,
    level,
    data: _toJSON(data)
  }

  if (req) {
    logObj = {
      ...logObj,
      req: {
        httpVersion: req.httpVersion,
        ipAddress: req.ipAddress,
        url: req.url,
        method: req.method,
        headers: _toJSON(req.headers),
        body: _toJSON(req.body)
      }
    }
  }

  if (res) {
    logObj = {
      ...logObj,
      res: {
        statusCode: res.statusCode,
        status: res.status,
        headers: _toJSON(res.headers),
        body: _toJSON(res.body),
        responseMessage: res.responseMessage,
        responseTime: res.responseTime
      }
    }
  }

  return logObj
}

function _toJSON (value) {
  try {
    return JSON.parse(value)
  } catch (error) {
    return value
  }
}
