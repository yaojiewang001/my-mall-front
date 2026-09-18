# 电商后台管理系统（前端）

基于 Vue 2 + Element UI 的电商后台管理系统前端，包含登录鉴权、用户管理、权限管理、商品管理、订单管理与数据报表等完整后台功能，配套后端服务见 [my-mall](https://github.com/yaojiewang001/my-mall)。

## 功能模块

- **登录鉴权**：登录页 + 路由导航守卫，基于 token（sessionStorage）实现访问控制
- **首页 / 欢迎页**：后台工作台
- **用户管理**：用户列表、启用/禁用、角色分配
- **权限管理**：权限列表（Rights）、角色列表（Roles）
- **商品管理**：商品分类（Cate）、分类参数（Params）、商品列表（List）、添加商品（Add）
- **订单管理**：订单列表与处理
- **数据报表**：基于 ECharts 的数据统计可视化（Report）

## 技术栈

- Vue 2 + Vue CLI 4
- Element UI（UI 组件库）
- ECharts（数据可视化报表）
- vue-router（前端路由 + 导航守卫）
- axios（HTTP 请求）
- vue-quill-editor（富文本编辑）、vue-table-with-tree-grid（树形表格）、nprogress（顶部加载进度条）

## 快速开始

```bash
# 安装依赖
npm install

# 开发模式
npm run serve

# 生产构建
npm run build
```

> 提示：本地开发需同时启动配套后端服务（my-mall）。

工程说明：`vue.config.js` 按环境区分开发/生产入口（`src/main-dev.js` / `src/main-prod.js`），生产模式通过 externals 将 Vue、Element UI、ECharts 等公共库指向 CDN 以减小打包体积。

## 目录结构

```
├── src/
│   ├── components/           # 页面组件
│   │   ├── login.vue         # 登录
│   │   ├── home.vue          # 主框架
│   │   ├── welcome.vue       # 欢迎页
│   │   ├── user/             # 用户管理
│   │   ├── power/            # 权限管理（Rights / Roles）
│   │   ├── goods/            # 商品管理（Cate / Params / List / Add）
│   │   ├── order/            # 订单管理
│   │   └── report/           # 数据报表
│   ├── router/               # 路由 + 导航守卫
│   └── plugins/              # 插件配置
└── vue.config.js             # 工程配置（双入口 + CDN externals）
```
