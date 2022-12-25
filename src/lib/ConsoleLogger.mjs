import winston, { format } from 'winston'
import colorize from '../colorize.mjs'
import { LEVEL_COLOR_MAP } from './CONSTANTS.mjs'

const { printf } = format

const testFormatter = (logObj = {}) => {
  let message = logObj.message
  const splat = logObj[Symbol.for('splat')]

  if (!splat) { return colorize(logObj.level, logObj.stack || message) }

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

  const colorFunc = LEVEL_COLOR_MAP[logObj.level]
  return colorFunc(message)
}

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3,
  trace: 4
}

const level = 'trace'

const transports = [
  new winston.transports.Console()
]

const formats = printf(testFormatter)

const Logger = winston.createLogger({
  level,
  levels,
  // defaultMeta,
  exitOnError: false,
  transports,
  format: formats
})

const ConsoleLogger = {
  error: Logger.error.bind(Logger),
  warn: Logger.warn.bind(Logger),
  info: Logger.info.bind(Logger),
  debug: Logger.debug.bind(Logger),
  trace: Logger.trace.bind(Logger),
  log: Logger.debug.bind(Logger)
}

export default ConsoleLogger

ConsoleLogger.error('sadasd', new Error('message'))
ConsoleLogger.warn('ConsoleLogger.warn', undefined)
ConsoleLogger.info('ConsoleLogger.info', { value: 123 }, { name: 'test' })
ConsoleLogger.debug('ConsoleLogger.debug', 123)
ConsoleLogger.trace('ConsoleLogger.trace', 123)
ConsoleLogger.log('ConsoleLogger.log')
