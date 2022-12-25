import winston, { format } from 'winston'

const { combine, timestamp, printf } = format

const codeFlowLogFormatter = (logObj = {}) => {
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

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3,
  trace: 4
}

const level = 'trace'

const {
  npm_package_name: pkgName = '',
  npm_package_version: pkgVersion = ''
} = process.env

const service = `${pkgName}@${pkgVersion}`

const type = 'CODE_FLOW_LOG'

const defaultMeta = { service, type }

const transports = [
  new winston.transports.Console()
]

const formats = combine(
  timestamp({ format: 'isoDateTime' }),
  printf(codeFlowLogFormatter)
)

const Logger = winston.createLogger({
  level,
  levels,
  defaultMeta,
  exitOnError: false,
  transports,
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
