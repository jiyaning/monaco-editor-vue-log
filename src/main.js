/*
 * @Description:
 * @Version:
 * @Author: ji.yaning
 * @Date: 2024-02-06 17:37:50
 * @LastEditors: ji.yaning
 * @LastEditTime: 2024-02-28 14:27:30
 */
import Vue from "vue";
import App from './App.vue';
import "./assets/icon/iconfont.css";
import 'element-ui/lib/theme-chalk/index.css';
import { Icon, Checkbox, Switch } from 'element-ui';
// import "monaco-editor-vue2-log/style.css";
// import MonacoEditorVue2Log  from "monaco-editor-vue2-log"
Vue.use(Icon)
Vue.use(Checkbox)
Vue.use(Switch)
// Vue.use(MonacoEditorVue2Log)

new Vue({
  el: '#app',
  render: h => h(App)
})