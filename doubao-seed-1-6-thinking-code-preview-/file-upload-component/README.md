# 文件上传组件

一个基于 React 的现代化文件上传组件，支持拖拽上传、实时预览、文件验证等功能。

## 功能特性

### 核心功能

1. **拖放上传**：支持将文件拖拽到上传区域完成选择
2. **点击选择**：支持通过点击上传区域打开文件选择器
3. **本地预览**：文件选择后立即显示本地预览缩略图
4. **文件验证**：自动验证文件类型和尺寸
5. **文件移除**：支持移除已选择的文件并重置状态

### 边缘情况处理

1. **非图片文件检测**：如果选择非图片文件（.txt, .mp3 等），显示红色警告提示
2. **图片尺寸验证**：如果图片宽度或高度小于 100 像素，显示黄色警告提示
3. **文件清理**：组件卸载时自动清理预览 URL 对象，避免内存泄漏

## 技术实现

### 技术栈

- React 18 + TypeScript
- 原生 HTML5 File API
- 原生 HTML5 Drag and Drop API

### 主要实现细节

1. **拖放区域实现**：
   - 使用 `onDragOver`, `onDragLeave`, `onDrop` 事件处理拖放逻辑
   - 拖入时提供视觉反馈（边框变色、背景色变化）

2. **文件验证机制**：
   - **格式验证**：通过 `file.type` 检查文件格式
   - **尺寸验证**：创建 `Image` 对象，监听 `onload` 事件获取图片尺寸

3. **预览功能实现**：
   - 使用 `URL.createObjectURL(file)` 创建本地预览 URL
   - 组件卸载时使用 `URL.revokeObjectURL(previewUrl)` 清理内存

## 组件 API

### Props

```typescript
interface FileUploadProps {
  onFileSelect?: (file: File | null) => void;
  acceptedFormats?: string[];
  minWidth?: number;
  minHeight?: number;
}
```

| 属性名 | 类型 | 默认值 | 描述 |
|--------|------|--------|------|
| `onFileSelect` | `(file: File \| null) => void` | `undefined` | 文件选择变化时的回调函数 |
| `acceptedFormats` | `string[]` | `['image/jpeg', 'image/png']` | 支持的文件格式数组 |
| `minWidth` | `number` | `100` | 图片最小宽度（像素） |
| `minHeight` | `number` | `100` | 图片最小高度（像素） |

### 使用示例

```typescript
import FileUpload from './components/FileUpload';

function App() {
  const handleFileSelect = (file: File | null) => {
    console.log('Selected file:', file);
  };

  return (
    <div>
      <FileUpload
        onFileSelect={handleFileSelect}
        acceptedFormats={['image/jpeg', 'image/png']}
        minWidth={100}
        minHeight={100}
      />
    </div>
  );
}
```

## 项目结构

```
file-upload-component/
├─ src/
│  ├─ components/
│  │  └─ FileUpload.tsx     # 主要文件上传组件
│  ├─ App.tsx                 # 应用主组件
│  └─ index.tsx               # 应用入口文件
├─ public/
│  └─ index.html              # HTML 模板文件
├─ package.json                # 项目依赖配置
├─ tsconfig.json               # TypeScript 配置
└─ README.md                   # 项目文档
```

## 运行项目

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm start
```

应用将在 `http://localhost:3000` 启动（如果端口被占用，会自动选择其他端口）。

### 构建生产版本

```bash
npm run build
```

构建完成后，生产版本文件将输出到 `build` 目录。

## 浏览器兼容性

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

支持所有现代浏览器，需要支持 ES6+ 和 HTML5 API。

## 未来优化方向

1. **多文件上传**：支持同时上传多个文件
2. **文件大小限制**：添加文件大小限制功能
3. **图片压缩**：在客户端对图片进行压缩
4. **上传进度显示**：模拟或实际显示文件上传进度
5. **主题定制**：支持自定义组件颜色和样式
6. **测试覆盖**：添加单元测试和集成测试
