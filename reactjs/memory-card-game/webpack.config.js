const path = require('path')

const config = {
    entry: './src/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve('build')
    },
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    presets: ['@babel/preset-react']
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
        ]
    },
    mode: 'development'
}

module.exports = config