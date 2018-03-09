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
        new CleanWebpackPlugin([resolve('dist')]),
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
        }, {
            test: /\.(ttf|woff|svg|eot)$/,
            use: [
                'url-loader?name=../fonts/[name].[ext]?[hash]'
            ],
        }, {
            // 图片加载器，file-loader，更适合图片，可以将较小的图片转成base64，减少http请求
            // 如下配置，将小于8192byte的图片转成base64码
            test: /\.(png|jpg|gif)$/,
            loader: 'url-loader?limit=8192&name=../images/[name].[ext]?[hash]',
        }]
    },
    resolve: {
        // 可以忽略的文件类型
        extensions: ['.js', '.vue'],
        // 别名
        alias: {
            src: resolve('src'),
            common: resolve('src/common'),
            components: resolve('src/components'),
            api: resolve('src/api'),
            base: resolve('src/base')
        }
    }
};
