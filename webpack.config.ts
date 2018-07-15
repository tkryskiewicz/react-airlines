import { TsConfigPathsPlugin } from "awesome-typescript-loader";
import * as HtmlWebpackPlugin from "html-webpack-plugin";
import * as Webpack from "webpack";

const config: Webpack.Configuration = {
  devServer: {
    historyApiFallback: true,
  },
  devtool: "cheap-module-source-map",
  entry: "./src/client/index.tsx",
  mode: "development",
  module: {
    rules: [
      {
        loader: "awesome-typescript-loader",
        options: {
          configFileName: "tsconfig-build.json",
        },
        test: /\.(tsx?|jsx)$/,
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          "css-loader",
        ],
      },
    ],
  },
  output: {
    publicPath: "/",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "src/client/index.html",
    }),
  ],
  resolve: {
    extensions: [
      ".tsx",
      ".ts",
      ".jsx",
      ".js",
    ],
    plugins: [
      new TsConfigPathsPlugin(),
    ],
  },
};

export default config;
