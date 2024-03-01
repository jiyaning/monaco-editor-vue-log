<!--
 * @Description:
 * @Version:
 * @Author: ji.yaning
 * @Date: 2024-02-06 17:37:50
 * @LastEditors: ji.yaning
 * @LastEditTime: 2024-03-01 17:36:40
-->
<template>
  <div class="container">
    <MonacoEditorVue2Log
      :title="title"
      :value="value"
      :readOnly="readOnly"
      :keywordsStyle="keywordsStyle"
      :scrollToBottomVisible="scrollToBottomVisible"
      @editorValue="getEdtiorValue"
      ref="editor"
    ></MonacoEditorVue2Log>
  </div>
</template>
<script>
import MonacoEditorVue2Log from "./packages/monaco-editor-vue2-log/index.vue"
export default {
  name: 'App',
  components: {
    MonacoEditorVue2Log
  },
  data () {
    return {
      title: '日志log',
      value: `"name": "monaco-editor-vue2-log",
"version": "1.0.5",
"description": "基于monaco-editor的vue2日志log组件",
"main": "monaco-editor-vue2-log.js",
"scripts": {
  "test": "echo \"Error: no test specified\" && exit 1"
},
"keywords": [
  "vue",
  "vue2",
  "log",
  "monaco-editor",
  "monaco",
  "editor"
],
"author": "ji.yaning",
"license": "ISC"`,
      readOnly: false,
      keywordsStyle: [
        { token: 'monaco', foreground: '#E5E510' },
        { token: 'editor', foreground: '#00EE76' },
        { token: 'vue', foreground: '#508ae1', fontStyle: 'bold' }
      ],
      scrollToBottomVisible: true,
    }
  },
  mounted () {
    this.$refs['editor'].getValue()
  },
  methods: {
    getEdtiorValue (value) {
      console.log('编辑器的值为', value)
    }
  },
}
</script>
<style>
.container {
  height: 400px;
}
</style>

