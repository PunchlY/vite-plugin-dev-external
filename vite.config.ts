import { resolve } from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
    build: {
        sourcemap: true,
        lib: {
            entry: resolve('src/index.ts'),
            formats: ['es', 'cjs'],
            fileName: 'index',
        },
        rollupOptions: {
            external: ['magic-string', 'estree-walker'],
        },
    },
    plugins: [dts({ rollupTypes: true })],
});
