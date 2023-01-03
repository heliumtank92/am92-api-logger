"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.httpLogger = exports.default = void 0;
var _winston = _interopRequireDefault(require("winston"));
var _HttpLoggerConfig = _interopRequireDefault(require("./Config/HttpLoggerConfig.js"));
var _LoggerConfig = _interopRequireDefault(require("./Config/LoggerConfig.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var logger = _createLogger(_LoggerConfig.default);
exports.default = logger;
var httpLogger = _createLogger(_HttpLoggerConfig.default);
exports.httpLogger = httpLogger;
function _createLogger(config) {
  var Logger = _winston.default.createLogger(config);
  var logger = {
    error: Logger.error.bind(Logger),
    warn: Logger.warn.bind(Logger),
    success: Logger.success.bind(Logger),
    info: Logger.info.bind(Logger),
    debug: Logger.debug.bind(Logger),
    trace: Logger.trace.bind(Logger),
    log: Logger.debug.bind(Logger)
  };
  return logger;
}