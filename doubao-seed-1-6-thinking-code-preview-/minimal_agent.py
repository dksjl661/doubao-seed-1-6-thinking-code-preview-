#!/usr/bin/env python3
"""
最小化 Agent 实现示例
Agent 是人工智能系统中能够感知环境、思考并采取行动的实体
本实现展示了一个基础的 Agent 架构，包含核心组件和交互流程
"""

class MinimalAgent:
    """
    一个最小化的 Agent 类，包含基本的感知-思考-行动循环

    Agent 通过感知(Perceive)获取环境信息，通过思考(Think)处理信息，通过行动(Act)影响环境
    这是所有智能系统的核心架构模式
    """

    def __init__(self, name="MinimalAgent"):
        """
        初始化 Agent 实例

        参数:
            name (str): Agent 的名称，用于标识不同的 Agent
        """
        # Agent 的名称标识
        self.name = name
        # Agent 的内部状态，用于存储信息和记忆
        self.state = {}
        # 环境对象的引用，Agent 通过它与外部环境交互
        self.environment = None

    def perceive(self):
        """
        感知环境: 获取环境中的信息

        这是 Agent 从环境获取数据的入口点，相当于 Agent 的"感官"
        在实际应用中，这可能包括传感器数据、API 调用、用户输入等
        """
        if self.environment:
            # 从环境获取当前状态
            return self.environment.get_state()
        # 如果没有环境连接，返回空状态
        return None

    def think(self, perception):
        """
        思考处理: 分析感知到的信息并制定行动计划

        这是 Agent 的"大脑"，负责处理信息、做出决策
        可以包含规则引擎、机器学习模型、决策树等

        参数:
            perception: 从环境感知到的信息

        返回:
            action: 决定采取的行动
        """
        # 简单的思考逻辑示例: 根据感知到的信息做出决策
        if perception is None:
            return "idle"  # 如果没有感知信息，保持空闲

        # 示例规则: 根据环境状态决定行动
        if "temperature" in perception:
            temp = perception["temperature"]
            if temp > 30:
                return "turn_on_ac"  # 如果温度过高，打开空调
            elif temp < 10:
                return "turn_on_heater"  # 如果温度过低，打开暖气

        # 默认行动: 保持观察
        return "observe"

    def act(self, action):
        """
        执行行动: 将决策转化为对环境的影响

        这是 Agent 的"执行器"，负责将决策转化为实际行动
        在实际应用中，这可能包括控制硬件、发送 API 请求、输出结果等

        参数:
            action: 要执行的行动指令
        """
        if self.environment:
            # 将行动应用到环境
            self.environment.receive_action(self.name, action)

        # 更新 Agent 的内部状态，记录执行的行动
        self.state["last_action"] = action
        self.state["last_action_time"] = "just now"  # 在实际应用中可以使用真实时间戳

        # 返回行动执行结果
        return f"Action '{action}' executed by {self.name}"

    def run(self):
        """
        运行 Agent: 启动感知-思考-行动循环

        这是 Agent 的主循环，持续不断地感知环境、思考决策并采取行动
        """
        print(f"{self.name} starting main loop...")

        # 简单的循环示例（实际应用中可以是事件驱动或持续运行）
        for _ in range(5):  # 运行 5 次循环作为示例
            # 1. 感知环境
            perception = self.perceive()
            print(f"{self.name} perceived: {perception}")

            # 2. 思考处理
            action = self.think(perception)
            print(f"{self.name} decided to: {action}")

            # 3. 执行行动
            result = self.act(action)
            print(f"{self.name} action result: {result}")

            print()  # 空行用于分隔每次循环


class SimpleEnvironment:
    """
    一个简单的环境类，用于演示 Agent 与其交互

    环境是 Agent 所处的外部系统，提供信息并接收 Agent 的行动
    """

    def __init__(self):
        """初始化环境状态"""
        self.current_state = {
            "temperature": 25,  # 当前温度
            "humidity": 60      # 当前湿度
        }

    def get_state(self):
        """
        获取当前环境状态

        返回:
            dict: 环境状态的键值对
        """
        return self.current_state

    def receive_action(self, agent_name, action):
        """
        接收 Agent 的行动并更新环境

        参数:
            agent_name (str): 执行行动的 Agent 名称
            action (str): Agent 执行的行动
        """
        # 根据 Agent 的行动更新环境状态
        if action == "turn_on_ac":
            self.current_state["temperature"] -= 2
            print(f"Environment: AC turned on by {agent_name}, temperature decreased to {self.current_state['temperature']}")
        elif action == "turn_on_heater":
            self.current_state["temperature"] += 2
            print(f"Environment: Heater turned on by {agent_name}, temperature increased to {self.current_state['temperature']}")
        elif action == "observe":
            print(f"Environment: {agent_name} is observing")


if __name__ == "__main__":
    """
    主程序入口: 创建 Agent 和环境实例并演示交互
    """
    # 创建环境
    env = SimpleEnvironment()

    # 创建 Agent 并连接到环境
    agent = MinimalAgent(name="MyFirstAgent")
    agent.environment = env

    # 运行 Agent
    agent.run()

    print("Agent demonstration completed!")
