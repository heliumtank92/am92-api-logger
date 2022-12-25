import chalk from 'chalk'

const LEVEL_COLOR_MAP = {
  error: chalk.redBright,
  warn: chalk.yellowBright,
  info: chalk.blueBright,
  debug: chalk.whiteBright,
  trace: chalk.blackBright
}

export {
  LEVEL_COLOR_MAP
}
