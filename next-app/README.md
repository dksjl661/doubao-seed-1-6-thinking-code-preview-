# 文件上传系统 - Next.js 版本

## 功能特性

- 📁 支持多文件上传
- 🖼️ 图片和PDF文件在线预览
- ⬇️ 文件下载功能
- 🗑️ 文件删除和清空
- 📊 上传进度显示
- 📱 响应式设计，支持移动端
- 🎨 统一的按钮尺寸和美观的界面

## 技术栈

- **前端**: Next.js 14 + TypeScript + React
- **后端**: Node.js + Express + Multer
- **样式**: CSS-in-JS (Next.js built-in)
- **HTTP客户端**: Axios

## 安装和运行

### 1. 安装依赖

```bash
cd next-app
npm install
```

### 2. 启动后端服务

确保后端服务器已经在运行（端口 10315）：

```bash
cd ../server
npm install
npm start
```

### 3. 启动前端开发服务器

```bash
cd next-app
npm run dev
```

应用将在 http://localhost:10316 运行

### 4. 构建生产版本

```bash
npm run build
npm start
```

## 项目结构

```
next-app/
├── src/
│   ├── components/          # React组件
│   │   ├── FileOperations.tsx    # 文件操作组件
│   │   ├── FilePreview.tsx       # 文件预览组件
│   │   └── MessageToast.tsx      # 消息提示组件
│   ├── pages/              # Next.js页面
│   │   ├── _app.tsx        # App入口
│   │   ├── _document.tsx   # 文档模板
│   │   └── index.tsx       # 主页面
│   ├── styles/             # 全局样式
│   │   └── globals.css     # 全局CSS
│   └── types/              # TypeScript类型定义
│       └── index.ts        # 类型定义
├── next.config.js          # Next.js配置
├── tsconfig.json           # TypeScript配置
└── package.json            # 项目依赖
```

## 功能说明

### 文件上传
- 支持同时选择多个文件
- 文件大小限制：10MB
- 支持的文件类型：JPEG, PNG, GIF, PDF

### 文件预览
- 图片文件：直接在浏览器中显示
- PDF文件：使用浏览器内置PDF阅读器
- 其他文件：显示文件信息并提供下载

### 响应式设计
- 桌面端：按钮水平排列，文件信息和操作按钮并排显示
- 移动端：按钮垂直排列，文件信息和操作按钮垂直显示，避免遮挡

### 统一按钮尺寸
- 所有按钮有统一的高度、内边距和对齐方式
- 主按钮：最小宽度100px，高度36px
- 小按钮：最小宽度80px，高度36px
- 移除按钮：最小宽度40px，高度36px

## API配置

前端通过环境变量 `NEXT_PUBLIC_API_URL` 配置后端API地址，默认值为：
`http://localhost:10315/api`

## 与Vue版本的区别

1. **框架**: Vue 3 → Next.js 14
2. **语言**: JavaScript → TypeScript
3. **样式**: Vue SFC scoped style → CSS-in-JS
4. **路由**: Vue Router → Next.js 文件系统路由
5. **构建工具**: Vite → Next.js 内置构建工具

## 许可证

MIT