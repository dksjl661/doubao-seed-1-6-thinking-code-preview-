import React, { useRef } from 'react';
import { SelectedFile, UploadedFile } from '@/types';

interface FileOperationsProps {
  selectedFiles: SelectedFile[];
  uploadedFiles: UploadedFile[];
  isUploading: boolean;
  uploadProgress: number;
  isLoadingFiles: boolean;
  onFileSelect: (files: SelectedFile[]) => void;
  onUpload: () => void;
  onRefresh: () => void;
  onClearAll: () => void;
  onClearSelected: () => void;
  onRemoveFile: (fileId: number) => void;
  onDownload: (file: UploadedFile) => void;
  onDelete: (file: UploadedFile) => void;
  onPreview: (file: UploadedFile) => void;
}

const FileOperations: React.FC<FileOperationsProps> = ({
  selectedFiles,
  uploadedFiles,
  isUploading,
  uploadProgress,
  isLoadingFiles,
  onFileSelect,
  onUpload,
  onRefresh,
  onClearAll,
  onClearSelected,
  onRemoveFile,
  onDownload,
  onDelete,
  onPreview
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const newFiles: SelectedFile[] = files.map(file => ({
      id: Date.now() + Math.random(),
      file: file,
      name: file.name,
      size: file.size,
      type: file.type,
      status: 'pending',
      statusText: '等待上传',
      statusClass: 'status-pending'
    }));
    onFileSelect(newFiles);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('zh-CN');
  };

  const getFileIcon = (mimeType: string) => {
    if (mimeType.startsWith('image/')) return '🖼️';
    if (mimeType === 'application/pdf') return '📄';
    return '📁';
  };

  const getFileIconByExtension = (filename: string) => {
    const ext = filename.split('.').pop()?.toLowerCase() || '';
    if (['jpg', 'jpeg', 'png', 'gif'].includes(ext)) return '🖼️';
    if (ext === 'pdf') return '📄';
    return '📁';
  };

  const getFileTypeClass = (mimeType: string) => {
    if (mimeType.startsWith('image/')) return 'file-type-icon image-type';
    if (mimeType === 'application/pdf') return 'file-type-icon pdf-type';
    return 'file-type-icon unknown-type';
  };

  const getFileTypeClassByExtension = (filename: string) => {
    const ext = filename.split('.').pop()?.toLowerCase() || '';
    if (['jpg', 'jpeg', 'png', 'gif'].includes(ext)) return 'file-type-icon image-type';
    if (ext === 'pdf') return 'file-type-icon pdf-type';
    return 'file-type-icon unknown-type';
  };

  return (
    <div className="file-operations">
      {/* 文件选择和上传 */}
      <div className="upload-controls">
        <input
          id="fileInput"
          ref={fileInputRef}
          type="file"
          multiple
          onChange={handleFileSelect}
          accept=".jpg,.jpeg,.png,.gif,.pdf"
          style={{ display: 'none' }}
        />
        <button
          className="btn btn-primary btn-select"
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
        >
          <span className="btn-icon">📁</span>
          选择文件
        </button>

        <button
          className="btn btn-success btn-upload"
          disabled={selectedFiles.length === 0 || isUploading}
          onClick={onUpload}
        >
          <span className="btn-icon">{isUploading ? '⏳' : '⬆️'}</span>
          {isUploading ? '上传中...' : '上传文件'}
        </button>

        <button
          className="btn btn-secondary btn-refresh"
          onClick={onRefresh}
          disabled={isUploading}
        >
          <span className="btn-icon">🔄</span>
          刷新列表
        </button>

        <button
          className="btn btn-danger btn-clear"
          onClick={onClearAll}
          disabled={uploadedFiles.length === 0 || isUploading}
        >
          <span className="btn-icon">🗑️</span>
          清空所有
        </button>
      </div>

      {/* 选中文件列表 */}
      {selectedFiles.length > 0 && (
        <div className="selected-files-section">
          <div className="section-header">
            <h3>已选择 {selectedFiles.length} 个文件</h3>
            <button
              className="btn btn-sm btn-text"
              onClick={onClearSelected}
              disabled={isUploading}
            >
              清空选择
            </button>
          </div>

          <div className="file-list">
            {selectedFiles.map((file) => (
              <div key={file.id} className="file-item">
                <div className="file-info">
                  <div className={getFileTypeClass(file.type)}>
                    {getFileIcon(file.type)}
                  </div>
                  <div className="file-details">
                    <h4>{file.name}</h4>
                    <div className="file-size">{formatFileSize(file.size)}</div>
                  </div>
                </div>
                <div className={`file-status ${file.statusClass}`}>
                  {file.statusText}
                </div>
                <button
                  className="btn btn-sm btn-danger btn-remove"
                  onClick={() => onRemoveFile(file.id)}
                  disabled={isUploading}
                >
                  ×
                </button>
              </div>
            ))}

            {/* 总体上传进度 */}
            {isUploading && (
              <div className="progress-container">
                <div className="progress-info">
                  <span>上传进度: {uploadProgress}%</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${uploadProgress}%` }}></div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 已上传文件列表 */}
      <div className="uploaded-files-section">
        <div className="section-header">
          <h3>已上传文件</h3>
          {uploadedFiles.length > 0 && (
            <span className="file-count">
              {uploadedFiles.length} 个文件
            </span>
          )}
        </div>

        {uploadedFiles.length > 0 ? (
          <div className="file-list">
            {uploadedFiles.map((file) => (
              <div key={file.filename} className="file-item uploaded">
                <div className="file-info">
                  <div className={getFileTypeClassByExtension(file.filename)}>
                    {getFileIconByExtension(file.filename)}
                  </div>
                  <div className="file-details">
                    <h4>{file.filename}</h4>
                    <div className="file-size">{formatFileSize(file.size)}</div>
                    <div className="file-date">
                      上传时间: {formatDate(file.createdAt)}
                    </div>
                  </div>
                </div>
                <div className="action-buttons">
                  <button
                    className="btn btn-sm btn-secondary"
                    onClick={() => onPreview(file)}
                  >
                    <span className="btn-icon">👁️</span>
                    预览
                  </button>
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => onDownload(file)}
                  >
                    <span className="btn-icon">⬇️</span>
                    下载
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => onDelete(file)}
                  >
                    <span className="btn-icon">🗑️</span>
                    删除
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : !isLoadingFiles ? (
          <div className="empty-state">
            <div className="empty-icon">📂</div>
            <p>暂无上传的文件</p>
            <p className="empty-hint">点击"选择文件"开始上传</p>
          </div>
        ) : (
          <div className="loading-state">
            <div className="loading-icon">🔄</div>
            <p>加载中...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileOperations;

<style jsx>{`
  .file-operations {
    max-width: 1200px;
    margin: 0 auto;
  }

  .upload-controls {
    display: flex;
    gap: 12px;
    margin-bottom: 24px;
    flex-wrap: wrap;
    justify-content: center;
    padding: 24px;
    background: #f8f9fa;
    border-radius: 8px;
    border: 1px solid #e9ecef;
  }

  .btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s;
    text-decoration: none;
    position: relative;
    overflow: hidden;
  }

  .btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .btn-icon {
    font-size: 16px;
  }

  .btn-primary {
    background: #4299e1;
    color: white;
  }

  .btn-primary:hover:not(:disabled) {
    background: #3182ce;
  }

  .btn-success {
    background: #42b983;
    color: white;
  }

  .btn-success:hover:not(:disabled) {
    background: #359469;
  }

  .btn-secondary {
    background: #6c757d;
    color: white;
  }

  .btn-secondary:hover:not(:disabled) {
    background: #5a6268;
  }

  .btn-danger {
    background: #e53e3e;
    color: white;
  }

  .btn-danger:hover:not(:disabled) {
    background: #c53030;
  }

  .btn-sm {
    padding: 6px 12px;
    font-size: 13px;
  }

  .btn-text {
    background: transparent;
    color: #6c757d;
    border: 1px solid #dee2e6;
  }

  .btn-text:hover:not(:disabled) {
    background: #f8f9fa;
    color: #495057;
  }

  .btn-remove {
    min-width: 40px;
    font-size: 16px;
  }

  .btn-remove:hover:not(:disabled) {
    background: #c53030;
  }

  /* 确保所有按钮尺寸统一 */
  .btn,
  .btn-sm {
    min-height: 36px;
    line-height: 1.5;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    white-space: nowrap;
    flex-shrink: 0;
  }

  .btn {
    padding: 10px 20px;
    font-size: 14px;
    min-width: 100px;
  }

  .btn-sm {
    padding: 6px 12px;
    font-size: 13px;
    min-width: 80px;
  }

  .selected-files-section,
  .uploaded-files-section {
    margin-bottom: 32px;
    background: white;
    border-radius: 8px;
    padding: 24px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }

  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
    padding-bottom: 12px;
    border-bottom: 2px solid #f1f3f5;
  }

  .section-header h3 {
    margin: 0;
    font-size: 18px;
    color: #212529;
  }

  .file-count {
    font-size: 14px;
    color: #6c757d;
    background: #e9ecef;
    padding: 4px 12px;
    border-radius: 20px;
  }

  .file-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .file-item {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 16px;
    background: #f8f9fa;
    border-radius: 6px;
    border: 1px solid #dee2e6;
    transition: all 0.3s;
    position: relative;
    min-height: 80px;
  }

  .file-item:hover {
    background: #f1f3f5;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .file-item.uploaded .file-info {
    cursor: pointer;
    flex: 1;
  }

  .file-info {
    display: flex;
    align-items: center;
    gap: 12px;
    flex: 1;
  }

  .file-type-icon {
    width: 40px;
    height: 40px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    background: #e9ecef;
    color: #495057;
  }

  .file-type-icon.image-type {
    background: #bee3f8;
    color: #2c5282;
  }

  .file-type-icon.pdf-type {
    background: #fed7d7;
    color: #742a2a;
  }

  .file-details {
    flex: 1;
    min-width: 0;
  }

  .file-details h4 {
    margin: 0 0 4px 0;
    font-size: 16px;
    color: #212529;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .file-size,
  .file-date {
    font-size: 13px;
    color: #6c757d;
    margin: 0;
  }

  .file-date {
    font-size: 12px;
  }

  .file-status {
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 13px;
    font-weight: 500;
    min-width: 80px;
    text-align: center;
  }

  .status-pending {
    background: #fef5e7;
    color: #d68910;
  }

  .status-success {
    background: #d4edda;
    color: #155724;
  }

  .status-error {
    background: #f8d7da;
    color: #721c24;
  }

  .action-buttons {
    display: flex;
    gap: 8px;
    flex-shrink: 0;
    flex-wrap: wrap;
    max-width: 300px;
  }

  .progress-container {
    margin-top: 16px;
    padding: 16px;
    background: white;
    border-radius: 6px;
    border: 1px solid #e9ecef;
  }

  .progress-info {
    margin-bottom: 8px;
    font-size: 14px;
    color: #495057;
    text-align: center;
  }

  .progress-bar {
    height: 8px;
    background: #e9ecef;
    border-radius: 4px;
    overflow: hidden;
  }

  .progress-fill {
    height: 100%;
    background: linear-gradient(90deg, #42b983, #359469);
    transition: width 0.3s ease;
    border-radius: 4px;
  }

  .empty-state,
  .loading-state {
    text-align: center;
    padding: 64px 24px;
    color: #6c757d;
  }

  .empty-icon,
  .loading-icon {
    font-size: 64px;
    margin-bottom: 16px;
  }

  .empty-state p {
    margin: 0 0 8px 0;
    font-size: 16px;
  }

  .empty-hint {
    font-size: 14px;
    color: #adb5bd;
  }

  .loading-icon {
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  @media (max-width: 768px) {
    .upload-controls {
      padding: 16px;
      gap: 8px;
    }

    .btn {
      padding: 8px 16px;
      font-size: 13px;
      min-width: 80px;
    }

    .btn-sm {
      padding: 4px 8px;
      font-size: 12px;
      min-width: 60px;
    }

    .btn-icon {
      font-size: 14px;
    }

    .file-item {
      padding: 12px;
      flex-direction: column;
      align-items: flex-start;
      gap: 12px;
    }

    .file-item.uploaded .file-info {
      width: 100%;
    }

    .file-type-icon {
      width: 32px;
      height: 32px;
      font-size: 16px;
    }

    .action-buttons {
      width: 100%;
      max-width: none;
      justify-content: flex-end;
    }

    .selected-files-section,
    .uploaded-files-section {
      padding: 16px;
    }

    .file-status {
      align-self: flex-start;
    }
  }
`}</style>