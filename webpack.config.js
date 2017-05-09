var ExtractTextPlugin = require('extract-text-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var path = require('path')
var webpack = require('webpack')

module.exports = {
    entry: [
        './src/script.js'
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        //publicPath: 'dist/',
        filename: 'js/script.js'
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                use: ['html-loader']
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    loader: ['css-loader']
                })
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    loader: ['css-loader','sass-loader']
                })
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                include: [
                    path.resolve(__dirname, 'src/img')
                ],
                use: {
                    loader: 'file-loader',
                    options: {
                        name: 'img/[name].[ext]?[hash]'
                    }
                }
            },
            {
                test: /\.(svg|eot|woff|woff2|ttf)$/,
                include: [
                    path.resolve(__dirname, 'src/fonts')
                ],
                use: {
                    loader: 'file-loader',
                    options: {
                        publicPath: '../',
                        outputPath: '../',
                        name: 'fonts/[name].[ext]?[hash]'
                    }
                }
            }
        ]
    },
    // resolve: {
    //     alias: {
    //         'vue$': 'vue/dist/vue.esm.js'
    //     }
    // },
    devServer: {
        historyApiFallback: true,
        noInfo: true
    },
    performance: {
        hints: false
    },
    devtool: '#eval-source-map',
    plugins: [
        new ExtractTextPlugin({
            filename: 'css/arricons.css',
            disable: false,
            allChunks: true
        }),
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        }),
        new CleanWebpackPlugin(['dist'])
    ]
}

if (process.env.NODE_ENV === 'production') {
    module.exports.devtool = '#source-map'
    // http://vue-loader.vuejs.org/en/workflow/production.html
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        })
    ])
}