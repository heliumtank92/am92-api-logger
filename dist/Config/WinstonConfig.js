"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LEVEL_COLOR_MAP = exports.DEFAULT_CONFIG = void 0;
var _winston = _interopRequireDefault(require("winston"));
var _chalk = _interopRequireDefault(require("chalk"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var LEVEL_COLOR_MAP = {
  error: _chalk.default.redBright,
  warn: _chalk.default.yellowBright,
  success: _chalk.default.greenBright,
  info: _chalk.default.blueBright,
  debug: _chalk.default.whiteBright
};
exports.LEVEL_COLOR_MAP = LEVEL_COLOR_MAP;
var {
  npm_package_name: pkgName = '',
  npm_package_version: pkgVersion = ''
} = process.env;
var service = "".concat(pkgName, "@").concat(pkgVersion);
var defaultMeta = {
  service
};
var transports = [new _winston.default.transports.Console()];
var DEFAULT_CONFIG = {
  defaultMeta,
  levels: {
    error: 0,
    warn: 1,
    success: 2,
    info: 3,
    debug: 4,
    trace: 5
  },
  level: 'trace',
  exitOnError: false,
  transports
};
exports.DEFAULT_CONFIG = DEFAULT_CONFIG;