const { join } = require('path');

const rootDir = join(__dirname, '../');
//代码目录
const srcDir = join(rootDir, 'src');
//打包目录
const distDir = join(rootDir, 'dist');

const buildPublicPath = './';

//代理配置
const proxy = {
  '/api': {
    target: 'http://101.133.165.209:8080',
    changeOrigin: true,
    pathRewrite: { '^/api': '' },
  },
};

module.exports = {
  srcDir,
  distDir,
  proxy,
  buildPublicPath,
};
