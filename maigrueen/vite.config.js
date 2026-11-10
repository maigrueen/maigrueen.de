import { fileURLToPath, URL } from 'url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { readFileSync } from 'node:fs'

// Der Build bricht ab, solange im Impressum noch der Platzhalter für die Anschrift steht.
if (process.argv.includes('build') && readFileSync('./public/impressum.html', 'utf-8').includes('ANSCHRIFT_HIER_EINTRAGEN')) {
  throw new Error('maigrueen/public/impressum.html: Bitte ANSCHRIFT_HIER_EINTRAGEN durch die Anschrift ersetzen.')
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
