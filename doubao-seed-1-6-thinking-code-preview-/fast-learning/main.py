# 导入FastAPI模块和必要的组件
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional

# 创建FastAPI应用实例
# 这里的app是我们的FastAPI应用，后续的路由和配置都将基于这个实例
app = FastAPI(title="FastAPI学习Demo", version="1.0.0")

# ------------------------------
# 第一部分：基本路由和请求方法
# ------------------------------

# 定义根路由，使用GET请求方法
# 当访问 http://localhost:8000/ 时，将执行这个函数
@app.get("/")
def read_root():
    """
    根路由 - 返回欢迎信息
    """
    return {"message": "欢迎来到FastAPI学习Demo！", "tips": "访问 /docs 查看API文档"}

# 定义带路径参数的路由
# {item_id} 是路径参数，类型为int
@app.get("/items/{item_id}")
def read_item(item_id: int, q: Optional[str] = None):
    """
    获取单个物品信息
    - **item_id**: 物品的唯一标识符（必需）
    - **q**: 可选的查询参数，用于搜索或过滤
    """
    # 模拟返回物品信息
    item = {
        "item_id": item_id,
        "name": f"物品 {item_id}",
        "description": f"这是物品 {item_id} 的详细描述",
        "price": 99.99 + item_id * 10
    }

    # 如果提供了查询参数q，将其添加到返回结果中
    if q:
        item.update({"query": q})

    return item

# ------------------------------
# 第二部分：请求体和数据验证
# ------------------------------

# 使用Pydantic定义数据模型
# 这个模型将用于验证请求体的数据结构和类型
class Item(BaseModel):
    """
    物品数据模型
    定义了创建或更新物品时所需的字段
    """
    name: str  # 物品名称（必需，字符串类型）
    description: Optional[str] = None  # 物品描述（可选）
    price: float  # 物品价格（必需，浮点型）
    tax: Optional[float] = None  # 税费（可选）

# 定义POST请求路由，用于创建新物品
# 这里使用了Item模型来验证请求体
@app.post("/items/")
def create_item(item: Item):
    """
    创建新物品
    - **item**: 包含物品信息的请求体（使用Item模型验证）
    """
    # 计算包含税费的总价
    total_price = item.price
    if item.tax:
        total_price += item.tax

    # 返回创建的物品信息，包括计算后的总价
    return {
        "message": "物品创建成功",
        "item": {
            "name": item.name,
            "description": item.description,
            "price": item.price,
            "tax": item.tax,
            "total_price": total_price
        }
    }

# ------------------------------
# 第三部分：PUT请求和数据更新
# ------------------------------

# 定义PUT请求路由，用于更新现有物品
# 结合了路径参数和请求体
@app.put("/items/{item_id}")
def update_item(item_id: int, item: Item):
    """
    更新物品信息
    - **item_id**: 要更新的物品ID（必需）
    - **item**: 包含更新后物品信息的请求体（使用Item模型验证）
    """
    # 模拟更新物品信息
    # 在实际应用中，这里会连接数据库进行数据更新
    updated_item = {
        "item_id": item_id,
        "name": item.name,
        "description": item.description,
        "price": item.price,
        "tax": item.tax,
        "last_updated": "2025-10-01T10:00:00"  # 模拟更新时间
    }

    return {
        "message": f"物品 {item_id} 更新成功",
        "item": updated_item
    }

# ------------------------------
# 第四部分：DELETE请求和错误处理
# ------------------------------

# 模拟存储物品的数据库
fake_items_db = {
    1: {"name": "物品1", "description": "描述1", "price": 99.99},
    2: {"name": "物品2", "description": "描述2", "price": 199.99},
    3: {"name": "物品3", "description": "描述3", "price": 299.99},
}

# 定义DELETE请求路由，用于删除物品
@app.delete("/items/{item_id}")
def delete_item(item_id: int):
    """
    删除物品
    - **item_id**: 要删除的物品ID（必需）
    """
    # 检查物品是否存在
    if item_id not in fake_items_db:
        # 如果物品不存在，抛出HTTP 404错误
        raise HTTPException(status_code=404, detail="物品不存在")

    # 如果物品存在，删除它
    deleted_item = fake_items_db.pop(item_id)

    return {
        "message": f"物品 {item_id} 删除成功",
        "deleted_item": deleted_item
    }

# ------------------------------
# 第五部分：查询参数和路径参数结合
# ------------------------------

# 定义带路径参数和多个查询参数的路由
@app.get("/users/{user_id}/items/")
def read_user_items(
    user_id: int,
    q: Optional[str] = None,
    limit: int = 10,
    offset: int = 0
):
    """
    获取用户的物品列表
    - **user_id**: 用户ID（必需）
    - **q**: 可选的查询参数，用于搜索物品
    - **limit**: 返回结果的最大数量（默认10）
    - **offset**: 返回结果的起始位置（默认0）
    """
    # 模拟返回用户的物品列表
    # 在实际应用中，这里会根据用户ID从数据库中查询物品
    user_items = [
        {"item_id": 1, "name": "物品1", "owner_id": user_id},
        {"item_id": 2, "name": "物品2", "owner_id": user_id},
        {"item_id": 3, "name": "物品3", "owner_id": user_id},
    ]

    # 如果提供了查询参数q，过滤物品
    if q:
        user_items = [item for item in user_items if q.lower() in item["name"].lower()]

    # 应用limit和offset
    user_items = user_items[offset:offset+limit]

    return {
        "user_id": user_id,
        "query": q,
        "limit": limit,
        "offset": offset,
        "items": user_items
    }

# ------------------------------
# 第六部分：启动应用（仅在直接运行脚本时执行）
# ------------------------------

if __name__ == "__main__":
    # 导入uvicorn模块，用于运行FastAPI应用
    import uvicorn

    # 启动FastAPI应用
    # host="0.0.0.0" 表示允许来自任何主机的连接
    # port=8000 表示应用将在8000端口上运行
    # reload=True 表示在开发模式下自动重新加载应用（修改代码后无需手动重启）
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)

# ------------------------------
# 学习指南：
# ------------------------------
# 1. 安装依赖：
#    pip install fastapi uvicorn pydantic

# 2. 运行应用：
#    方式一：直接运行脚本
#    python main.py
#
#    方式二：使用uvicorn命令
#    uvicorn main:app --reload --port 8000

# 3. 访问API文档：
#    - Swagger UI: http://localhost:8000/docs
#    - ReDoc: http://localhost:8000/redoc

# 4. 测试API：
#    - 使用浏览器访问 http://localhost:8000/
#    - 使用curl命令测试各个接口
#    - 使用API文档中的"Try it out"功能测试

# 5. 学习要点：
#    - 基本路由定义和请求方法（GET, POST, PUT, DELETE）
#    - 路径参数和查询参数的使用
#    - 请求体的定义和数据验证（使用Pydantic模型）
#    - 错误处理（使用HTTPException）
#    - API文档的自动生成
#    - FastAPI应用的启动和配置

# ------------------------------
# 进阶学习建议：
# ------------------------------
# 1. 学习如何连接数据库（如SQLAlchemy + PostgreSQL）
# 2. 学习如何处理用户认证和授权（如OAuth2, JWT）
# 3. 学习如何处理文件上传和下载
# 4. 学习如何使用FastAPI的依赖注入系统
# 5. 学习如何部署FastAPI应用到生产环境（如使用Docker + Uvicorn + Nginx）
# 6. 学习如何编写FastAPI应用的单元测试和集成测试