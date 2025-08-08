const typescript = require('rollup-plugin-typescript2');
const { nodeResolve } = require('@rollup/plugin-node-resolve');

module.exports = {
  input: 'main.ts',
  output: {
    file: 'dist/main.js',
    format: 'cjs',
  },
  external: ['obsidian'],
  plugins: [
    nodeResolve(),
    typescript(),
  ],
};
