import logger from './logger.mjs'

console.fatal = logger.fatal
console.error = logger.error
console.success = logger.success
console.httpError = logger.httpError
console.httpSuccess = logger.httpSuccess
console.httpInfo = logger.httpInfo
console.warn = logger.warn
console.info = logger.info
console.debug = logger.debug
console.trace = logger.trace
console.log = logger.log
