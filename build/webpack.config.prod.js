const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { merge } = require('webpack-merge');
const CompressionPlugin = require('compression-webpack-plugin');
const zopfli = require('@gfx/zopfli');
const webpackBase = require('./webpack.config.base');

const webpackProd = {
    mode: 'production',
    optimization: {
        runtimeChunk: true,
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
            new OptimizeCSSAssetsPlugin(),
        ],

        splitChunks: {
            chunks: 'all',
            minSize: 30000,
            maxSize: 245000,
            minChunks: 3,
            maxAsyncRequests: 6,
            maxInitialRequests: 5,
            automaticNameDelimiter: '_',
            enforceSizeThreshold: 245000,
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                    name: false,
                    reuseExistingChunk: true,
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    name: false,
                    reuseExistingChunk: true,
                },
            },
            // cacheGroups: {
            //     vendors: {
            //         // node_modules里的代码
            //         test: /[\\/]node_modules[\\/]/,
            //         chunks: 'all',
            //         // name: 'vendors', 一定不要定义固定的name
            //         priority: 10, // 优先级
            //         enforce: true,
            //         reuseExistingChunk: true,
            //     },
            // },
            // cacheGroups: {
            //     default: {
            //         minChunks: 2,
            //         priority: -20,
            //         reuseExistingChunk: true,
            //     },
            //     vendor: {
            //         chunks: 'initial',
            //         test: /[\\/]node_modules[\\/]/,
            //         name: 'vendor',
            //         minSize: 0,
            //         minChunks: 1,
            //     },
            //     antd: {
            //         name: 'antd',
            //         chunks: 'all',
            //         priority: 15,
            //         test: /antd|rc-picker|moment/,
            //         minSize: 0,
            //         minChunks: 3,
            //     },
            //     styles: {
            //         name: 'styles',
            //         test: /\.css$/,
            //         chunks: 'initial',
            //         enforce: true,
            //     },
            // },
        },
    },
    // plugins: [
    //     new CompressionPlugin({
    //         compressionOptions: {
    //             numiterations: 20,
    //         },
    //         algorithm(input, compressionOptions, callback) {
    //             return zopfli.gzip(input, compressionOptions, callback);
    //         },
    //     }),
    // ],
};

module.exports = merge(webpackProd, webpackBase);
