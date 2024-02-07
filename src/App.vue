<!--
 * @Description:
 * @Version:
 * @Author: ji.yaning
 * @Date: 2024-02-06 17:37:50
 * @LastEditors: ji.yaning
 * @LastEditTime: 2024-02-07 13:47:43
-->
<template>
  <div class="">
    <monaco-editor-vue2-log
      :title="title"
      :value="value"
      :readOnly="readOnly"
    ></monaco-editor-vue2-log>
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
      value: '123',
      readOnly: false,
    }
  },
  methods: {

  },
}
</script>
<style scoped>
</style>