import chalk from 'chalk'

const inspectConfig = {
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

const LEVEL_CONFIG = new Map([
  ['httpInfo', { inspectConfig, colorFunc: chalk.blueBright }],
  ['httpSuccess', { inspectConfig, colorFunc: chalk.greenBright }],
  ['httpError', { inspectConfig, colorFunc: chalk.redBright }],
  ['debug', { inspectConfig: { ...inspectConfig, colors: true } }],
  ['info', { inspectConfig, colorFunc: chalk.blueBright }],
  ['success', { inspectConfig, colorFunc: chalk.redBright }],
  ['fatal', { inspectConfig, colorFunc: chalk.redBright.bold }],
  ['error', { inspectConfig, colorFunc: chalk.greenBright }],
  ['warn', { inspectConfig, colorFunc: chalk.yellowBright }],
  ['trace', { inspectConfig, colorFunc: chalk.whiteBright }]
])

export default LEVEL_CONFIG
