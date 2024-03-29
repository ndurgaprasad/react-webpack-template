const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin =  require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

let mode = "development";

if (process.env.NODE_ENV === "production") {
    mode = "production";
}

module.exports = {
    mode: mode,

    output: {
        path: path.resolve(__dirname, "dist"),
        assetModuleFilename: "images/[hash][ext][query]"
    },

    module: {
        rules: [{
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.(s[ac|c])ss$/,
                use: [{
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: ""
                        },
                    },
                    "css-loader",
                    "postcss-loader",
                    "sass-loader"
                ],
            },
            {
                test: /\.(?:ico|gif|png|jpg|jpeg|svg)$/i,
                type: "asset"
            },
        ]
    },

    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin({
            template: "./public/index.html"
        }),
    ],

    resolve: {
        extensions: [".js", ".jsx"],
    },

    devtool: "source-map",
    devServer: {
        static: "./dist",
        hot: true
    }
}