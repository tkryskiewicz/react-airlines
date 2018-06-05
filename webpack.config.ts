import * as Webpack from "webpack";
import * as HtmlWebpackPlugin from "html-webpack-plugin";

const config: Webpack.Configuration = {
  entry: "./src/index.tsx",
  mode: "development",
  module: {
    rules: [
      {
        loader: "awesome-typescript-loader",
        test: /\.tsx?$/,
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
      ".tsx",
      ".ts",
      ".js",
    ],
  },
};

export default config;
