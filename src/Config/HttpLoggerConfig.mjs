import { format } from 'winston'

import { httpNormalizer } from '../Formatters/normalizer.mjs'
import blacklister from '../Formatters/blacklister.mjs'
import { httpSanitizer } from '../Formatters/sanitizer.mjs'
import printer from '../Formatters/printer.mjs'

import { DEFAULT_CONFIG } from './WinstonConfig.mjs'

const HttpLoggerConfig = {
  ...DEFAULT_CONFIG,
  format: format.combine(
    format.timestamp({ format: 'isoDateTime' }),
    format.printf(logFormatter)
  )
}

export default HttpLoggerConfig

function logFormatter (logObj = {}) {
  logObj = httpNormalizer(logObj)
  logObj = blacklister(logObj)
  logObj = httpSanitizer(logObj)
  return printer(logObj)
}
