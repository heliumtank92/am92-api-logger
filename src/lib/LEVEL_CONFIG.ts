import chalk from 'chalk'
import { ApiLoggerLogLevel, ApiLoggerLogLevelConfig } from '../TYPES'
import { InspectOptions } from 'util'

/** @ignore */
const inspectOptions: InspectOptions = {
  colors: false,
  showHidden: false,
  depth: 10,
  customInspect: true,
  showProxy: false,
  maxArrayLength: 100,
  maxStringLength: Infinity,
  breakLength: 80,
  compact: false,
  sorted: false,
  getters: false,
  numericSeparator: false
}

/** @ignore */
const LEVEL_CONFIG: Map<ApiLoggerLogLevel, ApiLoggerLogLevelConfig> = new Map([
  ['httpInfo', { inspectOptions, colorFunc: chalk.blueBright }],
  ['httpSuccess', { inspectOptions, colorFunc: chalk.greenBright }],
  ['httpError', { inspectOptions, colorFunc: chalk.redBright }],
  [
    'debug',
    {
      inspectOptions: { ...inspectOptions, colors: true },
      colorFunc: chalk.blueBright
    }
  ],
  ['info', { inspectOptions, colorFunc: chalk.cyanBright }],
  ['success', { inspectOptions, colorFunc: chalk.greenBright }],
  ['fatal', { inspectOptions, colorFunc: chalk.redBright.bold }],
  ['error', { inspectOptions, colorFunc: chalk.redBright }],
  ['warn', { inspectOptions, colorFunc: chalk.yellowBright }],
  ['trace', { inspectOptions, colorFunc: chalk.whiteBright }]
])

export default LEVEL_CONFIG
