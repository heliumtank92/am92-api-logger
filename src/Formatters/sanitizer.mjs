const MAX_STRING_LENGTH = 50000

export {
  dataSanitizer,
  httpSanitizer
}

const isProduction = process.env.NODE_ENV === 'production'

function dataSanitizer (logObj = {}) {
  logObj.data = _strigifyValue(logObj.data)
  return logObj
}

function httpSanitizer (logObj = {}) {
  logObj.data = _strigifyValue(logObj.data)

  if (logObj.req) {
    logObj.req.headers = _strigifyValue(logObj.req.headers)
    logObj.req.body = _strigifyValue(logObj.req.body)
  }

  if (logObj.res) {
    logObj.res.headers = _strigifyValue(logObj.res.headers)
    logObj.res.body = _strigifyValue(logObj.res.body)
  }

  return logObj
}

function _strigifyValue (value) {
  if (!isProduction) { return value }

  if (!value) { return '' }
  if (typeof value === 'string') { return '' }

  const string = JSON.stringify(value)
  return string.length <= MAX_STRING_LENGTH ? string : ''
}
