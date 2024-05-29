import { nanoid } from 'nanoid'
import { inspect, InspectOptions } from 'util'
import serializer from './serializer'
import LEVEL_CONFIG from './LEVEL_CONFIG'
import namespace from './namespace'
import { IS_PRODUCTION } from '../CONFIG'
import CONSTANTS from '../CONSTANTS'
import {
  API_LOGGER_SPLAT_KEY,
  ApiLoggerLogEntry,
  ApiLoggerLogLevel,
  ApiLoggerLogLevelConfig,
  ApiLoggerLogObject
} from '../TYPES'

/** @ignore */
const FORMATTER_MAP = new Map([
  ['httpInfo', httpFormatter],
  ['httpSuccess', httpFormatter],
  ['httpError', httpFormatter],
  ['debug', dataFormatter],
  ['info', dataFormatter],
  ['success', dataFormatter],
  ['fatal', dataFormatter],
  ['error', dataFormatter],
  ['warn', dataFormatter],
  ['trace', dataFormatter]
])

/** @ignore */
export default function formatter(logObj: ApiLoggerLogEntry): string {
  const { level } = logObj
  const logFormatter = FORMATTER_MAP.get(level)
  const { inspectOptions, colorFunc } = (LEVEL_CONFIG.get(
    logObj.level as ApiLoggerLogLevel
  ) || LEVEL_CONFIG.get('debug')) as ApiLoggerLogLevelConfig

  const logString = logFormatter ? logFormatter(logObj, inspectOptions) : ''
  return colorFunc ? colorFunc(logString) : logString
}

/** @ignore */
function dataFormatter(
  logObj: ApiLoggerLogEntry,
  inspectOptions: InspectOptions
): string {
  // Splat Handling
  const _splat = _formatSplat(logObj, inspectOptions)

  // Message Handling
  const msg = _formatMessage(logObj.message, _splat, inspectOptions)

  if (!IS_PRODUCTION) {
    return msg
  }

  const {
    service = '',
    type = '',
    timestamp = '',
    level = 'debug',
    trackingId = ''
  } = logObj

  const normalizedLogObj: ApiLoggerLogObject = {
    service,
    type,
    logId: nanoid(),
    trackingId: trackingId || _getTrackingId(),
    message: msg,
    timestamp,
    level: level as ApiLoggerLogLevel,
    data: _splat
  }

  return JSON.stringify(normalizedLogObj)
}

/** @ignore */
function httpFormatter(logObj: ApiLoggerLogEntry): string {
  if (typeof logObj.message !== 'string') {
    logObj.message = JSON.stringify(logObj.message, serializer)
  }

  if (!IS_PRODUCTION) {
    return logObj.message
  }

  const {
    service = '',
    type = '',
    message = '',
    timestamp = '',
    trackingId = '',
    level,
    req,
    res
  } = logObj

  const formattedLogObj: ApiLoggerLogObject = {
    service,
    type,
    logId: nanoid(),
    trackingId: trackingId || _getTrackingId(),
    message,
    timestamp,
    level: level as ApiLoggerLogLevel
  }

  if (req) {
    formattedLogObj.req = {
      httpVersion: req.httpVersion || '',
      ipAddress: req.ipAddress || '',
      url: req.url || '',
      method: req.method || '',
      headers: req.headers ? JSON.stringify(req.headers, serializer) : '',
      body: req.body ? JSON.stringify(req.body, serializer) : ''
    }
  }

  if (res) {
    formattedLogObj.res = {
      statusCode: res.statusCode || 0,
      status: res.status || '',
      headers: res.headers ? JSON.stringify(res.headers, serializer) : '',
      body: res.body ? JSON.stringify(res.body, serializer) : '',
      responseMessage: res.responseMessage || '',
      responseTime: res.responseTime || -1
    }
  }

  return JSON.stringify(logObj)
}

/** @ignore */
function _formatSplat(
  logObj: ApiLoggerLogEntry,
  inspectOptions: InspectOptions
): string | any[] {
  const { stack } = logObj
  const splatData = logObj[API_LOGGER_SPLAT_KEY] || []
  if (stack && !splatData.length) {
    splatData.unshift(stack)
  }

  return IS_PRODUCTION
    ? JSON.stringify(splatData, serializer)
    : splatData.map(splat => {
        return inspect(splat, inspectOptions)
      })
}

/** @ignore */
function _formatMessage(
  message: any,
  _splat: string | any[],
  inspectOptions: InspectOptions
): string {
  let msg: string = message
  if (typeof msg !== 'string') {
    msg = IS_PRODUCTION
      ? JSON.stringify(message, serializer)
      : inspect(message, inspectOptions)
  }

  // Append Splat in dev mode
  if (!IS_PRODUCTION && _splat instanceof Array) {
    _splat.forEach((splat: any) => {
      msg += ` ${splat}`
    })
  }

  return msg
}

/** @ignore */
function _getTrackingId(): string {
  if (namespace && namespace.active) {
    return namespace.get(CONSTANTS.TRACKING_ID) || ''
  }

  return ''
}
