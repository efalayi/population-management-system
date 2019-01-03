import path from 'path'
import fileSystem from 'fs'

const APP_DIRECTORY = fileSystem.realpathSync(process.cwd())

const resolvePath = relativePath => path.resolve(APP_DIRECTORY, relativePath)

const APP_PATHS = {
  appBuild: resolvePath('dist'),
  appClient: resolvePath('client'),
  appHtml: resolvePath('client/index.html'),
  appServer: resolvePath('server'),
  appStatic: resolvePath('dist/static')
}

export default APP_PATHS
