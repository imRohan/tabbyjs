import eslint from '@rollup/plugin-eslint'

export default {
  input: 'src/tabby.js',
  output: {
    name: 'Tabby',
    file: 'dist/tabby.js',
    format: 'umd',
  },
  plugins: [
    eslint({
      fix: true,
      throwOnError: true,
    }),
  ],
}
