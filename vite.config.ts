import tailwindcss from '@tailwindcss/vite'
import { devtools } from '@tanstack/devtools-vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import viteTsConfigPaths from 'vite-tsconfig-paths'

const config = defineConfig({
   optimizeDeps: {
    // Exclude TanStack Start packages from Vite's dependency optimization
    // to prevent issues with virtual imports (#tanstack-router-entry, etc.)
    exclude: [
      '@tanstack/start-server-core',
      '@tanstack/react-start',
      '@tanstack/react-start/client',
      '@tanstack/react-start/server',
    ],
  },
  plugins: [
    devtools(),
    // this is the plugin that enables path aliases
    viteTsConfigPaths({
      projects: ['./tsconfig.json'],
    }),
    tailwindcss(),
    tanstackStart(),
    
    viteReact({
      babel: {
        plugins: ['babel-plugin-react-compiler'],
      },
    }),
  ],
})

export default config
