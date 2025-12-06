# GPT-4 Chatbot

一个基于 Express 和 OpenAI GPT-4 API 的聊天机器人应用。

## 功能特性

- 🤖 基于 GPT-4 的智能对话
- 🎨 现代化的聊天界面
- ⚡ 实时消息发送和接收
- 💬 支持多轮对话上下文
- 📱 响应式设计，支持移动端

## 技术栈

- **后端**: Express.js
- **前端**: 原生 HTML/CSS/JavaScript
- **AI 模型**: OpenAI GPT-4
- **其他**: dotenv, cors

## 安装和运行

### 1. 克隆或下载项目

### 2. 安装依赖

```bash
npm install
```

### 3. 配置环境变量

在项目根目录创建 `.env` 文件，并添加以下内容：

```env
OPENAI_API_KEY=your_openai_api_key_here
PORT=3000
```

将 `your_openai_api_key_here` 替换为你的 OpenAI API 密钥。

### 4. 启动服务器

```bash
npm start
```

服务器将在 `http://localhost:3000` 启动。

### 5. 使用聊天机器人

打开浏览器访问 `http://localhost:3000`，即可开始与 GPT-4 聊天机器人对话。

## API 端点

### POST /api/chat

发送聊天消息并获取 GPT-4 的响应。

请求体：

```json
{
  "messages": [
    { "role": "system", "content": "You are a helpful assistant." },
    { "role": "user", "content": "Hello!" }
  ]
}
```

响应：

```json
{
  "message": {
    "role": "assistant",
    "content": "Hello! How can I help you today?"
  }
}
```

## 项目结构

```
chatbot-gpt4/
├── public/
│   └── index.html          # 前端聊天界面
├── .env                     # 环境变量配置
├── server.js                # Express 服务器
├── package.json             # 项目依赖
└── README.md                # 项目文档
```

## 注意事项

1. 确保你有有效的 OpenAI API 密钥，并且已经开通了 GPT-4 的访问权限。
2. API 调用会产生费用，请合理使用。
3. 建议在生产环境中使用环境变量来存储敏感信息，如 API 密钥。
4. 本项目仅用于学习和演示目的，请遵守 OpenAI 的使用条款。

## 许可证

ISC