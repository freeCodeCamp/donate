require('dotenv').config();
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const webpack = require('webpack');
const RmServiceWorkerPlugin = require('webpack-remove-serviceworker-plugin');
const generateBabelConfig = require('gatsby/dist/utils/babel-config');

exports.modifyWebpackConfig = ({ config, stage }) => {
  const program = {
    directory: __dirname,
    browserslist: ['> 1%', 'last 2 versions', 'IE >= 9']
  };

  return generateBabelConfig(program, stage).then(babelConfig => {
    config.removeLoader('js').loader('js', {
      test: /\.jsx?$/,
      /* eslint-disable max-len */
      exclude: modulePath => {
        return (
          /node_modules/.test(modulePath) &&
          !(/(ansi-styles|chalk|strict-uri-encode|react-freecodecamp-search)/).test(
            modulePath
          )
        );
      },
      /* eslint-enable max-len*/
      loader: 'babel',
      query: babelConfig
    });
    config.plugin('CopyWebpackPlugin', CopyWebpackPlugin, [
      [
        {
          from: path.resolve(__dirname, './node_modules/monaco-editor/min/vs'),
          to: 'vs'
        }
      ]
    ]);
    config.plugin('DefinePlugin', webpack.DefinePlugin, [
      {
        HOME_PATH: JSON.stringify(
          process.env.HOME_PATH || 'http://localhost:3000'
        ),
        STRIPE_PUBLIC_KEY: JSON.stringify(process.env.STRIPE_PULIC_KEY || '')
      }
    ]);
    config.plugin('RemoveServiceWorkerPlugin', RmServiceWorkerPlugin, [
      { filename: 'sw.js' }
    ]);
  });
};
/* eslint-disable prefer-object-spread/prefer-object-spread */
exports.modifyBabelrc = ({ babelrc }) =>
  Object.assign({}, babelrc, {
    plugins: babelrc.plugins.concat([
      [
        'transform-es2015-arrow-functions',
        'transform-imports',
        'transform-function-bind',
        {
          'react-bootstrap': {
            transform: 'react-bootstrap/lib/${member}',
            preventFullImport: true
          },
          lodash: {
            transform: 'lodash/${member}',
            preventFullImport: true
          }
        }
      ]
    ])
  });
