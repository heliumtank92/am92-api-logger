
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
    message = '',
    timestamp = '',
    level = '',

    data,

    req: {
      httpVersion = '',
      ipAddress = '',
      url = '',
      method = '',
      headers: reqHeaders = '',
      body: reqBody = ''
    } = {},

    res: {
      statusCode = 200,
      status = '',
      headers: resHeaders = '',
      body: resBody = '',
      responseMessage = '',
      responseTime = 1
    } = {}
  } = logObj

  logObj = {
    type,
    message,
    timestamp,
    level,

    data: _toJSON(data),

    req: {
      httpVersion,
      ipAddress,
      url,
      method,
      headers: _toJSON(reqHeaders),
      body: _toJSON(reqBody)
    },

    res: {
      statusCode,
      status,
      headers: _toJSON(resHeaders),
      body: _toJSON(resBody),
      responseMessage,
      responseTime
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
