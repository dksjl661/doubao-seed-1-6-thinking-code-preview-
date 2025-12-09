from flask import Flask, request, jsonify, render_template_string
import os

app = Flask(__name__)

@app.route('/')
def index():
    # 读取 index.html 文件内容
    with open(os.path.join(os.path.dirname(__file__), 'index.html'), 'r', encoding='utf-8') as f:
        html_content = f.read()
    return render_template_string(html_content)

@app.route('/api/sentiment', methods=['POST'])
def analyze_sentiment():
    # 检查请求体是否为 JSON
    if not request.is_json:
        return jsonify({"error": "Request must be JSON"}), 400

    # 获取请求数据
    data = request.get_json()

    # 检查 text 字段是否存在
    if 'text' not in data:
        return jsonify({"error": "text field is required"}), 400

    # 获取文本并去除首尾空格
    text = data['text'].strip()

    # 处理空文本情况
    if not text:
        return jsonify({"error": "text field cannot be empty"}), 400

    # 定义情感关键词（大小写不敏感）
    positive_keywords = ['棒极了', '喜欢', '完美']
    negative_keywords = ['差劲', '失望', '糟糕']

    # 将文本转换为小写用于匹配
    text_lower = text.lower()

    # 检查是否包含各类关键词
    has_positive = any(keyword in text_lower for keyword in positive_keywords)
    has_negative = any(keyword in text_lower for keyword in negative_keywords)

    # 确定情感类型
    if has_positive and has_negative:
        sentiment = 'Mixed'
    elif has_positive:
        sentiment = 'Positive'
    elif has_negative:
        sentiment = 'Negative'
    else:
        sentiment = 'Neutral'

    # 返回结果
    return jsonify({"sentiment": sentiment})

if __name__ == '__main__':
    app.run(debug=True)
