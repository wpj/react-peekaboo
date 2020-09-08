module.exports = ((env) => {
  const isDev = env.NODE_ENV === 'development';
  const isTest = env.NODE_ENV === 'test' || 'CI' in env;

  if (isDev) {
    return {
      presets: ['next/babel'],
    };
  }

  const plugins = ['@babel/plugin-proposal-class-properties'];

  const presets = [
    '@babel/preset-typescript',
    '@babel/preset-react',
    isTest
      ? [
          '@babel/preset-env',
          {
            targets: {
              node: 'current',
            },
          },
        ]
      : '@babel/preset-env',
  ];

  return {
    plugins,
    presets,
  };
})(process.env);
