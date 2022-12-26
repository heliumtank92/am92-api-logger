import winston from 'winston'

import ConsoleConfig from '../CodeFlowLogger/ConsoleConfig.mjs'
import ConsoleVerboseConfig from './ConsoleVerboseConfig.mjs'

const isProduction = process.env.NODE_ENV === 'production'
const LoggerConfig = isProduction ? ConsoleVerboseConfig : ConsoleConfig

const Logger = winston.createLogger(ConsoleConfig)

export default function middleware (request, response, next) {
  request.timestamp = Date.now()

  response.on('finish', () => {
    const logMeta = buildLogMeta(request, response)
    Logger.info(logMeta)
  })

  process.nextTick(next)
}

function buildLogMeta (req, res) {
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

  const timestamp = Date.now()
  const responseTime = (req.timestamp && (timestamp - req.timestamp)) || -1

  const {
    statusCode,
    statusMessage: status,
    body: resBody = {}
  } = res

  const responseMessage = resBody.message || ''
  const resHeaders = res.getHeaders()

  const message = `HTTP ${method} ${url} | ${statusCode} ${status} | ${responseMessage} ${responseTime}ms`

  return {
    message,
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
    resHeaders,
    resBody,
    responseMessage,
    responseTime
  }
}
