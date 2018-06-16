import { TsConfigPathsPlugin } from "awesome-typescript-loader";
import * as HtmlWebpackPlugin from "html-webpack-plugin";
import * as Webpack from "webpack";

const config: Webpack.Configuration = {
  entry: "./src/client/index.tsx",
  mode: "development",
  module: {
    rules: [
      {
        loader: "awesome-typescript-loader",
        options: {
          configFileName: "tsconfig-build.json",
        },
        test: /\.tsx?$/,
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
  plugins: [
    new HtmlWebpackPlugin({
      template: "src/client/index.html",
    }),
  ],
  resolve: {
    extensions: [
      ".tsx",
      ".ts",
      ".js",
    ],
    plugins: [
      new TsConfigPathsPlugin(),
    ],
  },
};

export default config;
