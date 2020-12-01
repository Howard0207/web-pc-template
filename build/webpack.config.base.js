const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
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
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.(le|c)ss$/,
                use: cssHandler,
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10240,
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
        new webpack.DefinePlugin({ 'process.env': `${JSON.stringify(ENV)}` }),
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
