<!--
 * @Description:
 * @Version:
 * @Author: ji.yaning
 * @Date: 2024-02-06 17:38:50
 * @LastEditors: ji.yaning
 * @LastEditTime: 2024-02-28 15:28:58
-->
<template>
  <div class="view-log-wrap" id="view-log">
    <div class="view-log-head">
      <span class="view-log-title">{{ title }}</span>
      <span class="view-log-icon">
        <i
          v-if="!fullScreenVisible"
          class="iconfont icon-quanping"
          title="全屏"
          @click="fullScreen"
        ></i>
        <i
          v-if="fullScreenVisible"
          class="iconfont icon-tuichuquanping"
          title="退出全屏"
          @click="cancleFullScreen"
        ></i>
      </span>
      <span class="view-log-icon">
        <i class="el-icon-search" title="搜索Ctrl+F" @click="findKeyWorld"></i>
      </span>
      <span class="view-log-icon">
        <!-- <i class="el-icon-refresh-right" title="刷新"></i> -->
        <i
          class="iconfont icon-edit-setting-outlined-operation"
          title="设置"
          @click="configVisible = !configVisible"
        ></i>
      </span>
      <div class="view-log-config" v-if="configVisible">
        <el-switch v-model="lineNumberVisible" active-text="行号"> </el-switch>
        <el-switch v-model="wordWrapVisible" active-text="换行"> </el-switch>
        <el-switch v-model="options.minimap.enabled" active-text="缩略图">
        </el-switch>
      </div>
    </div>
    <div
      ref="monaco"
      :class="[
        'view-log-body',
        { 'screen-height': !fullScreenVisible },
        { 'full-screen-height': fullScreenVisible },
      ]"
      @click="configVisible = false"
    ></div>
  </div>
</template>


<script>
import 'monaco-editor/esm/vs/editor/contrib/find/browser/findController.js';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api.js';

const legend = {
  tokenTypes: [
    "WARN",
    'WARNING',
    'INFO',
    // 'success'
  ]
};

/** @type {(type: string)=>number} */
function getType (type) {
  return legend.tokenTypes.indexOf(type);
}

/** @type {(modifier: string[]|string|null)=>number} */
function getModifier (modifiers) {
  if (typeof modifiers === 'string') {
    modifiers = [modifiers];
  }
}

const tokenPattern = new RegExp('([a-zA-Z]+)((?:\\.[a-zA-Z]+)*)', 'g');

monaco.languages.registerDocumentSemanticTokensProvider('plaintext', {
  getLegend: function () {
    return legend;
  },
  provideDocumentSemanticTokens: function (model, lastResultId, token) {
    const lines = model.getLinesContent();

    /** @type {number[]} */
    const data = [];

    let prevLine = 0;
    let prevChar = 0;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      for (let match = null; (match = tokenPattern.exec(line));) {
        // translate token and modifiers to number representations
        let type = getType(match[1]);
        if (type === -1) {
          continue;
        }
        let modifier = match[2].length ? getModifier(match[2].split('.').slice(1)) : 0;

        data.push(
          // translate line to deltaLine
          i - prevLine,
          // for the same line, translate start to deltaStart
          prevLine === i ? match.index - prevChar : match.index,
          match[0].length,
          type,
          modifier
        );

        prevLine = i;
        prevChar = match.index;
      }
    }
    return {
      data: new Uint32Array(data),
      resultId: null
    };
  },
  releaseDocumentSemanticTokens: function (resultId) { }
});

monaco.editor.defineTheme('myCustomTheme', {
  base: 'vs-dark',
  inherit: true,
  colors: {},
  rules: [
    { token: 'WARN', foreground: '#E5E510', fontStyle: 'bold' },
    { token: 'WARNING', foreground: '#EEEE00' },
    { token: 'INFO', foreground: '#3CB371', fontStyle: 'bold' },
    // { token: 'success', foreground: '#00EE76' }
  ]
});

export default {
  name: 'MonacoEditorVue2Log',
  props: {
    title: {
      type: String,
      default: ""
    },
    value: {
      type: String,
      default: ""
    },
    readOnly: {
      type: Boolean,
      default: false
    }
  },
  created () {
    this.currentValue = this.value
  },
  mounted () {
    // 编辑器实例化
    this.monacoInstance = monaco.editor.create(this.$refs.monaco, {
      ...this.options
    })
    // console.log(this.monacoInstance.getActions())
    this.model = this.monacoInstance.getModel()
    // console.log(this.model)
  },
  destroyed () {
    this.monacoInstance.dispose();//使用完成销毁实例
  },
  data () {
    return {
      options: {
        // Monaco Editor Options
        // automaticLayout: true,
        // folding: true,
        value: this.value,
        language: "plaintext",
        theme: 'myCustomTheme',
        lineNumbers: 'on',
        wordWrap: 'off',
        readOnly: this.readOnly,  // 是否只读
        minimap: {
          enabled: false
        },
        'semanticHighlighting.enabled': true
      },
      diffEditor: false,
      fullScreenVisible: false,
      currentValue: "",
      lineNumberVisible: true,
      wordWrapVisible: false,
      configVisible: false,
      model: null,
      monacoInstance: null
    }
  },
  watch: {
    // 行号
    lineNumberVisible (news) {
      if (news) {
        this.options.lineNumbers = "on"
        this.monacoInstance.updateOptions({
          lineNumbers: "on"
        })
      } else {
        this.options.lineNumbers = "off"
        this.monacoInstance.updateOptions({
          lineNumbers: "off"
        })
      }
    },
    // 换行
    wordWrapVisible (news) {
      if (news) {
        this.options.wordWrap = "on"
        this.monacoInstance.updateOptions({
          wordWrap: "on"
        })
      } else {
        this.options.wordWrap = "off"
        this.monacoInstance.updateOptions({
          wordWrap: "off"
        })
      }
    },
    // 缩略图
    "options.minimap.enabled" (news) {
      this.monacoInstance.updateOptions({
        minimap: {
          enabled: news
        }
      })
    },
    // value
    value (news) {
      this.monacoInstance.setValue(news)
      setTimeout(this.scrollToBottom, 0)
    }
  },
  methods: {
    // 获取编辑器内容
    getValue () {
      this.currentValue = this.monacoInstance.getValue()
      this.$emit("editorValue", this.currentValue)
    },
    // 全屏
    fullScreen () {
      this.fullScreenVisible = true
      const element = document.getElementById('view-log');//指定全屏区域元素
      element.requestFullscreen()
      this.$nextTick(() => {
        this.monacoInstance.layout();
      })
      document.addEventListener("fullscreenchange", () => {
        if (document.fullscreenElement == null) {
          this.fullScreenVisible = false
          this.$nextTick(() => {
            this.monacoInstance.layout();
          })
        }
      })
    },
    // 取消全屏
    cancleFullScreen () {
      this.fullScreenVisible = false
      if (document.fullscreenElement !== null) {
        document.exitFullscreen();
        this.$nextTick(() => {
          this.monacoInstance.layout();
        })
      }
    },
    // 搜索关键字
    findKeyWorld () {
      // console.log(this.monacoInstance.getAction("actions.find"))
      this.monacoInstance.getAction("actions.find").run()
    },
    // 滚动到最后一行
    scrollToBottom () {
      if (!this.monacoInstance) { return }
      this.model && (this.monacoInstance.revealLine(this.model.getLineCount(), 'Smooth'))
    }
  }
}
</script>

<style lang='scss'>
.view-log-wrap {
  color: #fff;
  .view-log-head {
    height: 36px;
    line-height: 36px;
    background: #333333;
    border-radius: 4px 4px 0px 0px;
    .view-log-title {
      font-size: 14px;
      padding: 11px 0 11px 18px;
      box-sizing: border-box;
    }
    .view-log-icon {
      float: right;
      width: 36px;
      height: 36px;
      text-align: center;
    }
    .view-log-config {
      position: absolute;
      background-color: #000;
      right: 60px;
      z-index: 6;
      display: flex;
      flex-direction: column;
      padding: 10px;
      padding-bottom: 0;
      border-radius: 2px;
      .el-switch {
        margin-bottom: 10px;
        .el-switch__label {
          color: #fff;
        }
      }
      .el-switch.is-checked .el-switch__core {
        background: linear-gradient(59deg, #363840, #525e93) !important;
        border-color: #92979d !important;
      }
    }
  }
  .view-log-body {
    position: relative;
    font-size: 12px;
    background: #1e1e1e;
    border-radius: 0px 0px 4px 4px;
  }
  .screen-height {
    // height: 450px;
    height: 220px;
    width: calc(100% - 0px);
  }
  .full-screen-height {
    height: calc(100vh - 36px);
    width: 100vw;
  }
}
</style>
