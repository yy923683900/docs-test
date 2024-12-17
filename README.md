# maptalks web site

## 目录结构说明

### 项目根目录

- env.ts 环境变量，如 github 配置相关变量

### .vitepress 目录

- config 目录下，是文档目录以及路由的配置，新增文档

### src 目录

- examples，示例页面相关的组件源代码，这个一般情况下无需关心
- guide，文档目录，对于文档的修改，请在该目录下进行
- public，资源目录，存放项目或文档中使用的资源，外部库等

## 添加文档的步骤

### 添加中文文档

- 在 guide/目录下合适的位置创建 md
- 修改.vitepress/config/zh.ts 中 sidebarGuide 方法，增加一个 sidebar item
  - sidebar item 的 link 应指向 md，例如`guide/path/to/foo.md`，link 写为`'path/to/foo'`（无扩展名）
- 完成后提交文档并创建 pr

### 添加中文文档

- 在 en/guide/目录下创建 md
- 修改.vitepress/config/en.ts 中 sidebarGuide 方法，增加一个 sidebar item
  - sidebar item 的 link 指向 md，例如`en/guide/path/to/foo.md`，link 写为`'path/to/foo'`
- 完成后提交文档并创建 pr

## 添加示例的步骤

> vitepress 的资源文件必须放在 public 目录下

## 添加中文示例

假设示例的路径为 foo

- 在 examples/src 目录下新建 foo 目录
- 在 examples/src/foo 目录下新建 description.md，编写示例文档
- 在 public/examples/下新建 foo 目录
- 在 public/examples/foo 下新建 index.html，写入示例程序

## 添加英文示例

假设示
例的路径为 foo

- 在 en/examples/src 目录下新建 foo 目录
- 在 en/examples/src/foo 目录下新建 description.md，编写示例文档
- 在 public/en/examples/下新建 foo 目录
- 在 public/en/examples/foo 下新建 index.html，写入示例程序
