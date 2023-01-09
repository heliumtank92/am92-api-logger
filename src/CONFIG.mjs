const {
  NODE_ENV
} = process.env

const IS_PRODUCTION = NODE_ENV === 'production'

const CONFIG = {
  IS_PRODUCTION
}

export default CONFIG
