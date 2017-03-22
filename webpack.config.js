var webpack = require('webpack');
module.exports = {
    entry: "./index.js",
    output: {
        path: __dirname + '/dist',
        filename: "deepClone.min.js",
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
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ]
};
