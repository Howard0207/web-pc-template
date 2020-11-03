const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    entry: {
        react: ['react', 'react-router-dom', 'redux', 'react-redux', 'redux-thunk'],
    },
    output: {
        filename: '_dll_[name].js', // 产生的文件名
        path: path.resolve(__dirname, '../_dll_vendors'),
        library: '_dll_[name]',
    },
    plugins: [
        new CleanWebpackPlugin(),
        new webpack.DllPlugin({
            name: '_dll_[name]',
            path: path.resolve(__dirname, '../_dll_vendors', 'manifest.json'),
        }),
    ],
};
