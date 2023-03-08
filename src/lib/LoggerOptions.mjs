import winston, { format } from 'winston'
import DEBUG from '../DEBUG.mjs'
import formatter from './formatter.mjs'
import CONFIG from '../CONFIG.mjs'

const { IS_PRODUCTION, SERVICE } = CONFIG

const transports = [new winston.transports.Console()]

const LoggerOptions = {
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

export default LoggerOptions
