// vite.config.js
import * as path from 'path';
import { defineConfig } from 'vite';

module.exports = defineConfig({
    build: {
        lib: {
            entry: path.resolve(__dirname, 'index.ts'),
            name: 'MyLib',
            fileName: (format) => {
                if (format === 'es') {
                    return 'index.esm.js';
                } else {
                    return 'index.js';
                }
            },
            formats: ['es', 'cjs'],
        },
        rollupOptions: {
            // make sure to externalize deps that shouldn't be bundled
            // into your library
            external: [
                '@emotion/react',
                '@guardian/libs',
                '@guardian/source-foundations',
                '@guardian/source-react-components',
                '@guardian/source-react-components-development-kitchen',
                'react',
            ],
            output: {},
        },
    },
});
