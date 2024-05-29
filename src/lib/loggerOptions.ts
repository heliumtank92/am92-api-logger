import winston, { format } from 'winston'
import DEBUG from '../DEBUG'
import formatter from './formatter'
import { SERVICE, IS_PRODUCTION } from '../CONFIG'
import { ApiLoggerOptions } from '../TYPES'

/** @ignore */
const transports = [new winston.transports.Console()]

/** @ignore */
const loggerOptions: ApiLoggerOptions = {
  defaultMeta: { service: SERVICE },
  levels: {
    fatal: 0,
    error: 0,
    success: 0,
    httpError: 0,
    httpSuccess: 0,
    httpInfo: 0,
    warn: 1,
    info: 2,
    debug: 3,
    trace: 4
  },
  level: (DEBUG.enableDebug && 'trace') || (IS_PRODUCTION ? 'info' : 'trace'),
  exitOnError: false,
  transports,
  format: format.combine(
    format.timestamp({ format: 'isoDateTime' }),
    format.printf(formatter)
  )
}

export default loggerOptions
