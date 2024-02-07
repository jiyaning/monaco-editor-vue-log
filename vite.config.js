/*
 * @Description:
 * @Version:
 * @Author: ji.yaning
 * @Date: 2024-02-06 17:37:50
 * @LastEditors: ji.yaning
 * @LastEditTime: 2024-02-07 16:25:05
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue2'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    [
      // 'component',
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ],
  ],
  presets: [["es2015", { "modules": false }]],  // 按需引入element-ui
  build: {
    lib: {
      // 入口
      entry: path.resolve(__dirname, 'src/packages/monaco-editor-vue2-log/index.js'),
      name: 'MonacoEditorVue2Log',
      fileName: 'MonacoEditorVue2Log'
    },
    rollupOptions: {
      // 不需要打包进库的依赖，忽略vue
      external: ['vue', 'element-ui', 'monaco-editor'],
      output: {
        // UMD构建模式下为这些外部的依赖提供一个全局变量
        globals: {
          vue: 'Vue'
        }
      }
    }
  }
})
