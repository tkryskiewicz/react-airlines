import devConfig from "../webpack.config";

module.exports = (_baseConfig, _env, config) => {
  return {
    ...config,
    module: devConfig.module,
    resolve: devConfig.resolve,
  };
};
