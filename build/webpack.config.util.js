const path = require('path');
const glob = require('glob');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const chunksList = [];
const entry = {};

const ENV = process.env.NODE_ENV;
const isDev = ENV === 'development';

// cdn path config
const publicPath = isDev ? '/' : './';

function getModulesList() {
    const moduleList = glob.sync(path.resolve(__dirname, '../src/entry/*'));
    for (let i = 0, len = moduleList.length; i < len; i++) {
        const moduleName = moduleList[i].split('/').slice(-1).join();
        chunksList.push(moduleName);
        entry[moduleName] = path.resolve(__dirname, `../src/entry/${moduleName}/index.jsx`);
    }
}

function getThemeEntries() {
    const themeEntries = {};
    const moduleList = glob.sync(path.resolve(__dirname, '../src/theme/*.less'));
    for (let i = 0, len = moduleList.length; i < len; i++) {
        const moduleName = moduleList[i].split('/').slice(-1).join().split('.')[0];
        themeEntries[moduleName] = path.resolve(__dirname, `../src/theme/${moduleName}.less`);
    }
    return themeEntries;
}

const getCssHandler = () => {
    return [
        isDev
            ? 'style-loader'
            : {
                  loader: MiniCssExtractPlugin.loader,
                  options: {
                      publicPath: `${publicPath}`,
                  },
              },

        'css-loader',
        'postcss-loader',
        'less-loader',
    ];
};

const getTemplates = () => {
    const commonConfig = {
        template: './src/index.html',
        scriptLoading: 'defer',
        hash: true,
        inject: 'body',
        favicon: path.resolve(__dirname, '../src/static/imgs/favicon.ico'),
        minify: {
            html5: true,
            collapseWhitespace: true,
            preserveLineBreaks: false,
            minifyCSS: true,
            minifyJS: true,
            removeComments: true,
            removeEmptyAttributes: true,
            keepClosingSlash: true,
        },
    };
    const templateList = [new HtmlWebpackPlugin({ chunks: ['app'], ...commonConfig })];
    chunksList.forEach((pageName) => {
        templateList.push(
            new HtmlWebpackPlugin({ filename: `${pageName}/index.html`, chunks: [pageName], ...commonConfig })
        );
    });
    return templateList;
};

const getEntries = () => {
    const defaultEntry = {
        app: path.resolve(__dirname, '../src/App.jsx'),
    };
    return Object.assign(defaultEntry, entry);
};

getModulesList();

module.exports = {
    entry,
    chunksList,
    getEntries,
    getCssHandler,
    getTemplates,
    getThemeEntries,
    publicPath,
    ENV,
    isDev,
};
