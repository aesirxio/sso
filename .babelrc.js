const sharedPresets = ['@babel/preset-react'];
const shared = {
  presets: sharedPresets,
};

const plugins = {
  plugins: [
    '@babel/plugin-transform-runtime',
    [
      require.resolve('babel-plugin-module-resolver'),
      {
        root: ['./src/'],
      },
    ],
  ],
};

module.exports = {
  env: {
    esmUnbundled: {
      presets: [['@babel/preset-env'], ...sharedPresets],
    },
    esmBundled: {
      ...shared,
      presets: [
        [
          '@babel/preset-env',
          {
            targets: '>0.2%, not dead, not op_mini all',
          },
        ],
        ...sharedPresets,
      ],
      ...plugins,
    },
    cjs: {
      ...shared,
      presets: [
        [
          '@babel/preset-env',
          {
            modules: 'commonjs',
          },
        ],
        ...sharedPresets,
      ],
      ...plugins,
    },
    test: {
      presets: ['@babel/preset-env'],
      ...plugins,
    },
  },
};
