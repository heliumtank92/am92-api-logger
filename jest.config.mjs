import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const dir = join(dirname(fileURLToPath(import.meta.url)))

const jestConfig = {
  verbose: true,
  collectCoverage: true,
  transform: {},
  resolver: join(dir, './jest.resolver.cjs')
}

export default jestConfig
