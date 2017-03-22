var webpack = require('webpack');
module.exports = {
    entry: "./index.js",
    output: {
        path: __dirname + '/dist',
        filename: "deepClone.js",
        library: 'deepClone',
        libraryTarget: 'umd'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        }]
    },
    debug: true,
    devtool: 'source-map'
};
