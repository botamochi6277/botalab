import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import yaml from '@modyfi/vite-plugin-yaml'

// https://vitejs.dev/config/
// https://qiita.com/tat_mae084/items/4051c61926dc8165e80b
// https://rolldown.rs/reference/OutputOptions.codeSplitting
export default defineConfig({
  // absolute base so assets resolve on nested routes such as /projects/{id}
  base: "/",
  plugins: [react(), yaml()],
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