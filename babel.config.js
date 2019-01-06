const babelConfig = {
  presets: [
    [
      '@babel/preset-env', {
        targets: {
          node: 'current',
        }
      },
    ],
    [
      '@babel/preset-react',
      {
        development: process.env.BABEL_ENV === 'development',
      },
    ],
  ],
  plugins: [
    '@babel/plugin-proposal-class-properties'
  ],
  ignore: [
    'node_modules',
  ]
}

module.exports = babelConfig
