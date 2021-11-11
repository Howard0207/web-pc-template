const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { getTemplates, getEntries, getCssHandler, ENV, publicPath, isDev } = require('./webpack.config.util');

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
    cache: {
        // 将缓存类型设置为文件系统
        type: 'filesystem',
        buildDependencies: {
            /* 将你的 config 添加为 buildDependency，以便在改变 config 时获得缓存无效*/
            config: [__filename],
            /* 如果有其他的东西被构建依赖， 你可以在这里添加它们*/
            /* 注意，webpack.config，加载器和所有从你的配置中引用的模块都会被自动添加*/
        },
        // 指定缓存的版本
        version: '1.0',
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
                test: /\.(png|jpg|jpeg|gif|svg|jfif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            esModule: false,
                            // outputPath: 'img/',
                            name: '[name]-[hash:6].[ext]',
                        },
                    },
                ],
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf|htc)$/,
                use: 'file-loader',
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /^\.\/(zh-cn)$/),
        new webpack.ProvidePlugin({ React: 'react' }),
        new MiniCssExtractPlugin({
            filename: isDev ? '[name].css' : '[name].[contenthash].css',
            chunkFilename: isDev ? '[id].css' : '[id].[contenthash].css',
            ignoreOrder: true,
        }),
        ...templates,
        new webpack.DefinePlugin({
            env: `${JSON.stringify(ENV)}`,
            rand: Math.floor(Math.random() * 1000000),
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
        },
        extensions: ['.jsx', '.js', '.less', '.css'],
    },
};
