import { format } from 'winston'

import { DEFAULT_CONFIG } from './WinstonConfig.mjs'

import normalizer from '../Formatters/normalizer.mjs'
import blacklister from '../Formatters/blacklister.mjs'
import sanitizer from '../Formatters/sanitizer.mjs'
import printer from '../Formatters/printer.mjs'

const LoggerConfig = {
  ...DEFAULT_CONFIG,
  format: format.combine(
    format.timestamp({ format: 'isoDateTime' }),
    format.printf(logFormatter)
  )
}

export default LoggerConfig

function logFormatter (logObj = {}) {
  logObj = normalizer(logObj)
  logObj = blacklister(logObj)
  logObj = sanitizer(logObj)
  return printer(logObj)
}
