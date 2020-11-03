const merge = require('webpack-merge');
const webpack = require('webpack');
const path = require('path');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const webpackBase = require('./webpack.config.base');
const mock = require('../mock');

const webpackDev = {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: '../dist',
        port: '8082',
        host: '0.0.0.0',
        hot: true,
        disableHostCheck: true,
        clientLogLevel: 'none',
        overlay: {
            errors: true,
        },
        noInfo: false,
        compress: false,
        historyApiFallback: true,
        proxy: {
            '/unify-api': {
                target: 'https://www.dev.zhidianu.soejh.com',
                changeOrigin: true,
            },
            '/factory-common': {
                target: 'localhost:8088',
                changeOrigin: true,
            },
        },
        before(app) {
            mock(app);
        },
    },
    plugins: [
        new AddAssetHtmlPlugin({ filepath: require.resolve(path.resolve(__dirname, '../_dll_vendors/_dll_react.js')) }),
        new webpack.DllReferencePlugin({
            manifest: path.resolve(__dirname, '../_dll_vendors', 'manifest.json'),
        }),
        new webpack.HotModuleReplacementPlugin(),
    ],
};

module.exports = merge(webpackDev, webpackBase);
