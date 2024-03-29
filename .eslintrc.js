module.exports = {
  extends: [
    'plugin:react/recommended',
    //'plugin:@typescript-eslint/recommended',
    'prettier',
    //'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  env: {
    node: true,
    browser: true,
    commonjs: true,
    es6: true,
  },
  parser: 'babel-eslint',
  plugins: [
    // "@typescript-eslint",
    'react-hooks',
  ],
  globals: {
    // 这里填入你的项目需要的全局变量
    // 这里值为 false 表示这个全局变量不允许被重新赋值，比如：
    //
    React: false,
    ReactDOM: false,
  },
  settings: {
    react: {
      pragma: 'React',
      version: 'detect',
    },
  },
  rules: {
    // 这里填入你的项目需要的个性化配置，比如：
    // // @fixable 一个缩进必须用两个空格替代
    'no-console': 'off',
    'no-unused-vars': [
      'off',
      {
        vars: 'all',
        args: 'none',
        caughtErrors: 'none',
      },
    ],
    'react/prop-types': 'off',
    'max-nested-callbacks': 'off',
    'react/no-children-prop': 'off',
    'typescript/member-ordering': 'off',
    'typescript/member-delimiter-style': 'off',
    'react/jsx-indent-props': 'off',
    'react/no-did-update-set-state': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    indent: [
      'off',
      2,
      {
        SwitchCase: 1,
        flatTernaryExpressions: true,
      },
    ],
  },
};
