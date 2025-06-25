module.exports = {
  devServer: (devServerConfig) => {
    devServerConfig.allowedHosts = ['local.petsync360admin'];
    return devServerConfig;
  },
};
