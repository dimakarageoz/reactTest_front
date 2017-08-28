var webpack = require('webpack');
var devServer = require('webpack-dev-server');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './frontEnd/index.jsx',
    output: {
        path: __dirname + 'frontEnd/dist',
        filename: 'dist.js'
    },

    devtool: 'source-map',
    watch: true,

    devServer: {
        port: 3030,
        contentBase: __dirname + '/frontEnd/'
    },
    
    module: {
        loaders: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['env', 'react']
                }
            },
            {
                test: /\.(css|scss)$/,
                exclude: /node_modules/,
                loader: ['style-loader', 'css-loader', 'sass-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html'
        })
    ]
}