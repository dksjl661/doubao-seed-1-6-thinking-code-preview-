from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from urllib.parse import urlparse, parse_qsl

app = FastAPI(title="URL Query Parameter Parser", version="1.0.0")

class URLRequest(BaseModel):
    url: str

@app.post("/api/parse")
async def parse_url(request: URLRequest):
    try:
        # 解析 URL
        parsed_url = urlparse(request.url)

        # 检查是否为有效的 URL（至少需要 scheme 和 netloc）
        if not all([parsed_url.scheme, parsed_url.netloc]):
            raise ValueError("Invalid URL format")

        # 解析查询参数
        query_params = parse_qsl(parsed_url.query, keep_blank_values=True)

        # 处理重复参数
        result = {}
        for key, value in query_params:
            if key in result:
                # 如果已经存在，转换为列表
                if not isinstance(result[key], list):
                    result[key] = [result[key]]
                result[key].append(value)
            else:
                result[key] = value

        return result

    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=400, detail="Failed to parse URL")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
