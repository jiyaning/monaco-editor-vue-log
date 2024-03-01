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
      :keywordsStyle="keywordsStyle"
      :scrollToBottomVisible="scrollToBottomVisible"
      @editorValue="getEdtiorValue"
      ref="editor"
  ></MonacoEditorVue2Log>
```

属性：

| 属性                  | 描述                                   | 默认值              |
| --------------------- | -------------------------------------- | ------------------- |
| title                 | 标题                                   | 默认为空            |
| value                 | 日志的内容                             | 默认为空            |
| readOnly              | 日志是否只读（不可编辑），为true时只读 | 默认为false，可编辑 |
| keywordsStyle         | 关键字自定义样式、颜色                 | 默认为空数组[]      |
| scrollToBottomVisible | 是否滚动到日志内容的最后一行           | 默认为false         |

事件：

| 事件        | 描述           |
| ----------- | -------------- |
| editorValue | 获取编辑器的值 |

获取编辑器的值：

```js
this.$refs['editor'].getValue()
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
export default {
  name: 'App',
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
      keywordsStyle:[
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
.container{
  height: 400px;
}
</style>
```

示例效果：

支持关键字搜索、关键字自定义样式颜色：

![示例](https://jiyaning.github.io/staticImgs/images/monaco-editor-vue2-log.png)

支持是否显示行号、换行、缩略图，支持全屏显示，支持滚动到日志内容的最后一行：

![示例](https://jiyaning.github.io/staticImgs/images/monaco-editor-vue2-log1.png)

