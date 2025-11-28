import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FileOperations from '@/components/FileOperations';
import FilePreview from '@/components/FilePreview';
import MessageToast from '@/components/MessageToast';
import { SelectedFile, UploadedFile, Message } from '@/types';

const API_BASE_URL = '/api';

const Home: React.FC = () => {
  const [selectedFiles, setSelectedFiles] = useState<SelectedFile[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isLoadingFiles, setIsLoadingFiles] = useState(false);
  const [previewFileData, setPreviewFileData] = useState<UploadedFile | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    fetchFiles();
  }, []);

  // 处理文件选择
  const handleFileSelect = (newFiles: SelectedFile[]) => {
    // 检查文件大小限制
    const oversizedFiles = newFiles.filter(file => file.size > 10 * 1024 * 1024);
    if (oversizedFiles.length > 0) {
      showMessage('error', '文件过大',
        `以下文件超过 10MB 限制: ${oversizedFiles.map(f => f.name).join(', ')}`);
      const validFiles = newFiles.filter(file => file.size <= 10 * 1024 * 1024);
      setSelectedFiles(prev => [...prev, ...validFiles]);
      if (validFiles.length > 0) {
        showMessage('info', '部分文件已添加',
          `已添加 ${validFiles.length} 个有效文件`);
      }
    } else {
      setSelectedFiles(prev => [...prev, ...newFiles]);
      showMessage('success', '文件选择成功',
        `已选择 ${newFiles.length} 个文件`);
    }
  };

  // 上传文件
  const uploadFiles = async () => {
    if (selectedFiles.length === 0) return;

    setIsUploading(true);
    setUploadProgress(0);

    const formData = new FormData();
    selectedFiles.forEach(file => {
      formData.append('files', file.file);
    });

    try {
      const response = await axios.post(`${API_BASE_URL}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            setUploadProgress(Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            ));
          }
        }
      });

      showMessage('success', '上传成功',
        `成功上传 ${response.data.files.length} 个文件`);

      // 清空选择的文件
      setSelectedFiles([]);

      // 刷新文件列表
      await fetchFiles();

    } catch (error: any) {
      console.error('上传失败:', error);
      let errorMessage = '上传失败，请重试';
      if (error.response) {
        errorMessage = error.response.data.error || errorMessage;
      }
      showMessage('error', '上传失败', errorMessage);
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  // 获取已上传文件列表
  const fetchFiles = async () => {
    setIsLoadingFiles(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/files`);
      setUploadedFiles(response.data);
    } catch (error: any) {
      console.error('获取文件列表失败:', error);
      showMessage('error', '获取文件列表失败', '无法连接到服务器');
    } finally {
      setIsLoadingFiles(false);
    }
  };

  // 下载文件
  const downloadFile = async (file: UploadedFile) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/download/${file.filename}`, {
        responseType: 'blob'
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', file.filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      showMessage('success', '下载成功', `${file.filename}`);
    } catch (error: any) {
      console.error('下载失败:', error);
      showMessage('error', '下载失败', '无法下载文件');
    }
  };

  // 删除文件
  const deleteFile = async (file: UploadedFile) => {
    if (!confirm(`确定要删除文件 "${file.filename}" 吗？`)) return;

    try {
      await axios.delete(`${API_BASE_URL}/files/${file.filename}`);
      showMessage('success', '删除成功', `${file.filename} 已删除`);
      await fetchFiles();
    } catch (error: any) {
      console.error('删除失败:', error);
      showMessage('error', '删除失败', '无法删除文件');
    }
  };

  // 清空所有文件
  const clearAllFiles = async () => {
    if (!confirm('确定要删除所有已上传的文件吗？此操作不可恢复！')) return;

    try {
      const response = await axios.delete(`${API_BASE_URL}/files`);
      showMessage('success', '清空成功',
        `${response.data.message}（${response.data.deletedCount} 个文件）`);
      await fetchFiles();
    } catch (error: any) {
      console.error('清空失败:', error);
      let errorMessage = '无法删除所有文件';
      if (error.response) {
        errorMessage = error.response.data.error || errorMessage;
      }
      showMessage('error', '清空失败', errorMessage);
    }
  };

  // 清空选择的文件
  const clearSelectedFiles = () => {
    setSelectedFiles([]);
    showMessage('info', '已清空', '已清空选择的文件');
  };

  // 移除单个选中文件
  const removeFile = (fileId: number) => {
    const file = selectedFiles.find(f => f.id === fileId);
    if (file) {
      setSelectedFiles(prev => prev.filter(f => f.id !== fileId));
      showMessage('info', '已移除', `${file.name} 已从选择列表中移除`);
    }
  };

  // 预览文件
  const previewFile = (file: UploadedFile) => {
    setPreviewFileData(file);
  };

  // 关闭预览
  const closePreview = () => {
    setPreviewFileData(null);
  };

  // 处理预览中的下载
  const handlePreviewDownload = () => {
    if (previewFileData) {
      downloadFile(previewFileData);
    }
  };

  // 显示消息
  const showMessage = (type: 'success' | 'error' | 'info', title: string, details?: string) => {
    const id = Date.now() + Math.random();
    const newMessage: Message = {
      id,
      type,
      text: title,
      details,
      duration: 3000
    };
    setMessages(prev => [...prev, newMessage]);

    // 自动移除消息
    setTimeout(() => {
      removeMessage(id);
    }, 3000);
  };

  // 移除消息
  const removeMessage = (id: number) => {
    setMessages(prev => prev.filter(m => m.id !== id));
  };

  return (
    <div className="app-container">
      {/* 头部 */}
      <header className="app-header">
        <div className="header-content">
          <div className="logo-section">
            <div className="logo-icon">📁</div>
            <div className="logo-text">
              <h1>文件上传系统</h1>
              <p>支持多文件上传，最大文件大小 10MB</p>
            </div>
          </div>
        </div>
      </header>

      {/* 主要内容 */}
      <main className="app-main">
        <div className="main-content">
          {/* 文件操作区域 */}
          <div className="operations-panel">
            <FileOperations
              selectedFiles={selectedFiles}
              uploadedFiles={uploadedFiles}
              isUploading={isUploading}
              uploadProgress={uploadProgress}
              isLoadingFiles={isLoadingFiles}
              onFileSelect={handleFileSelect}
              onUpload={uploadFiles}
              onRefresh={fetchFiles}
              onClearAll={clearAllFiles}
              onClearSelected={clearSelectedFiles}
              onRemoveFile={removeFile}
              onDownload={downloadFile}
              onDelete={deleteFile}
              onPreview={previewFile}
            />
          </div>
        </div>
      </main>

      {/* 预览组件 */}
      {previewFileData && (
        <FilePreview
          filename={previewFileData.filename}
          fileSize={previewFileData.size}
          visible={!!previewFileData}
          onClose={closePreview}
          onDownload={handlePreviewDownload}
        />
      )}

      {/* 消息提示 */}
      <MessageToast
        messages={messages}
        onRemove={removeMessage}
      />
    </div>
  );
};

export default Home;