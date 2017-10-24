var UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
var path = require('path');
// or
// var webpack = require('webpack');

module.exports = {
    entry: [
        './scripts/app.js'
    ],
    output: {
        path: path.join(__dirname, '/public/js/dist'),
        publicPath: '/public/',
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/, 
                loader: 'babel-loader', 
                exclude: /node_modules/,
                options: { plugins: ['transform-runtime'], presets: ['es2015'] }
            },
            { 
                test: /\.hbs$/, 
                loader: 'handlebars-loader' 
            }
        ]
    },
};