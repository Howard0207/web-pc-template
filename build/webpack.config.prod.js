const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const merge = require('webpack-merge');
const CompressionPlugin = require('compression-webpack-plugin');
const zopfli = require('@gfx/zopfli');
const webpackBase = require('./webpack.config.base');

const webpackProd = {
    mode: 'production',
    optimization: {
        minimize: true,
        minimizer: [
            new TerserJSPlugin({
                sourceMap: false,
                parallel: true,
                cache: true,
                extractComments: false,
                terserOptions: {
                    warnings: false,
                    compress: {
                        unused: true,
                        drop_debugger: true,
                        drop_console: true,
                    },
                },
                exclude: /\/node_modules/,
            }),
            new OptimizeCSSAssetsPlugin(),
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
                charts: {
                    name: 'echarts',
                    chunks: 'all',
                    priority: 10,
                    test: /echarts|zrender/,
                    minSize: 0,
                    minChunks: 3,
                },
                antd: {
                    name: 'antd',
                    chunks: 'all',
                    priority: 15,
                    test: /antd|rc-picker|moment/,
                    minSize: 0,
                    minChunks: 3,
                },
                xlsx: {
                    name: 'xlsx',
                    chunks: 'all',
                    priority: 8,
                    test: /xlsx/,
                    minSize: 100,
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
