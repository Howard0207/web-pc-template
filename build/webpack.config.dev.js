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
    optimization: {
        minimize: true,
        minimizer: [
            new TerserJSPlugin({
                parallel: true,
                extractComments: false,
                terserOptions: {
                    parse: {
                        ecma: 8,
                    },
                    compress: {
                        ecma: 5,
                        warnings: false,
                        comparisons: false,
                        inline: 2,
                        unused: true,
                        drop_debugger: true,
                        drop_console: true,
                    },
                    mangle: {
                        safari10: true,
                    },
                    output: {
                        ecma: 5,
                        comments: false,
                        ascii_only: true,
                    },
                },
                exclude: /\/node_modules/,
            }),
        ],
        splitChunks: {
            chunks: 'all',
            minSize: 30000,
            maxSize: 0,
            minChunks: 1,
            maxAsyncRequests: 6,
            maxInitialRequests: 5,
            automaticNameDelimiter: '_',
            cacheGroups: {
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true,
                },
                vendor: {
                    chunks: 'initial',
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    minSize: 0,
                    minChunks: 1,
                },
                antd: {
                    name: 'antd',
                    chunks: 'all',
                    priority: 15,
                    test: /antd|rc-picker|moment/,
                    minSize: 0,
                    minChunks: 3,
                },
                styles: {
                    name: 'styles',
                    test: /\.css$/,
                    chunks: 'initial',
                    enforce: true,
                },
            },
        },
    },
    plugins: [
        new AddAssetHtmlPlugin({ filepath: require.resolve(path.resolve(__dirname, '../_dll_vendors/_dll_react.js')) }),
        new webpack.DllReferencePlugin({
            manifest: path.resolve(__dirname, '../_dll_vendors', 'manifest.json'),
        }),
        new CopyPlugin({
            patterns: [{ from: path.resolve(__dirname, '../src/theme'), to: 'dist', force: true }],
        }),
        new webpack.HotModuleReplacementPlugin(),
        new ReactRefreshWebpackPlugin(),
    ],
};

module.exports = merge(webpackDev, webpackBase);
