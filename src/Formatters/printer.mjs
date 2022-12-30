import { LEVEL_COLOR_MAP } from '../Config/WinstonConfig.mjs'

const isProduction = process.env.NODE_ENV === 'production'

export default printer

function printer (logObj = {}) {
  const colorFunc = LEVEL_COLOR_MAP[logObj.level]
  const logString = isProduction ? JSON.stringify(logObj) : logObj.message
  return (colorFunc && colorFunc(logString)) || logString
}
