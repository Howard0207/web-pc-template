const TerserJSPlugin = require('terser-webpack-plugin');
const { merge } = require('webpack-merge');
const CompressionPlugin = require('compression-webpack-plugin');
const zopfli = require('@gfx/zopfli');
const webpackBase = require('./webpack.config.base');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
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
            new CssMinimizerPlugin({ parallel: true }),
        ],

        splitChunks: {
            chunks: 'all',
            minSize: 50000,
            maxSize: 245000,
            minChunks: 1,
            maxAsyncRequests: 20,
            maxInitialRequests: 10,
            automaticNameDelimiter: '_',
            enforceSizeThreshold: 300000,
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: 10,
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
        },
    },
    plugins: [
        new CompressionPlugin({
            compressionOptions: {
                numiterations: 20,
            },
            algorithm(input, compressionOptions, callback) {
                return zopfli.gzip(input, compressionOptions, callback);
            },
        }),
    ],
};

module.exports = merge(webpackProd, webpackBase);
