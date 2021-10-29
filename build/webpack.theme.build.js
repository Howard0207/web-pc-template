const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { getThemeEntries } = require('./webpack.config.util');

module.exports = {
    mode: 'production',
    entry: getThemeEntries(),
    output: {
        path: path.resolve(__dirname, '../src/theme/'),
    },
    module: {
        rules: [
            {
                test: /\.(le|c)ss$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'less-loader'],
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css',
            ignoreOrder: true,
        }),
    ],
};
