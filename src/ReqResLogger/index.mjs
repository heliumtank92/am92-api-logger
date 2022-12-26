import expressWinston from 'express-winston'

import ConsoleConfig from './ConsoleConfig.mjs'
import ConsoleVerboseConfig from './ConsoleVerboseConfig.mjs'

const isProduction = process.env.NODE_ENV === 'production'
const LoggerConfig = isProduction ? ConsoleVerboseConfig : ConsoleConfig

const ReqResLogger = expressWinston.logger(ConsoleVerboseConfig)
// const ReqResLogger = expressWinston.logger(LoggerConfig)

export default ReqResLogger
