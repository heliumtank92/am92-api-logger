"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = blacklister;
var _crypto = _interopRequireDefault(require("crypto"));
var _DEBUG = _interopRequireDefault(require("../DEBUG.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function blacklister() {
  var logObject = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  if (_DEBUG.default.disableBlacklist) {
    return logObject;
  }
  var flatLogObj = _flattenObj(logObject);
  Object.keys(flatLogObj).forEach(key => {
    var value = flatLogObj[key];
    flatLogObj[key] = _blacklistKey(key, value);
  });
  logObject = _unflattenObj(flatLogObj);
  return logObject;
}
function _flattenObj(obj, parent) {
  var flatObj = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  for (var key in obj) {
    var propName = parent ? "".concat(parent, ".").concat(key) : key;
    if (typeof obj[key] === 'object') {
      _flattenObj(obj[key], propName, flatObj);
    } else {
      flatObj[propName] = obj[key];
    }
  }
  return flatObj;
}
function _unflattenObj(data) {
  var obj = {};
  var _loop = function _loop(flatKey) {
    var flatKeys = flatKey.split('.');
    flatKeys.reduce(function (acc, key, index) {
      return acc[key] || (acc[key] = isNaN(Number(flatKeys[index + 1])) ? flatKeys.length - 1 === index ? data[flatKey] : {} : []);
    }, obj);
  };
  for (var flatKey in data) {
    _loop(flatKey);
  }
  return obj;
}
function _blacklistKey(key, value) {
  var BLACKLIST_KEYS = global.API_LOGGER_BLACKLIST_KEYS || [];
  for (var blacklistKey of BLACKLIST_KEYS) {
    var regex = new RegExp("".concat(blacklistKey, "([.\\d]{2,})?$"), 'g');
    if (regex.test(key)) {
      return _encrypt(value);
    }
  }
  return value;
}
function _encrypt() {
  var plainText = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var MASTER_KEY = global.API_LOGGER_BLACKLIST_MASTER_KEY;
  if (!MASTER_KEY || !plainText) {
    return plainText;
  }
  var typeofPlaintext = typeof plainText;
  if (typeofPlaintext !== 'string' && typeofPlaintext !== 'number') {
    return plainText;
  }
  var keyBuffer = Buffer.from(MASTER_KEY, 'hex');
  var ivBuffer = Buffer.from('00000000000000000000000000000000', 'hex');
  var encryptor = _crypto.default.createCipheriv('aes-128-cbc', keyBuffer, ivBuffer);
  var cipherTextBuffer = Buffer.concat([encryptor.update("".concat(plainText), 'utf8'), encryptor.final()]);
  var cipherText = cipherTextBuffer.toString('base64');
  return cipherText;
}