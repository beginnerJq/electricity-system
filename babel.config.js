module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'usage',
        modules: false,
        corejs: { version: '3.6', proposal: true },
        shippedProposals: true,
      },
    ],
    '@babel/preset-react',
  ],
  plugins: [
    'react-hot-loader/babel',
    [
      'react-css-modules',
      {
        exclude: 'node_modules',
        webpackHotModuleReloading: true,
        skip: false,
        generateScopedName: '[name]__[local]___[hash:base64:5]',
        handleMissingStyleName: 'ignore',
        autoResolveMultipleImports: true,
        filetypes: {
          '.pcss': {},
        },
      },
    ],
    '@babel/plugin-syntax-dynamic-import',
    ['@babel/plugin-transform-runtime'],
    [
      'import',
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
      },
      'antd',
    ],
    [
      'import',
      {
        libraryName: 'ant-design-pro',
        libraryDirectory: 'lib',
        style: true,
        camel2DashComponentName: false,
      },
      'ant-design-pro',
    ],
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    ['@babel/plugin-proposal-optional-chaining', { loose: true }],
    '@babel/plugin-proposal-export-default-from',
  ],
};
