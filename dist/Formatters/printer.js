"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _WinstonConfig = require("../Config/WinstonConfig.js");
var isProduction = process.env.NODE_ENV === 'production';
var _default = printer;
exports.default = _default;
function printer() {
  var logObj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var colorFunc = _WinstonConfig.LEVEL_COLOR_MAP[logObj.level];
  var logString = isProduction ? JSON.stringify(logObj) : logObj.message;
  return colorFunc && colorFunc(logString) || logString;
}