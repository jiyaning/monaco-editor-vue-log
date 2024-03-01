# monaco-editor-vue2-log

[monaco-editor官网](https://microsoft.github.io/monaco-editor/)

## 开发构建

克隆项目：

```
https://github.com/jiyaning/monaco-editor-vue-log.git
```

进入目录安装依赖：

```bash
pnpm install
```

开发：

```bash
pnpm run dev
```

打包：

```bash
pnpm run build
```

## 发布npm包

1. 设置npm官方镜像源

```bash
npm config set registry https://registry.npmjs.org/
```

2. cd 进入dist目录，执行 `npm login`，根据提示按回车进入浏览器登录账号

3. 登录成功后回到终端，执行`npm publish`

## 效果展示

支持关键字搜索：

![示例](https://jiyaning.github.io/staticImgs/images/monaco-editor-vue2-log.png)

支持是否显示行号、换行、缩略图，支持全屏显示：

![示例](https://jiyaning.github.io/staticImgs/images/monaco-editor-vue2-log1.png)