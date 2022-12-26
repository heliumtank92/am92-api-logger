import { format } from 'winston'
import { DEFAULT_META, DEFAULT_CONFIG } from '../WinstonConfig.mjs'

const formats = format.combine(
  format.timestamp({ format: 'isoDateTime' }),
  format.printf(customFormatter)
)

const ConsoleVerboseConfig = {
  ...DEFAULT_CONFIG,
  defaultMeta: { ...DEFAULT_META, type: 'CODE_FLOW_LOG' },
  format: formats
}

export default ConsoleVerboseConfig

function customFormatter (logObj = {}) {
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
