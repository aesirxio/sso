import { defineConfig } from 'tsup';

const tsupConfig = defineConfig([
  {
    format: ['esm'],
    outDir: 'build/lib',
    entry: ['src/index.{ts,tsx}'],
    external: ['react', 'react-dom'],
    bundle: true,
    minify: true,
    target: 'es2020',
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
 },
 {
    format: ['iife'],
    outDir: 'build',
    entry: ['src/sso.{ts,tsx}'],
    // name: 'SSO',
    external: ['react', 'react-dom'],
    bundle: true,
    minify: true,
    target: 'es2020',
    clean: false,
    dts: false,
    loader: {
      '.js': 'jsx',
    },

    outExtension() {
    return {
      js: `.js`,
    };
    },
  },
]);

export default tsupConfig;