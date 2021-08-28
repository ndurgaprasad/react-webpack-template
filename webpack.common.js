const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const paths = {
  src: path.resolve(__dirname, "src"),
  build: path.resolve(__dirname, "dist"),
  assets: path.resolve(__dirname, "assets"),
};

module.exports = {
  entry: [paths.src + "/index.js"],
  output: {
    path: paths.build,
    filename: "[name].[hash].js",
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: path.resolve(__dirname, "node_modules"),
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.*css$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        loader: "file-loader",
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: "asset/inline",
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: "React - Firestore App",
      template: "./src/index.html",
      filename: "./index.html",
    }),
  ],
};
