import * as Webpack from "webpack";
import * as HtmlWebpackPlugin from "html-webpack-plugin";

const config: Webpack.Configuration = {
  entry: "./src",
  mode: "development",
  module: {
    rules: [
      {
        loader: "awesome-typescript-loader",
        test: /\.ts$/,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "src/index.html",
    }),
  ],
  resolve: {
    extensions: [
      ".ts",
      ".js",
    ],
  },
};

export default config;
