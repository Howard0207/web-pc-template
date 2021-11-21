const { merge } = require('webpack-merge');
const webpack = require('webpack');
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const webpackBase = require('./webpack.config.base');
const mock = require('../mock');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const webpackDev = {
    mode: 'development',
    devtool: 'eval-source-map',
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
    devServer: {
        static: '../dist',
        port: '8082',
        host: '0.0.0.0',
        hot: true,
        compress: false,
        historyApiFallback: true,
        proxy: {
            '/server': {
                target: 'http://localhost:10100/',
                changeOrigin: true,
                pathRewrite: { '^/server': '' },
            },
        },
        // before(app) {
        //     mock(app);
        // },
    },
    plugins: [
        new CopyPlugin({
            patterns: [{ from: path.resolve(__dirname, '../src/theme'), to: 'dist', force: true }],
        }),
        new webpack.HotModuleReplacementPlugin(),
        new ReactRefreshWebpackPlugin(),
    ],
};

module.exports = merge(webpackDev, webpackBase);
