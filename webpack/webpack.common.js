const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// 获得路径
const resolve = function(src) {
    return path.join(__dirname, "..", src);
};

module.exports = {
    entry: {
        app: resolve('src/index.js')
    },
    output: {
        filename: '[name].bundle.js',
        path: resolve('dist')
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            template: resolve('src/index.html')
        })
    ],
    module: {
        rules: [{
            test: /.vue$/,
            loader: 'vue-loader'
        }, {
            test: /\.css$/,
            use: [
                'style-loader',
                'css-loader'
            ]
        }, {
            test: /\.styl$/,
            use: [
                'style-loader',
                'css-loader',
                'stylus-loader'
            ],
        }]
    },
    resolve: {
        // 可以忽略的文件类型
        extensions: ['.js', '.vue'],
        // 别名
        alias: {
            src: resolve('src')
        }
    }
};
