import path from "path";
import ExtractTextPlugin from "extract-text-webpack-plugin";
import autoprefixer from "autoprefixer";

const extractCore = new ExtractTextPlugin({
  filename: "./css/core.css"
});

export default {
  entry: {
    "js/index_bundle.js": "./client/index.js"
  },
  output: {
    path: path.resolve("public"),
    filename: "[name]"
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" },
          {
            loader: "postcss-loader",
            options: {
              plugins: [autoprefixer]
            }
          },
          { loader: "sass-loader" }
        ],
        exclude: /core\.scss$/
      },
      {
        test: /core\.scss$/,
        use: extractCore.extract({
          use: [
            {
              loader: "css-loader",
              options: {
                importLoaders: 2
              }
            },
            {
              loader: "postcss-loader",
              options: {
                plugins: [autoprefixer]
              }
            },
            { loader: "sass-loader" }
          ],
          fallback: "style-loader"
        })
      },
      {
        test: /\.js$/,
        use: ["babel-loader", "eslint-loader"],
        exclude: /node_modules/
      },
      {
        test: /\.jsx$/,
        use: "babel-loader",
        exclude: /node_modules/
      }
    ]
  },
  plugins: [extractCore],
  resolve: {
    modules: [path.resolve("./client"), path.resolve("./node_modules")]
  }
};
