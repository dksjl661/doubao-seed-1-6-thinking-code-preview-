# 导入 FastAPI 框架的核心类：FastAPI 用于创建应用实例，HTTPException 用于抛出 HTTP 异常
from fastapi import FastAPI, HTTPException

# 导入 Pydantic 的 BaseModel，用于定义请求/响应的数据模型和验证
from pydantic import BaseModel

# 导入 Python 标准库的 URL 解析工具：urlparse 用于解析 URL，parse_qsl 用于解析查询字符串
from urllib.parse import urlparse, parse_qsl

# 创建 FastAPI 应用实例，设置应用标题和版本号
# title: 应用的标题，会显示在 API 文档中
# version: 应用的版本号
app = FastAPI(title="URL Query Parameter Parser", version="1.0.0")

# 定义请求数据模型类，继承自 Pydantic 的 BaseModel
# 这个类用于验证和解析客户端发送的 JSON 请求体
class URLRequest(BaseModel):
    url: str  # 定义一个必填的字符串字段，用于接收要解析的 URL

# 定义 POST 请求的路由装饰器
# "/api/parse" 是 API 端点路径
# async 关键字表示这是一个异步函数，可以处理并发请求
@app.post("/api/parse")
async def parse_url(request: URLRequest):
    # 使用 try-except 块捕获可能的异常
    try:
        # 使用 urlparse 函数解析传入的 URL 字符串
        # 返回一个 ParseResult 对象，包含 scheme, netloc, path, params, query, fragment 等属性
        parsed_url = urlparse(request.url)

        # 验证 URL 格式是否有效
        # all() 函数检查所有条件是否都为 True
        # parsed_url.scheme: URL 的协议部分（如 http, https）
        # parsed_url.netloc: URL 的网络位置部分（如 www.example.com）
        # 如果缺少协议或域名，则 URL 格式无效
        if not all([parsed_url.scheme, parsed_url.netloc]):
            # 抛出值错误异常，表示 URL 格式无效
            raise ValueError("Invalid URL format")

        # 使用 parse_qsl 解析 URL 的查询字符串部分
        # parsed_url.query: URL 中 ? 后面的查询参数字符串（如 "key1=value1&key2=value2"）
        # keep_blank_values=True: 保留空值参数（如 "key=" 会被解析为 ("key", "")）
        # 返回一个元组列表，每个元组包含 (参数名, 参数值)
        query_params = parse_qsl(parsed_url.query, keep_blank_values=True)

        # 初始化结果字典，用于存储处理后的查询参数
        result = {}
        
        # 遍历解析后的查询参数列表
        for key, value in query_params:
            # 检查当前参数名是否已经在结果字典中存在
            if key in result:
                # 如果参数已存在，需要处理重复参数的情况
                # 检查当前值是否为列表类型
                if not isinstance(result[key], list):
                    # 如果不是列表，将单个值转换为列表（包含原来的值）
                    result[key] = [result[key]]
                # 将新的值追加到列表中
                result[key].append(value)
            else:
                # 如果参数不存在，直接将其添加到结果字典中
                result[key] = value

        # 返回处理后的查询参数字典
        return result

    # 捕获 ValueError 异常（如 URL 格式无效）
    except ValueError as e:
        # 抛出 HTTP 400 错误（Bad Request），并返回错误详情
        # status_code: HTTP 状态码
        # detail: 错误详情信息
        raise HTTPException(status_code=400, detail=str(e))
    
    # 捕获所有其他类型的异常
    except Exception as e:
        # 抛出 HTTP 400 错误，使用通用的错误消息
        # 这里不直接返回异常信息，避免泄露内部错误细节
        raise HTTPException(status_code=400, detail="Failed to parse URL")

# Python 的标准入口点检查
# 当直接运行此脚本时（而不是作为模块导入），执行以下代码
if __name__ == "__main__":
    # 导入 uvicorn ASGI 服务器，用于运行 FastAPI 应用
    import uvicorn
    
    # 使用 uvicorn 启动 FastAPI 应用
    # app: 要运行的 FastAPI 应用实例
    # host="0.0.0.0": 监听所有网络接口，允许外部访问
    # port=8000: 服务器监听的端口号
    uvicorn.run(app, host="0.0.0.0", port=8000)
