import { defineConfig } from 'tsup';

export default defineConfig({
  format: ['esm'],
  sourcemap: true,
  entryPoints: ['src/index.tsx', 'src/sso.tsx'],
  outDir: 'build',
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
