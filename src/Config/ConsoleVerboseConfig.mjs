import { format } from 'winston'
import { DEFAULT_META, DEFAULT_CONFIG } from './WinstonConfig.mjs'

const formats = format.combine(
  format.timestamp({ format: 'isoDateTime' }),
  format.printf(customFormatter)
)

const ConsoleVerboseConfig = {
  ...DEFAULT_CONFIG,
  defaultMeta: DEFAULT_META,
  format: formats
}

export default ConsoleVerboseConfig

function customFormatter (logObj = {}) {
  const { type = 'CODE_FLOW_LOG' } = logObj
  const splat = logObj[Symbol.for('splat')]
  let data

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

  const formattedLog = { ...logObj, type, data: JSON.stringify(data) }
  return JSON.stringify(formattedLog)
}
