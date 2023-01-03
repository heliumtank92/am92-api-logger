"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dataSanitizer = dataSanitizer;
exports.httpSanitizer = httpSanitizer;
var MAX_STRING_LENGTH = 50000;
var isProduction = process.env.NODE_ENV === 'production';
function dataSanitizer() {
  var logObj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  logObj.data = _strigifyValue(logObj.data);
  return logObj;
}
function httpSanitizer() {
  var logObj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  logObj.data = _strigifyValue(logObj.data);
  if (logObj.req) {
    logObj.req.headers = _strigifyValue(logObj.req.headers);
    logObj.req.body = _strigifyValue(logObj.req.body);
  }
  if (logObj.res) {
    logObj.res.headers = _strigifyValue(logObj.res.headers);
    logObj.res.body = _strigifyValue(logObj.res.body);
  }
  return logObj;
}
function _strigifyValue(value) {
  if (!isProduction) {
    return value;
  }
  if (!value) {
    return '';
  }
  if (typeof value === 'string') {
    return '';
  }
  var string = JSON.stringify(value);
  return string.length <= MAX_STRING_LENGTH ? string : '';
}