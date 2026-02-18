// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src' // Adjust the path if needed
    }
  },
  esbuild: {
    jsxFactory: 'React.createElement',
    jsxInject: `import React from 'react'`,
    // Specify JSX as the loader for .js files
    jsx: 'react',
  }
});


