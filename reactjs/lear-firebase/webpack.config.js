const path = require('path')

const config = {
    entry: './src/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve('build')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-react']
                },
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
        ]
    },
    mode: 'development'
}

module.exports = config