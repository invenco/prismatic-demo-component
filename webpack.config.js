const path = require('path');
const nodeExternals = require('webpack-node-externals');
const CopyPlugin = require("copy-webpack-plugin");

const COMPONENT_NAMES = ['lynkV2'];

module.exports = {
  target: 'node',
  externals: [nodeExternals()],
  mode: 'production',
  entry: COMPONENT_NAMES.reduce((result, name) => {
    result[name] = path.resolve(__dirname, `src/modules/lynk/infra/prismatic/components/${name}.ts`);
    return result;
  }, {}),
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: '[name]/dist/index.js',
    libraryTarget: 'commonjs2'
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'swc-loader',
          }
        ]
      }
    ]
  },
  optimization: {
    minimize: process.env.BUILD_UNMINIFIED !== '1'
  },
  plugins: [
    new CopyPlugin({
      patterns: COMPONENT_NAMES.map(name => ({
        from: path.resolve(__dirname, `./src/resources/prismatic/icons/${name}.png`),
        to: path.resolve(__dirname, `lib/${name}/dist/icon.png`),
      }))
    })
  ]
};
