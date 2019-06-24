import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import livereload from 'rollup-plugin-livereload';
import replace from 'rollup-plugin-replace';
import { terser } from 'rollup-plugin-terser';

// `npm run build` -> `production` is true
// `npm run dev` -> `production` is false
const production = !process.env.ROLLUP_WATCH;

const extensions = ['.js', '.jsx', '.ts', '.tsx'];

export default {
  input: 'src/main.js',
  output: {
    file: 'static/js/bundle.js',
    format: 'iife', // immediately-invoked function expression — suitable for <script> tags
    sourcemap: true,
    globals: { d3: 'd3', react: 'React', 'react-dom': 'ReactDOM' },
  },
  external: ['d3', 'react', 'react-dom'],
  plugins: [
    resolve({ extensions }),
    babel({ extensions }),
    commonjs(),
    replace({
      'process.env.NODE_ENV': JSON.stringify(production ? 'production' : 'development'),
    }),
    !production && livereload(),
    production && terser(), // minify, but only in production
  ],
  /** @see https://github.com/d3/d3-selection/issues/168#issuecomment-451983830 */
  onwarn(warning, warn) {
    if (warning.code === 'CIRCULAR_DEPENDENCY') return;
    warn(warning);
  },
};
