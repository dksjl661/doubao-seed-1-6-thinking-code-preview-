const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs-extra');

const app = express();
const PORT = process.env.PORT || 10315;

app.use(cors());
app.use(express.json());

const UPLOAD_DIR = path.join(__dirname, 'uploads');

// 确保上传目录存在
const ensureUploadDir = async () => {
  try {
    await fs.ensureDir(UPLOAD_DIR);
    console.log('Upload directory is ready');
  } catch (error) {
    console.error('Error creating upload directory:', error);
    process.exit(1);
  }
};

// 允许的MIME类型
const allowedMimeTypes = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'application/pdf'
];

// 生成唯一文件名
const generateUniqueFilename = async (originalName, uploadDir) => {
  const ext = path.extname(originalName);
  const baseName = path.basename(originalName, ext);
  const timestamp = new Date().toISOString().slice(0, 19).replace(/[:T]/g, '-');

  let filename = `${baseName}_${timestamp}${ext}`;
  let counter = 1;

  // 检查文件名是否存在，如果存在则添加计数器
  while (await fs.pathExists(path.join(uploadDir, filename))) {
    filename = `${baseName}_${timestamp}_${counter}${ext}`;
    counter++;
  }

  return filename;
};

// 配置multer存储
const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    try {
      await ensureUploadDir();
      cb(null, UPLOAD_DIR);
    } catch (error) {
      cb(error);
    }
  },
  filename: async (req, file, cb) => {
    try {
      const uniqueFilename = await generateUniqueFilename(file.originalname, UPLOAD_DIR);
      cb(null, uniqueFilename);
    } catch (error) {
      cb(error);
    }
  }
});

// 文件过滤器：检查MIME类型
const fileFilter = (req, file, cb) => {
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Unsupported file type. Only JPEG, PNG, GIF, and PDF are allowed.'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB限制，与客户端保持一致
    files: 10 // 最大10个文件
  }
});

// 上传文件API
app.post('/api/upload', upload.array('files'), (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'No files were uploaded.' });
    }

    const uploadedFiles = req.files.map(file => ({
      originalName: file.originalname,
      filename: file.filename,
      mimetype: file.mimetype,
      size: file.size,
      path: file.path
    }));

    res.json({
      message: 'Files uploaded successfully',
      files: uploadedFiles
    });
  } catch (error) {
    if (error.message.includes('Unsupported file type')) {
      res.status(415).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Error uploading files: ' + error.message });
    }
  }
});

// 获取已上传文件列表
app.get('/api/files', async (req, res) => {
  try {
    await ensureUploadDir();
    const files = await fs.readdir(UPLOAD_DIR);

    const fileList = await Promise.all(
      files.map(async (file) => {
        const stats = await fs.stat(path.join(UPLOAD_DIR, file));
        return {
          filename: file,
          size: stats.size,
          createdAt: stats.birthtime,
          modifiedAt: stats.mtime
        };
      })
    );

    res.json(fileList);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching files: ' + error.message });
  }
});

// 预览文件
app.get('/api/preview/:filename', async (req, res) => {
  try {
    const filename = req.params.filename;
    const filePath = path.join(UPLOAD_DIR, filename);

    if (!await fs.pathExists(filePath)) {
      return res.status(404).json({ error: 'File not found' });
    }

    // 根据文件扩展名设置合适的Content-Type
    const ext = path.extname(filename).toLowerCase();
    let contentType = 'application/octet-stream';

    if (['.jpg', '.jpeg'].includes(ext)) {
      contentType = 'image/jpeg';
    } else if (ext === '.png') {
      contentType = 'image/png';
    } else if (ext === '.gif') {
      contentType = 'image/gif';
    } else if (ext === '.pdf') {
      contentType = 'application/pdf';
    }

    res.setHeader('Content-Type', contentType);
    res.setHeader('Content-Disposition', `inline; filename="${filename}"`);

    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);
  } catch (error) {
    res.status(500).json({ error: 'Error previewing file: ' + error.message });
  }
});

// 下载文件
app.get('/api/download/:filename', async (req, res) => {
  try {
    const filename = req.params.filename;
    const filePath = path.join(UPLOAD_DIR, filename);

    if (!await fs.pathExists(filePath)) {
      return res.status(404).json({ error: 'File not found' });
    }

    res.download(filePath, (err) => {
      if (err) {
        res.status(500).json({ error: 'Error downloading file: ' + err.message });
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Error downloading file: ' + error.message });
  }
});

// 删除文件
app.delete('/api/files/:filename', async (req, res) => {
  try {
    const filename = req.params.filename;
    const filePath = path.join(UPLOAD_DIR, filename);

    if (!await fs.pathExists(filePath)) {
      return res.status(404).json({ error: 'File not found' });
    }

    await fs.remove(filePath);
    res.json({ message: 'File deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting file: ' + error.message });
  }
});

// 清空所有文件
app.delete('/api/files', async (req, res) => {
  try {
    await ensureUploadDir();
    const files = await fs.readdir(UPLOAD_DIR);

    if (files.length === 0) {
      return res.json({ message: 'No files to delete' });
    }

    // 删除所有文件
    const deletePromises = files.map(file =>
      fs.remove(path.join(UPLOAD_DIR, file))
    );

    await Promise.all(deletePromises);

    res.json({
      message: `All files deleted successfully`,
      deletedCount: files.length
    });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting all files: ' + error.message });
  }
});

// 服务静态文件
app.use(express.static(path.join(__dirname, '../client/dist')));

// 健康检查
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// 前端路由支持
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

// 错误处理中间件
app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: 'File size is too large' });
    }
  }
  res.status(500).json({ error: error.message });
});

// 启动服务器
const startServer = async () => {
  try {
    await ensureUploadDir();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      console.log(`Health check: http://localhost:${PORT}/health`);
    });
  } catch (error) {
    console.error('Error starting server:', error);
    process.exit(1);
  }
};

startServer();