const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// 解析 JSON 请求体
app.use(express.json());

// 华氏温度到摄氏温度的转换函数
function convertFahrenheitToCelsius(fahrenheit) {
  // 转换公式：C = (F - 32) * 5/9
  const celsius = (fahrenheit - 32) * 5/9;
  // 四舍五入到小数点后两位
  return Math.round(celsius * 100) / 100;
}

// 温度转换 API 端点
app.post('/api/convert/celsius', (req, res) => {
  try {
    const { fahrenheit } = req.body;

    // 检查请求体中是否包含 fahrenheit 字段
    if (fahrenheit === undefined || fahrenheit === null) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'Missing required field "fahrenheit"'
      });
    }

    // 检查 fahrenheit 是否为数字
    if (typeof fahrenheit !== 'number' || isNaN(fahrenheit)) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'Field "fahrenheit" must be a valid number'
      });
    }

    // 执行温度转换
    const celsius = convertFahrenheitToCelsius(fahrenheit);

    // 检查转换结果是否低于绝对零度 (-273.15°C)
    const ABSOLUTE_ZERO = -273.15;
    if (celsius < ABSOLUTE_ZERO) {
      return res.status(422).json({
        error: 'Unprocessable Entity',
        message: 'Temperature cannot be below absolute zero (-273.15°C)',
        warning: `Input temperature ${fahrenheit}°F converts to ${celsius}°C, which is below absolute zero`
      });
    }

    // 返回成功响应
    res.json({
      celsius: celsius
    });

  } catch (error) {
    // 处理意外错误
    console.error('Error processing temperature conversion:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'An unexpected error occurred while processing your request'
    });
  }
});

// 健康检查端点
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString()
  });
});

// 404 错误处理
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: 'The requested endpoint does not exist'
  });
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`Temperature Converter API server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
  console.log(`API endpoint: http://localhost:${PORT}/api/convert/celsius`);
});
