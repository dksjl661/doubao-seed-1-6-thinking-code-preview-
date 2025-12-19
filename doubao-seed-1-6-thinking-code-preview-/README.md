# 最小化 Agent 实现

这是一个用 Python 编写的最小化 Agent 实现示例，展示了人工智能系统的核心概念：感知-思考-行动循环。

## 什么是 Agent？

Agent 是能够：
1. **感知**(Perceive)环境信息的实体
2. **思考**(Think)分析这些信息并做出决策
3. **行动**(Act)以影响环境

## 项目结构

```
.
├── minimal_agent.py    # 主要 Agent 实现
├── test_agent.py       # 测试脚本
└── README.md           # 项目说明
```

## 核心类

### 1. MinimalAgent 类 (/Users/zifeizhou/code/doubao-seed-1-6-thinking-code-preview-/minimal_agent.py:13)
主要的智能体类，实现了完整的感知-思考-行动循环。

**关键方法：**
- `__init__`: 初始化 Agent 实例
- `perceive()`: 获取环境信息
- `think(perception)`: 分析信息并决策
- `act(action)`: 执行行动
- `run()`: 启动主循环

### 2. SimpleEnvironment 类 (/Users/zifeizhou/code/doubao-seed-1-6-thinking-code-preview-/minimal_agent.py:90)
简单的环境模拟器，用于演示 Agent 与其交互。

**关键方法：**
- `get_state()`: 获取当前环境状态
- `receive_action(agent_name, action)`: 接收并处理 Agent 的行动

## 使用方法

### 1. 基本运行
```bash
python3 minimal_agent.py
```

### 2. 运行测试
```bash
python3 test_agent.py
```

## 扩展和自定义

你可以根据需要扩展这个最小化 Agent：

1. **复杂的思考逻辑**：
   - 添加机器学习模型
   - 实现更复杂的规则引擎
   - 加入计划和规划能力

2. **真实环境交互**：
   - 连接到物理传感器
   - 集成 API 调用
   - 与外部系统通信

3. **多 Agent 系统**：
   - 创建多个 Agent 实例
   - 实现 Agent 间的通信
   - 研究群体智能

## 示例扩展

尝试修改 `MinimalAgent.think()` 方法来添加新的规则或行为模式，例如：
- 添加湿度控制
- 实现节能模式
- 添加用户偏好学习

## 总结

这个最小化 Agent 实现展示了智能系统的核心架构。虽然简单，但它提供了一个清晰的起点，可以扩展为更复杂的人工智能系统。
