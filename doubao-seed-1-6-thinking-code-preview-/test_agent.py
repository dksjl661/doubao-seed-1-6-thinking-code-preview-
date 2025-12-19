#!/usr/bin/env python3
"""
Agent 测试脚本: 展示不同环境条件下的 Agent 行为
"""

# 导入我们的 Agent 和环境类
from minimal_agent import MinimalAgent, SimpleEnvironment


def test_temperature_control():
    """
    测试 Agent 的温度控制功能
    模拟不同温度条件下 Agent 的反应
    """
    print("=== Testing Temperature Control Agent ===")
    print()

    # 创建环境和 Agent
    env = SimpleEnvironment()
    agent = MinimalAgent(name="TempControlAgent")
    agent.environment = env

    # 测试 1: 高温环境
    print("Test 1: High Temperature Environment")
    env.current_state["temperature"] = 35  # 设置高温
    perception = agent.perceive()
    print(f"Perceived temperature: {perception['temperature']}°C")
    action = agent.think(perception)
    print(f"Agent action: {action}")
    agent.act(action)
    print()

    # 测试 2: 低温环境
    print("Test 2: Low Temperature Environment")
    env.current_state["temperature"] = 5  # 设置低温
    perception = agent.perceive()
    print(f"Perceived temperature: {perception['temperature']}°C")
    action = agent.think(perception)
    print(f"Agent action: {action}")
    agent.act(action)
    print()

    # 测试 3: 舒适温度环境
    print("Test 3: Comfortable Temperature Environment")
    env.current_state["temperature"] = 22  # 设置舒适温度
    perception = agent.perceive()
    print(f"Perceived temperature: {perception['temperature']}°C")
    action = agent.think(perception)
    print(f"Agent action: {action}")
    agent.act(action)

    print("\n=== Temperature Control Test Complete ===")


def test_agent_memory():
    """
    测试 Agent 的内存功能
    展示 Agent 如何记住之前的行动
    """
    print("\n=== Testing Agent Memory ===")

    agent = MinimalAgent(name="MemoryAgent")
    print(f"Initial state: {agent.state}")

    # 执行一个行动
    result = agent.act("test_action")
    print(f"Action result: {result}")
    print(f"State after action: {agent.state}")

    print("=== Agent Memory Test Complete ===")


if __name__ == "__main__":
    """
    主测试入口
    """
    test_temperature_control()
    print("\n" + "=" * 50 + "\n")
    test_agent_memory()
    print("\nAll tests completed successfully!")
