import { SERVICE } from './CONFIG'
import {
  ApiLoggerDebug,
  ApiLoggerDebugFeatures,
  API_LOGGER_DEBUG_FEATURES
} from './TYPES'

/** @ignore */
const { DEBUG: debug = '' } = process.env

/** @ignore */
const DEBUG_ID = 'apiLogger'
/** @ignore */
const debugAll = debug === '*' || debug?.includes(`${DEBUG_ID}:*`)
/** @ignore */
const debugFeatures = new RegExp(`${DEBUG_ID}:([A-Za-z0-9,]*);?`).exec(debug)
/** @ignore */
const debugFeaturesList = ((debugFeatures && debugFeatures[1]) ||
  []) as Partial<ApiLoggerDebugFeatures[]>

/** @ignore */
const DEBUG: ApiLoggerDebug = {
  disableBlacklist: false,
  enableDebug: false
}

/** @ignore */
const DEBUG_ENABLED_FEATURES = []

for (const feature of API_LOGGER_DEBUG_FEATURES) {
  const debugFeature = debugFeaturesList.includes(feature)
  DEBUG[feature] = debugAll || debugFeature

  if (DEBUG[feature]) {
    DEBUG_ENABLED_FEATURES.push(feature)
  }
}

if (DEBUG_ENABLED_FEATURES.length) {
  console.warn(
    `[${SERVICE} ApiLogger] Debugging Features Enabled: ${DEBUG_ENABLED_FEATURES.join(
      ', '
    )}`
  )
}

export default DEBUG
