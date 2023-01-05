const config = {
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

const INSPECT_CONFIG_MAP = {
  debug: { ...config, colors: true },
  error: config,
  warn: config,
  success: config,
  info: config,
  trace: config
}

export default INSPECT_CONFIG_MAP
