import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

import { createHtmlPlugin } from 'vite-plugin-html'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import { viteExternalsPlugin } from 'vite-plugin-externals'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const { VITE_CESIUM_LIBS_PATH } = env

  const copyCesium = items =>
    viteStaticCopy({
      targets: [
        ...items.map(item => ({
          src: `node_modules/cesium/Build/Cesium/${item}/*`,
          dest: `${VITE_CESIUM_LIBS_PATH}/${item}/`
        })),
        {
          src: 'node_modules/cesium/Build/Cesium/Cesium.js',
          dest: `${VITE_CESIUM_LIBS_PATH}/`
        }
      ]
    })

  return {
    plugins: [
      vue(),
      createHtmlPlugin({
        minify: true,
        inject: {
          data: {
            cesiumInjectScript: `<script src="${VITE_CESIUM_LIBS_PATH}/Cesium.js"></script>`
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
  }
})
