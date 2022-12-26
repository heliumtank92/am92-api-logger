import { format } from 'winston'
import { DEFAULT_CONFIG, LEVEL_COLOR_MAP } from '../WinstonConfig.mjs'

const ConsoleConfig = {
  ...DEFAULT_CONFIG,
  format: format.printf(customFormatter)
}

export default ConsoleConfig

function customFormatter (logObj = {}) {
  let message = logObj.message
  const splat = logObj[Symbol.for('splat')]
  const colorFunc = LEVEL_COLOR_MAP[logObj.level]

  if (!splat) {
    return colorFunc(logObj.stack || message)
  }

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

  return colorFunc(message)
}
