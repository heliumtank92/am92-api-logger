import apiLogger from './index.mjs'

console.fatal = apiLogger.fatal
console.error = apiLogger.error
console.success = apiLogger.success
console.httpError = apiLogger.httpError
console.httpSuccess = apiLogger.httpSuccess
console.httpInfo = apiLogger.httpInfo
console.warn = apiLogger.warn
console.info = apiLogger.info
console.debug = apiLogger.debug
console.trace = apiLogger.trace
console.log = apiLogger.log
