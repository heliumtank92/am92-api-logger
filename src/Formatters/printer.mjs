import { LEVEL_COLOR_MAP } from '../Config/WinstonConfig.mjs'

const isProduction = process.env.NODE_ENV === 'production'

export default printer

function printer (logObj = {}) {
  const { level, message, data = '' } = logObj
  const colorFunc = LEVEL_COLOR_MAP[level]
  const logString = isProduction ? JSON.stringify(logObj) : `${message}${data}`
  return (colorFunc && colorFunc(logString)) || logString
}
