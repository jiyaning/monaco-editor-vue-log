# monaco-editor-vue2-log

安装：

```bash
npm install monaco-editor-vue2-log
```

用法：

```html
 <MonacoEditorVue2Log
      :title="title"
      :value="value"
      :readOnly="readOnly"
      @editorValue="getEdtiorValue"
      ref="editor"
  ></MonacoEditorVue2Log>
```

传参：

| 参数     | 描述                     | 备注        |
| -------- | ------------------------ | ----------- |
| title    | 标题                     | 默认为空    |
| value    | 日志的内容               | 默认为空    |
| readOnly | 日志是否只读（不可编辑） | 默认为false |

获取编辑器的值：

```js
mounted () {
  	this.$refs['editor'].getValue()
},
```

示例代码：

1. 在main.js文件中引入并注册MonacoEditorVue2Log

```js
import "monaco-editor-vue2-log/style.css";
import MonacoEditorVue2Log  from "monaco-editor-vue2-log"
Vue.use(MonacoEditorVue2Log)
```

2. 在组件中应用MonacoEditorVue2Log

```js
<template>
  <div>
    <MonacoEditorVue2Log
      :title="title"
      :value="value"
      :readOnly="readOnly"
      @editorValue="getEdtiorValue"
      ref="editor"
    ></MonacoEditorVue2Log>
  </div>
</template>
<script>
export default {
  name: 'App',
  data () {
    return {
      title: '日志log',
      value: `"name": "monaco-editor-vue2-log",
"version": "1.0.2",
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
```

示例效果：

![示例](https://jiyaning.github.io/staticImgs/images/monaco-editor-vue2-log.png)

