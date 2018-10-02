const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
  entry: {
    index: path.resolve(__dirname, '../src/index.js'),
    theme: path.resolve(__dirname, '../src/theme.js'),
    fonts: path.resolve(__dirname, '../src/style/fonts.scss'),
  },

  output: {
    path: path.join(__dirname, '../dist'),
    filename: '[name].js',
    library: 'Components',
    libraryTarget: 'umd',
    publicPath: path.join(__dirname, '../dist'),
    umdNamedDefine: true,
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        options: {
          presets: ['babel-preset-env', 'babel-preset-react'],
          plugins: ['transform-class-properties', 'transform-object-rest-spread'],
        },
        include: path.resolve(__dirname, '../src'),
        exclude: /node_modules/,
      },
      {
        test: /\.s?css$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { importLoaders: 1 } },
          {
            loader: 'postcss-loader',
            options: {
              config: {
                path: path.resolve(__dirname, 'postcss.config.js'),
              },
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.(eot|otf|webp|ttf|woff|woff2|svg)(\?.*)?$/,
        include: path.resolve(__dirname, '../src/assets/fonts'),
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'assets/fonts/[name].[ext]',
              publicPath: '../',
            },
          },
        ],
      },
      {
        test: /\.(ico|jpg|jpeg|png|gif|svg)(\?.*)?$/,
        include: path.resolve(__dirname, '../src/assets/img'),
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'assets/img/[name].[ext]',
              publicPath: '../',
            },
          },
        ],
      },
    ],
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
    }),
    new CopyWebpackPlugin([{ from: 'src/assets/img', to: 'assets/img' }]),
  ],

  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true,
      }),
      new OptimizeCSSAssetsPlugin({}),
    ],
  },

  resolve: {
    extensions: ['.js', '.json', '.jsx'],
    modules: ['node_modules'],
    alias: {
      assets: path.resolve(__dirname, '../src/assets'),
      containers: path.resolve(__dirname, '../src/containers'),
      theme: path.resolve(__dirname, '../src/theme.js'),
      ui: path.resolve(__dirname, '../src/ui'),
      utils: path.resolve(__dirname, '../src/utils.js'),
    },
  },

  externals: {
    // Don't bundle lodash, react, react-dom, or styled-components
    lodash: {
      commonjs: 'lodash',
      commonjs2: 'lodash',
      amd: 'lodash',
      root: '_',
    },
    react: {
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'React',
      root: 'React',
    },
    'react-dom': {
      commonjs: 'react-dom',
      commonjs2: 'react-dom',
      amd: 'ReactDOM',
      root: 'ReactDOM',
    },
    'styled-components': {
      commonjs: 'styled-components',
      commonjs2: 'styled-components',
      amd: 'styled-components',
      root: 'styled-components',
    },
  },
};
