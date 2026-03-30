const webpack = require("webpack");
const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const srcDir = path.join(__dirname, "..", "src");

console.log(srcDir);

module.exports = {
    entry: {
        popup: path.join(srcDir, 'entry', 'popup.tsx'),
        options: path.join(srcDir, 'entry', 'options.tsx'),
        updatePage: path.join(srcDir, 'entry', 'updatePage.tsx'),
        background: path.join(srcDir, 'entry', 'background.ts'),
        content_script: path.join(srcDir, 'entry', 'content_script.tsx'),
    },
    output: {
        path: path.join(__dirname, "../dist/js"),
        filename: "[name].js",
    },
    optimization: {
        splitChunks: {
            name: "vendor",
            chunks(chunk) {
                return chunk.name !== 'background';
            }
        },
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath: 'images',
                        },
                    },
                ],
            },
        ],
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx"],
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                { from: ".", to: "../", context: "public" },
                { from: path.join(srcDir, "styles", "dark-mode.css"), to: "../css" },
            ],
            options: {},
        }),
    ],
    devServer: {
        devMiddleware: {
            writeToDisk: true
        },
        static: {
            directory: path.join(__dirname, '../dist'),
        },
        port: 3000,
        hot: true
    },
};
