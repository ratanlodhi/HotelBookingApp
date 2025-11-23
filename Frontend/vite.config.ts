import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default (config: { mode: string }) => {
  const mode = config.mode;
  // Load env variables based on `mode` (development, production, etc)
  const env = loadEnv(mode, process.cwd(), '');

  return defineConfig({
    plugins: [react()],
    optimizeDeps: {
      exclude: ['lucide-react'],
    },
    server: {
      proxy: mode === 'development' ? {
        '/api': {
          target: 'http://localhost:8000',
          changeOrigin: true,
          secure: false,
        },
      } : undefined,
    },
    define: {
      __APP_ENV__: env.APP_ENV,
    },
  });
};
