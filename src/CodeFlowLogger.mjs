import ConsoleLogger from './lib/ConsoleLogger.mjs'
import ConsoleVerboseLogger from './lib/ConsoleVerboseLogger.mjs'

const isProduction = process.env.NODE_ENV === 'production'
const CodeFlowLogger = isProduction ? ConsoleVerboseLogger : ConsoleLogger

export default CodeFlowLogger
