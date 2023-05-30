import { defineConfig } from 'tsup';

export default defineConfig({
  format: ['esm'],
  sourcemap: true,
  outDir: 'build',
  entry: ['src/index.{ts,tsx}', 'src/**/*.{ts,tsx}', '!src/**/*.test.{ts,tsx}', '!src/**/*.d.ts'],
  external: ['react', 'react-dom'],
  bundle: true,
  minify: true,
  clean: true,
  dts: true,
  loader: {
    '.js': 'jsx',
  },
  outExtension() {
    return {
      js: `.js`,
    };
  },
});
