"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = splatHandler;
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var isProduction = process.env.NODE_ENV === 'production';
function splatHandler() {
  var logObj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return isProduction ? _splatToData(logObj) : _splatToMessage(logObj);
}
function _splatToMessage(logObj) {
  var splat = logObj[Symbol.for('splat')];
  if (!splat) {
    logObj.message = logObj.stack || logObj.message;
    return logObj;
  }
  var message = logObj.message;
  splat.forEach(value => {
    if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
      message += " ".concat(value);
      return;
    }
    if (value instanceof Error) {
      message += " ".concat(value.stack);
      return;
    }
    message += " ".concat(JSON.stringify(value));
  });
  logObj.message = message;
  return logObj;
}
function _splatToData(logObj) {
  var splat = logObj[Symbol.for('splat')];
  if (!splat) {
    return logObj;
  }
  var data;
  if (!splat) {
    data = {};
  } else if (splat.length > 1) {
    data = _objectSpread({}, splat);
  } else {
    var splatData = splat[0];
    if (typeof splatData === 'object' && !(splatData instanceof Array) && splatData !== null) {
      data = splatData;
    } else {
      data = {
        data: splatData
      };
    }
  }
  logObj.data = data;
  return logObj;
}