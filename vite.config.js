import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import { createHtmlPlugin } from 'vite-plugin-html'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import { viteExternalsPlugin } from 'vite-plugin-externals'

const copyCesium = items =>
  viteStaticCopy({
    targets: [
      ...items.map(item => ({
        src: `node_modules/cesium/Build/Cesium/${item}/*`,
        dest: `libs/cesium/${item}/`
      })),
      {
        src: 'node_modules/cesium/Build/Cesium/Cesium.js',
        dest: 'libs/cesium/'
      }
    ]
  })

export default defineConfig({
  plugins: [
    vue(),
    createHtmlPlugin({
      minify: true,
      inject: {
        data: {
          cesiumInjectScript: `<script src="libs/cesium/Cesium.js"></script>`
        }
      }
    }),
    copyCesium(['Assets', 'ThirdParty', 'Widgets', 'Workers']),
    viteExternalsPlugin(
      { cesium: 'Cesium' },
      {
        disableInServe: true
      }
    )
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
