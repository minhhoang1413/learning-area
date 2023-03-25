const path = require('path')
const config = {
    entry: './src/index.js',
    output: {
        path: path.resolve('build'),
        filename: 'main.js'
    },
    devServer: {
        static: path.resolve('build'),
        port: 3000,
        historyApiFallback: true
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
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            }
        ]
    },
    mode: 'development'
}

module.exports = config