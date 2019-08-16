const path = require('path')
const {
  override,
  addBabelPlugins,
  addWebpackAlias,
  addBundleVisualizer
} = require('customize-cra')

const resolveModules = () => config => {
  config.resolve = Object.assign({}, config.resolve, {
    modules: [path.resolve(__dirname, 'src'), 'node_modules']
  })
  return config
}

module.exports = override(
  ...addBabelPlugins('@loadable/babel-plugin', 'react-hot-loader/babel'),
  addWebpackAlias({
    'react-dom': '@hot-loader/react-dom'
  }),
  addWebpackAlias({
    'react-dom': '@hot-loader/react-dom'
  }),
  resolveModules(),
  process.env.ANALYZE && addBundleVisualizer()
)
