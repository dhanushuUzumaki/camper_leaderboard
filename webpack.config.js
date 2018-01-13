const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const WebpackCleanupPlugin = require('webpack-cleanup-plugin');

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
    template: './src/index.html',
    filename: 'index.html',
    inject: 'body'
});
const ExtractTextPluginConfig = new ExtractTextPlugin('styles.css');
const WebpackCleanupPluginConfig = new WebpackCleanupPlugin();

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve('public'),
        filename: 'index.[chunkhash].js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ["css-loader", "sass-loader"]
                })
            }
        ]
    },
    plugins: [WebpackCleanupPluginConfig, ExtractTextPluginConfig, HtmlWebpackPluginConfig]
}