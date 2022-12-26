import { format } from 'winston'
import { DEFAULT_META, DEFAULT_CONFIG } from '../WinstonConfig.mjs'

const formats = format.combine(
  format.timestamp({ format: 'isoDateTime' }),
  format.printf(customFormatter)
)

const ConsoleVerboseConfig = {
  ...DEFAULT_CONFIG,
  defaultMeta: { ...DEFAULT_META, type: 'REQ_RES_LOG' },
  format: formats
}

export default ConsoleVerboseConfig

function customFormatter (logObj = {}) {
  return JSON.stringify(logObj)
}
