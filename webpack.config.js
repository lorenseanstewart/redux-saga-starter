const path = require("path");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const config = {
    entry: [
        "babel-polyfill",
        "webpack-dev-server/client?http://localhost:3333",
        "webpack/hot/only-dev-server",
        "./src/index.js"
    ],
    output: {
        path: __dirname + "/public/",
        publicPath: "/",
        filename: "bundle.js"
    },
    module: {
        rules: [
            {
                test: [/\.jsx?$/, /\.jsx?$/],
                exclude: /node_modules/,
                loader: "babel-loader",
                options: {
                    presets: ["babel-preset-env", "react", "stage-2"]
                }
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: "style-loader" // creates style nodes from JS strings
                    },
                    {
                        loader: "css-loader" // translates CSS into CommonJS
                    },
                    {
                        loader: "sass-loader" // compiles Sass to CSS
                    }
                ]
            },
            {
                test: /\.svg$/,
                loader: "svg-inline-loader?classPrefix",
                options: {
                    // for many options, see the url below
                    // https://github.com/webpack-contrib/svg-inline-loader
                    removingTags: ["title", "desc", "defs"]
                }
            }
        ]
    },
    resolve: {
        extensions: ["*", ".js", ".jsx", ".css", ".scss"]
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV)
            }
        }),
        new HtmlWebpackPlugin({
            template: "./src/index.ejs",
            inject: true
        })
    ],
    devtool: "source-map",
    devServer: {
        historyApiFallback: true,
        contentBase: "./public",
        inline: true,
        hot: true,
        port: 3333
    }
};
if (process.env.NODE_ENV === "production") {
    config.devtool = "cheap-module-source-map";
    config.plugins.push(
        new webpack.optimize.UglifyJsPlugin({ sourceMap: true }),
        new ExtractTextPlugin({
            filename: "bundle.css",
            disable: false,
            allChunks: true
        }),
        new webpack.optimize.AggressiveMergingPlugin({
            minSizeReduce: 1,
            moveToParents: true
        })
    );
} else {
    config.devtool = "cheap-module-eval-source-map";
    config.plugins.push(
        new webpack.optimize.UglifyJsPlugin({ sourceMap: true }),
        new ExtractTextPlugin({ disable: true })
    );
}

module.exports = config;
