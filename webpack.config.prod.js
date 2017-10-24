var UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
// or
// var webpack = require('webpack');

module.exports = {
    entry: [
        './scripts/app.js'
    ],
    output: {
        path: __dirname + '/public/js/dist',
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
    plugins: []
};