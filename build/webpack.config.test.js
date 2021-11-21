const { merge } = require('webpack-merge');
const path = require('path');
const webpackBase = require('./webpack.config.base');

const webpackTest = {
    mode: 'development',
    devtool: 'inline-source-map',
};

module.exports = merge(webpackTest, webpackBase);
