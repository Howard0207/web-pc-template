const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { getTemplates, getEntries, getCssHandler, ENV, publicPath, isDev } = require('./webpack.config.util');
const chalk = require('chalk');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const cssHandler = getCssHandler();

const entries = getEntries();

const templates = getTemplates();

module.exports = {
    entry: entries,
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: isDev ? '[name].[hash].js' : '[name].[chunkhash].js',
        publicPath,
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: [{ loader: 'babel-loader' }],
                exclude: /node_modules/,
            },
            {
                test: /\.m?js/,
                resolve: {
                    fullySpecified: false,
                },
            },
            {
                test: /\.(le|c)ss$/,
                use: cssHandler,
            },
            {
                test: /\.(png|jpg|jpeg|gif|jfif|svg)$/,
                type: 'asset',
                //解析
                parser: {
                    //转base64的条件
                    dataUrlCondition: {
                        maxSize: 8 * 1024, // 25kb
                    },
                },
                generator: {
                    //与output.assetModuleFilename是相同的,这个写法引入的时候也会添加好这个路径
                    filename: '[name].[hash:6][ext]',
                    //打包后对资源的引入，文件命名已经有/img了
                },
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf|htc)$/,
                type: 'asset/resource',
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /^\.\/(zh-cn)$/),
        new MiniCssExtractPlugin({
            filename: isDev ? '[name].css' : '[name].[contenthash].css',
            chunkFilename: isDev ? '[id].css' : '[id].[contenthash].css',
            ignoreOrder: true,
        }),
        ...templates,
        new webpack.DefinePlugin({ env: `${JSON.stringify(ENV)}` }),
        new ProgressBarPlugin({
            format: `  :msg [:bar] ${chalk.green.bold(':percent')} (:elapsed s)`,
        }),
        // new BundleAnalyzerPlugin(),
    ],
    resolve: {
        alias: {
            _components: path.resolve(__dirname, '../src/components'),
            _const: path.resolve(__dirname, '../src/const'),
            _less: path.resolve(__dirname, '../src/less'),
            _utils: path.resolve(__dirname, '../src/utils'),
            _static: path.resolve(__dirname, '../src/static'),
            _src: path.resolve(__dirname, '../src'),
            _service: path.resolve(__dirname, '../src/service'),
            _store: path.resolve(__dirname, '../src/store'),
            react: path.resolve('./node_modules/react'),
        },
        extensions: ['.jsx', '.js', '.less', '.css'],
    },
};
