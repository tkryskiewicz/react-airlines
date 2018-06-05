import * as Webpack from "webpack";

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
  resolve: {
    extensions: [
      ".ts",
    ],
  },
};

export default config;
