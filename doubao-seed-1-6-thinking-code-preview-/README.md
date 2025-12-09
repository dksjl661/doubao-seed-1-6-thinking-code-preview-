# Next.js Homepage Clone

一个基于纯 HTML、CSS 和 JavaScript 复刻的 Next.js 官方网站主页。

## 项目特点

### 🎨 视觉设计
- **现代化界面**：采用 Next.js 官方网站的设计风格
- **响应式布局**：完美适配桌面、平板和移动设备
- **深色主题**：黑色背景配合白色文字，营造专业感
- **几何装饰**：网格线和圆形元素增加视觉层次感

### ✨ 交互功能
- **移动菜单**：点击汉堡图标展开/收起导航菜单
- **搜索快捷键**：支持 Cmd/Ctrl + K 快速聚焦搜索框
- **按钮动画**：所有按钮都有平滑的悬停效果和点击反馈
- **视差滚动**：背景圆形元素随页面滚动产生视差效果
- **渐入动画**：页面元素按照顺序渐入显示
- **键盘导航**：支持键盘 Tab 键导航和 Enter/Space 键操作

### 🔧 技术实现
- **纯前端技术栈**：HTML5 + CSS3 + JavaScript ES6+
- **无框架依赖**：不使用任何前端框架或库
- **模块化结构**：清晰的文件结构和代码组织
- **性能优化**：使用 CSS 变量、Flexbox/Grid 布局、Intersection Observer 等现代技术
- **无障碍支持**：良好的语义化 HTML 结构和键盘交互支持

## 文件结构

```
.
├── nextjs-homepage.html    # 主 HTML 文件
├── nextjs-homepage.css     # 样式文件
├── nextjs-homepage.js      # JavaScript 交互逻辑
└── README.md                 # 项目说明文档
```

## 快速开始

### 1. 克隆或下载项目文件
将所有项目文件下载到本地目录。

### 2. 启动本地服务器
由于使用了外部 CSS 和 JavaScript 文件，建议使用本地服务器来运行项目。

**方法一：使用 Python**
```bash
# Python 3
python3 -m http.server 3000

# Python 2
python -m SimpleHTTPServer 3000
```

**方法二：使用 Node.js (http-server)**
```bash
# 安装 http-server（如果未安装）
npm install -g http-server

# 启动服务器
http-server -p 3000
```

**方法三：使用 VS Code Live Server 扩展**
在 VS Code 中安装 Live Server 扩展，然后右键点击 HTML 文件选择 "Open with Live Server"。

### 3. 访问页面
在浏览器中访问：http://localhost:3000/nextjs-homepage.html

## 功能说明

### 导航栏
- **Logo**：Next.js 标志，点击无实际功能（可自行添加链接）
- **导航菜单**：包含 Showcase、Docs、Blog、Templates、Enterprise 等链接
- **搜索框**：支持 Cmd/Ctrl + K 快捷聚焦
- **部署按钮**：Deploy 按钮，点击无实际功能（可自行添加链接）
- **学习按钮**：Learn 按钮，点击无实际功能（可自行添加链接）
- **移动菜单**：汉堡图标，点击展开/收起导航菜单（仅移动端显示）

### 安全提示横幅
- 显示重要的安全公告
- 包含 "Find out more" 链接

### 英雄区域
- **主标题**："The React Framework for the Web"
- **副标题**：描述 Next.js 的用途和优势
- **行动按钮**：
  - Get Started：开始使用 Next.js
  - Learn Next.js：学习 Next.js
- **命令提示**：显示快速开始命令 "npx create-next-app@latest"

## 浏览器兼容性

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 自定义修改

### 修改颜色方案
在 `nextjs-homepage.css` 中修改 CSS 变量：

```css
:root {
    --primary-color: #fff;
    --secondary-color: rgba(255, 255, 255, 0.8);
    --background-color: #000;
    /* 更多颜色变量... */
}
```

### 修改导航链接
在 `nextjs-homepage.html` 中修改 `<ul class="nav-menu">` 中的链接。

### 修改按钮链接
在 `nextjs-homepage.html` 中修改 `.hero-buttons` 中的按钮链接。

### 添加新功能
在 `nextjs-homepage.js` 中添加新的 JavaScript 交互逻辑。

## 性能优化建议

1. **图片优化**：如果添加图片，建议使用 WebP 格式并进行压缩
2. **代码分割**：对于大型项目，可以考虑将 JavaScript 代码分割成多个文件
3. **懒加载**：对于非首屏内容，可以考虑使用懒加载
4. **缓存策略**：在生产环境中，建议设置适当的缓存策略

## 许可证

MIT License

## 致谢

本项目参考了 Next.js 官方网站的设计和布局。

---

**注意**：这是一个学习和演示项目，非 Next.js 官方网站。所有链接和功能可能需要根据实际需求进行调整。