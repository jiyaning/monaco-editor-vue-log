/*
 * @Description:
 * @Version:
 * @Author: ji.yaning
 * @Date: 2024-02-07 10:37:22
 * @LastEditors: ji.yaning
 * @LastEditTime: 2024-02-28 14:37:54
 */
// 组件
import MonacoEditorVue2Log from './monaco-editor-vue2-log/index.vue'

// 所有组件列表
const components = [
  MonacoEditorVue2Log
];

// 定义install方法，Vue作为参数
const install = (Vue) => {
  components.forEach((component) => {
    // 实际代码中使用的组件名
    Vue.component(component.name, component);
  })
}

// 用于后面Vue.use调用
export default {
  install,
  // 所有组件，必须具有install方法才能使用Vue.use()
  ...components
 }

