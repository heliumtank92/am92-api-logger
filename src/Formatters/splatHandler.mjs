const isProduction = process.env.NODE_ENV === 'production'

export default function splatHandler (logObj = {}) {
  return isProduction
    ? _splatToData(logObj)
    : _splatToMessage(logObj)
}

function _splatToMessage (logObj) {
  const splat = logObj[Symbol.for('splat')]

  if (!splat) {
    logObj.message = (logObj.stack || logObj.message)
    return logObj
  }

  let message = logObj.message
  splat.forEach(value => {
    if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
      message += ` ${value}`
      return
    }

    if (value instanceof Error) {
      message += ` ${value.stack}`
      return
    }

    message += ` ${JSON.stringify(value)}`
  })

  logObj.message = message
  return logObj
}

function _splatToData (logObj) {
  const splat = logObj[Symbol.for('splat')]

  if (!splat) { return logObj }
  let data

  if (!splat) {
    data = {}
  } else if (splat.length > 1) {
    data = { ...splat }
  } else {
    const splatData = splat[0]
    if (typeof splatData === 'object' && !(splatData instanceof Array) && splatData !== null) {
      data = splatData
    } else {
      data = { data: splatData }
    }
  }

  logObj.data = data
  return logObj
}
