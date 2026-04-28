import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// https://qiita.com/tat_mae084/items/4051c61926dc8165e80b
// https://rolldown.rs/reference/OutputOptions.codeSplitting
export default defineConfig({
  base: process.env.GITHUB_PAGES
    ? "botalab"
    : "./",
  plugins: [react()],
  build: {
    rolldownOptions: {
      output: {
        codeSplitting: {
          minSize: 20000,
          groups: [
            {
              name: 'react-vendor',
              test: /node_modules[\\/]react/,
              priority: 20,
            },
            {
              name: 'ui-vendor',
              test: /node_modules[\\/]antd/,
              priority: 15,
            },
            {
              name: 'vendor',
              test: /node_modules/,
              priority: 10,
            },
            {
              name: 'common',
              minShareCount: 2,
              minSize: 10000,
              priority: 5,
            },
          ],
        },
      }
    }
  },
})