import chalk from 'chalk'

const isProduction = process.env.NODE_ENV === 'production'

const COLOR_MAP = new Map([
  ['httpInfo', chalk.blueBright],
  ['httpSuccess', chalk.greenBright],
  ['httpError', chalk.redBright],
  ['info', chalk.blueBright],
  ['fatal', chalk.redBright.bold],
  ['error', chalk.redBright],
  ['success', chalk.greenBright],
  ['warn', chalk.yellowBright],
  ['trace', chalk.whiteBright]
])

export default printer

function printer (logObj = {}) {
  const { level, message, data = '' } = logObj
  const colorFunc = COLOR_MAP.get(level)
  const logString = isProduction ? JSON.stringify(logObj) : `${message}${data}`
  return (colorFunc && colorFunc(logString)) || logString
}
