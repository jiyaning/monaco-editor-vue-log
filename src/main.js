/*
 * @Description:
 * @Version:
 * @Author: ji.yaning
 * @Date: 2024-02-06 17:37:50
 * @LastEditors: ji.yaning
 * @LastEditTime: 2024-02-07 10:21:58
 */
import Vue from "vue";
import App from './App.vue';
import "./assets/icon/iconfont.css";
import 'element-ui/lib/theme-chalk/index.css';
import { Icon, Checkbox, Switch } from 'element-ui';
Vue.use(Icon)
Vue.use(Checkbox)
Vue.use(Switch)

new Vue({
  el: '#app',
  render: h => h(App)
})