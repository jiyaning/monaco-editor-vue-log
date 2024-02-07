/*
 * @Description:
 * @Version:
 * @Author: ji.yaning
 * @Date: 2024-02-07 10:37:22
 * @LastEditors: ji.yaning
 * @LastEditTime: 2024-02-07 14:29:24
 */
import MonacoEditorVue2Log from './index.vue'

const components = [
  MonacoEditorVue2Log
];

const install = (App) => {
  components.forEach((component) => {
    // 实际代码中使用的组件名
    App.component('MonacoEditorVue2Log', component);
  })
}
用于后面app.use调用
export default { install }


// const install = (Vue) => {
//   // 注册组件
//   Vue.component(MonacoEditorVue2Log.name, MonacoEditorVue2Log);
// };

// // 默认导出组件
// export default install;