import { inspect } from 'util'

const utils = {
  serializeReplacer,
  deserializeReviver
}

export default utils

function serializeReplacer (key, value) {
  if (value instanceof Map) {
    return {
      dataType: 'Map',
      value: Array.from([...value]) // or with spread: value: [...value]
    }
  }

  if (value instanceof Set) {
    return {
      dataType: 'Set',
      value: Array.from([...value]) // or with spread: value: [...value]
    }
  }

  if (value instanceof Function) {
    return inspect(value)
  }

  return value
}

function deserializeReviver (key, value) {
  if (typeof value === 'object' && value !== null) {
    if (value.dataType === 'Map') {
      return new Map(value.value)
    }

    if (value.dataType === 'Set') {
      return new Set(value.value)
    }
  }

  return value
}
