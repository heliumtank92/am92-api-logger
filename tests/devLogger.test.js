import { describe, beforeEach, afterEach, jest, expect } from '@jest/globals'
import testIf from './testif.js'

const splatString = 'Sample String'
const splatNumber = 100
const splatObject = { a: { b: { c: { panNumber: 'abc' } } } }
class Test {
  a = '123'
  test () {
    console.log('a')
  }
}
const splatClass = Test
const splatClassInstance = new Test()
const splatError = new Error('Test Error')
const enableLogging = true

describe('Test Dev Logs Splat', () => {
  const env = process.env
  const API_LOGGER_BLACKLIST_KEYS = global.API_LOGGER_BLACKLIST_KEYS || []
  const API_LOGGER_BLACKLIST_MASTER_KEY = global.API_LOGGER_BLACKLIST_MASTER_KEY || ''

  beforeEach(() => {
    jest.resetModules()
    process.env = { ...env }
    global.API_LOGGER_BLACKLIST_KEYS = [...API_LOGGER_BLACKLIST_KEYS]
    global.API_LOGGER_BLACKLIST_MASTER_KEY = API_LOGGER_BLACKLIST_MASTER_KEY
  })

  afterEach(() => {
    process.env = env
    global.API_LOGGER_BLACKLIST_KEYS = API_LOGGER_BLACKLIST_KEYS
    global.API_LOGGER_BLACKLIST_MASTER_KEY = API_LOGGER_BLACKLIST_MASTER_KEY
  })

  testIf('false')('Test Splat in development mode', async () => {
    process.env.NODE_ENV = 'development'
    global.API_LOGGER_BLACKLIST_KEYS = ['panNumber']
    global.API_LOGGER_BLACKLIST_MASTER_KEY = '556A586E3272357538782F413F442847'
    const { default: logger } = await import('../src/logger.mjs')
    const logSpy = jest.spyOn(logger, 'log')
    if (!enableLogging) {
      logSpy.mockImplementation(() => { })
    }
    logger.log('Test Splat String', splatString)
    logger.log('Test Splat Number', splatNumber)
    logger.log('Test Splat Object', splatObject)
    logger.log('Test Splat Class', splatClass)
    logger.log('Test Splat Class Instance', splatClassInstance)
    logger.log('Test Splat Error', splatError)
    expect(logSpy).toHaveBeenCalled()
    expect(logSpy).toHaveBeenCalledTimes(6)
    expect(logSpy).toHaveBeenCalledWith('Test Splat String', splatString)
    expect(logSpy).toHaveBeenCalledWith('Test Splat Number', splatNumber)
    expect(logSpy).toHaveBeenCalledWith('Test Splat Object', splatObject)
    expect(logSpy).toHaveBeenCalledWith('Test Splat Class', splatClass)
    expect(logSpy).toHaveBeenCalledWith('Test Splat Class Instance', splatClassInstance)
    expect(logSpy).toHaveBeenCalledWith('Test Splat Error', splatError)
    expect(logSpy.mock.calls).toContainEqual(['Test Splat String', splatString])
    expect(logSpy.mock.calls).toContainEqual(['Test Splat Number', splatNumber])
    expect(logSpy.mock.calls).toContainEqual(['Test Splat Object', splatObject])
    expect(logSpy.mock.calls).toContainEqual(['Test Splat Class', splatClass])
    expect(logSpy.mock.calls).toContainEqual(['Test Splat Class Instance', splatClassInstance])
    expect(logSpy.mock.calls).toContainEqual(['Test Splat Error', splatError])

    logSpy.mockRestore()
  })

  testIf('false')('Test Object in development mode', async () => {
    process.env.NODE_ENV = 'development'
    global.API_LOGGER_BLACKLIST_KEYS = ['panNumber']
    global.API_LOGGER_BLACKLIST_MASTER_KEY = '556A586E3272357538782F413F442847'
    const { default: logger } = await import('../src/logger.mjs')
    const logSpy = jest.spyOn(logger, 'log')
    if (!enableLogging) {
      logSpy.mockImplementation(() => { })
    }
    logger.log(splatString)
    logger.log(splatNumber)
    logger.log(splatObject, splatObject)
    logger.log(splatClass)
    logger.log(splatClassInstance)
    logger.log(splatError)
    expect(logSpy).toHaveBeenCalled()
    expect(logSpy).toHaveBeenCalledTimes(6)
    expect(logSpy).toHaveBeenCalledWith(splatString)
    expect(logSpy).toHaveBeenCalledWith(splatNumber)
    expect(logSpy).toHaveBeenCalledWith(splatObject, splatObject)
    expect(logSpy).toHaveBeenCalledWith(splatClass)
    expect(logSpy).toHaveBeenCalledWith(splatClassInstance)
    expect(logSpy).toHaveBeenCalledWith(splatError)
    expect(logSpy.mock.calls).toContainEqual([splatString])
    expect(logSpy.mock.calls).toContainEqual([splatNumber])
    expect(logSpy.mock.calls).toContainEqual([splatObject, splatObject])
    expect(logSpy.mock.calls).toContainEqual([splatClass])
    expect(logSpy.mock.calls).toContainEqual([splatClassInstance])
    expect(logSpy.mock.calls).toContainEqual([splatError])

    logSpy.mockRestore()
  })
})
