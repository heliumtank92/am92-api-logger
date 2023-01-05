import { format } from 'winston'

import { dataNormalizer } from '../Formatters/normalizer.mjs'
import blacklister from '../Formatters/blacklister.mjs'
import { dataSanitizer } from '../Formatters/sanitizer.mjs'
import printer from '../Formatters/printer.mjs'

import { DEFAULT_CONFIG } from './WinstonConfig.mjs'

const LoggerConfig = {
  ...DEFAULT_CONFIG,
  format: format.combine(
    format.timestamp({ format: 'isoDateTime' }),
    format.printf(logFormatter)
  )
}

export default LoggerConfig

function logFormatter (logObj = {}) {
  logObj = dataNormalizer(logObj)
  logObj = blacklister(logObj)
  logObj = dataSanitizer(logObj)
  return printer(logObj)
}
