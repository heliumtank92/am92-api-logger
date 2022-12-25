import winston, { format } from 'winston'
import { DEFAULT_META, DEFAULT_CONFIG } from './WinstonConfig.mjs'

const customFormatter = (logObj = {}) => {
  let data
  const splat = logObj[Symbol.for('splat')]

  if (!splat) {
    data = {}
  } else if (splat.length > 1) {
    data = { ...splat }
  } else {
    const splatData = splat[0]
    if (typeof splatData === 'object' && !(splatData instanceof Array) && splatData !== null) {
      data = splatData
    } else {
      data = { ...splatData }
    }
  }

  const formattedLog = { ...logObj, data }
  return JSON.stringify(formattedLog)
}

const formats = format.combine(
  format.timestamp({ format: 'isoDateTime' }),
  format.printf(customFormatter)
)

const Logger = winston.createLogger({
  ...DEFAULT_CONFIG,
  defaultMeta: { ...DEFAULT_META, type: 'CODE_FLOW_LOG' },
  format: formats
})

const ConsoleVerboseLogger = {
  error: Logger.error.bind(Logger),
  warn: Logger.warn.bind(Logger),
  info: Logger.info.bind(Logger),
  debug: Logger.debug.bind(Logger),
  trace: Logger.trace.bind(Logger),
  log: Logger.debug.bind(Logger)
}

export default ConsoleVerboseLogger

ConsoleVerboseLogger.error('ConsoleVerboseLogger.error', { name: 123 }, 123)
ConsoleVerboseLogger.warn('ConsoleVerboseLogger.warn', null)
ConsoleVerboseLogger.info('ConsoleVerboseLogger.info', { name: 123 })
ConsoleVerboseLogger.debug('ConsoleVerboseLogger.debug', undefined)
ConsoleVerboseLogger.trace('ConsoleVerboseLogger.trace', 123)
ConsoleVerboseLogger.log('ConsoleVerboseLogger.log')
