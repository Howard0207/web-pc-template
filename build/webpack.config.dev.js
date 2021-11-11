const { merge } = require('webpack-merge');
const webpack = require('webpack');
const TerserJSPlugin = require('terser-webpack-plugin');
const path = require('path');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const webpackBase = require('./webpack.config.base');
const mock = require('../mock');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const webpackDev = {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        static: '../dist',
        port: '8082',
        host: '0.0.0.0',
        hot: true,
        compress: false,
        historyApiFallback: true,
        proxy: {
            '/unify-api': {
                target: 'https://www.dev.zhidianu.soejh.com',
                changeOrigin: true,
            },
        },
        // before(app) {
        //     mock(app);
        // },
    },
    plugins: [
        // new AddAssetHtmlPlugin({ filepath: require.resolve(path.resolve(__dirname, '../_dll_vendors/_dll_react.js')) }),
        // new webpack.DllReferencePlugin({
        //     manifest: path.resolve(__dirname, '../_dll_vendors', 'manifest.json'),
        // }),
        new CopyPlugin({
            patterns: [{ from: path.resolve(__dirname, '../src/theme'), to: 'dist', force: true }],
        }),
        new webpack.HotModuleReplacementPlugin(),
        new ReactRefreshWebpackPlugin(),
    ],
};

module.exports = merge(webpackDev, webpackBase);
