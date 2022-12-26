import { format } from 'winston'
import { DEFAULT_META, DEFAULT_CONFIG } from '../WinstonConfig.mjs'

const formats = format.combine(
  format.timestamp({ format: 'isoDateTime' }),
  format.printf(customFormatter)
)

const ConsoleVerboseConfig = {
  ...DEFAULT_CONFIG,
  metaField: null,
  baseMeta: { ...DEFAULT_META, type: 'REQ_RES_LOG' },
  requestWhitelist: ['headers', 'query', 'body'],
  responseWhitelist: ['body'],
  dynamicMeta,
  format: formats
}

export default ConsoleVerboseConfig

function dynamicMeta (req, res) {
  const {
    httpVersionMajor,
    httpVersionMinor,
    ipAddress,
    _remoteAddress,
    connection: { remoteAddress } = {},
    originalUrl,
    url,
    method,
    headers: reqHeaders,
    body: reqBody = {}
  } = req

  const httpVersion = `${httpVersionMajor}.${httpVersionMinor}`
  const userAgent = req.get('User-Agent')
  const referrer = req.get('Referrer')
  const requestIp = ipAddress || _remoteAddress || remoteAddress || ''
  const requestUrl = originalUrl || url

  const {
    statusCode,
    statusMessage: status,
    body: resBody = {}
  } = res
  const responseMessage = resBody.message || ''

  return {
    httpVersion,
    userAgent,
    referrer,
    ipAddress: requestIp,
    url: requestUrl,
    method,
    reqHeaders,
    reqBody,

    statusCode,
    status,
    resBody,
    responseMessage
  }
}

function customFormatter (logObj = {}) {
  const { req, res, ...logProps } = logObj
  const { method, url, statusCode, status, responseMessage, responseTime } = logProps

  const message = `HTTP ${method} ${url} | ${statusCode} ${status} | ${responseMessage} ${responseTime}ms`

  const formattedLog = { ...logProps, message }
  return JSON.stringify(formattedLog)
}
