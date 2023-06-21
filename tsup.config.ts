import { defineConfig } from 'tsup';

const tsupConfig = defineConfig([
  {
    format: ['esm'],
    sourcemap: true,
    outDir: 'build/lib',
    entry: ['src/index.{ts,tsx}', 'src/**/*.{ts,tsx}', '!src/sso.{ts,tsx}','!src/**/*.d.ts'],
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
    format: ['esm'],
    sourcemap:false,
    outDir: 'build',
    entry: ['src/sso.{ts,tsx}'],
    external: ['react', 'react-dom'],
    bundle: true,
    minify: true,
    target: 'es2020',
    clean: true,
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