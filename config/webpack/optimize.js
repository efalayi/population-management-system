import TerserPlugin from 'terser-webpack-plugin'

const optimize = (environment, configName) => {
  const optimization = {}
  if (environment === 'production') {
    optimization.minimizer = [
      new TerserPlugin({
        // https://www.npmjs.com/package/terser
        terserOptions: {
          parse: {
            ecma: 8,
          },
          compress: {
            ecma: 5,
            warnings: false,
            comparisons: false,
            inline: 2,
          },
          mangle: {
            safari10: true,
          },
          output: {
            ecma: 5,
            comments: false,
            ascii_only: true,
          },
        },
        parallel: true,
        cache: true,
      })
    ]
  }
  if (configName === 'client') {
    optimization.splitChunks = {
      name: true,
    }
  }
  return optimization
}

export default optimize
