"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _terserWebpackPlugin = _interopRequireDefault(require("terser-webpack-plugin"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const optimize = (environment, configName) => {
  const optimization = {};

  if (environment === 'production') {
    optimization.minimizer = [new _terserWebpackPlugin.default({
      // https://www.npmjs.com/package/terser
      terserOptions: {
        parse: {
          ecma: 8
        },
        compress: {
          ecma: 5,
          warnings: false,
          comparisons: false,
          inline: 2
        },
        mangle: {
          safari10: true
        },
        output: {
          ecma: 5,
          comments: false,
          ascii_only: true
        }
      },
      parallel: true,
      cache: true
    })];
  }

  if (configName === 'client') {
    optimization.splitChunks = {
      name: true
    };
  }

  return optimization;
};

var _default = optimize;
exports.default = _default;