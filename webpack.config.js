const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        index: './src/index.js',
        importLogos: './src/scripts/importLogos.js'
    },
    target: 'node',
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            { test: /\.js$/, use: 'babel-loader', include: [path.resolve(__dirname, 'src')] }
        ]
    },
    plugins: [
        new CopyWebpackPlugin([{
            from: './bin/content-run',
            to: path.resolve(__dirname, 'dist')
        }])
    ]
};