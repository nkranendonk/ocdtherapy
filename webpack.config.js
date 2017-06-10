var webpack = require('webpack');
var path = require('path');

module.exports = function(env) {
    return {
        entry: {
            main: './src/main.js'
        },
        output: {
            filename: 'bundle.js',
            path: path.resolve(__dirname, 'src')
        },
        devServer: {
            contentBase: path.relative(__dirname, './src')
        },
        module: {
            rules: [{
                test: /\.html$/,
                use: ['html-loader']
            },
                {
                    test: /\.css$/,
                    use: [ 'raw-loader' ]
                }
            ]
        }
    }
}