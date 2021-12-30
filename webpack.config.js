// const path = require("path");
// const webpack = require("webpack");
// const HTMLWebpackPlugin = require("html-webpack-plugin");
import path from "path";
import webpack from "webpack";
// import SourceMapDevToolPlugin from "webpack";
import HTMLWebpackPlugin from "html-webpack-plugin";
import CopyPlugin from "copy-webpack-plugin";


export default {
    entry: "./frontend/src/index.js",
    output: {
        filename: "bundle.js",
        path: path.resolve('frontend/build'),
        publicPath: "/",
    },
    module: {
        rules:[
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: "babel-loader"
            },
            {
                test: /\.html$/,
                use: "html-loader"
            },
            /*Choose only one of the following two: if you're using
            plain CSS, use the first one, and if you're using a
            preprocessor, in this case SASS, use the second one*/
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.scss$/,
                use:[
                    "style-loader",
                    "css-loader",
                    "sass-loader"
                ],
            },
            {
                test: /\.js$/,
                enforce: 'pre',
                use: ['source-map-loader'],
            },

        ],
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: "./frontend/public/index.html"
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: './frontend/public/images',
                    to: './images'
                }
            ]
        }),
        new webpack.DefinePlugin({
            "process.env.REACT_ENV": JSON.stringify("PRODUCTION"),
        })
        // new SourceMapDevToolPlugin({
        //     filename: "[file].map"
        // }),
    ]
}