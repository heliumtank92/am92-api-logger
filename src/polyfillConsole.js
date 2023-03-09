import ApiLogger from './index.mjs'

console.fatal = ApiLogger.fatal
console.error = ApiLogger.error
console.success = ApiLogger.success
console.httpError = ApiLogger.httpError
console.httpSuccess = ApiLogger.httpSuccess
console.httpInfo = ApiLogger.httpInfo
console.warn = ApiLogger.warn
console.info = ApiLogger.info
console.debug = ApiLogger.debug
console.trace = ApiLogger.trace
console.log = ApiLogger.log
