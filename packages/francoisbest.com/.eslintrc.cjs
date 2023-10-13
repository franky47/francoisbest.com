module.exports = {
  // You might want to additionally set this in monorepos where Next.js app is in a subdir
  root: true,
  extends: ['next/core-web-vitals'],
  overrides: [
    {
      // Adapt to your needs (e.g. some might want to only override "next.config.js")
      files: ['*.js'],
      // This is the default parser of ESLint
      parser: 'espree',
      parserOptions: {
        ecmaVersion: 2020
      }
    }
  ],
  rules: { 'react/no-unescaped-entities': 0 },
  parserOptions: {
    babelOptions: {
      presets: [require.resolve('next/babel')]
    }
  }
}
