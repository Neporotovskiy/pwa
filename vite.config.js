import { defineConfig } from 'vite';
import { resolve } from 'node:path';

import { version } from './package.json';

import react from '@vitejs/plugin-react';

export default defineConfig(() => {
  return {
    define: {
      APP_VERSION: JSON.stringify(version),
    },
    plugins: [react()],
    resolve: {
      alias: {
        features: resolve('./src/features'),
        hooks: resolve('./src/hooks'),
        libraries: resolve('./src/libraries'),
        pages: resolve('./src/pages'),
        components: resolve('./src/components'),
        utilities: resolve('./src/utilities'),
      },
    },
  };
});
