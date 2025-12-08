import React, { useState, useRef, useEffect } from 'react';

interface FileUploadProps {
  onFileSelect?: (file: File | null) => void;
  acceptedFormats?: string[];
  minWidth?: number;
  minHeight?: number;
}

const FileUpload: React.FC<FileUploadProps> = ({
  onFileSelect,
  acceptedFormats = ['image/jpeg', 'image/png'],
  minWidth = 100,
  minHeight = 100
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [isDragOver, setIsDragOver] = useState(false);
  const [error, setError] = useState<string>('');
  const [warning, setWarning] = useState<string>('');

  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropZoneRef = useRef<HTMLDivElement>(null);

  // Clean up preview URL on unmount
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  // Handle file selection
  const handleFileSelect = (file: File) => {
    setError('');
    setWarning('');

    // Validate file format
    if (!acceptedFormats.includes(file.type)) {
      setError('请选择有效的图片文件（.jpg, .png）');
      if (onFileSelect) onFileSelect(null);
      return;
    }

    // Create preview URL
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    setSelectedFile(file);

    // Validate image dimensions
    const img = new Image();
    img.onload = () => {
      if (img.width < minWidth || img.height < minHeight) {
        setWarning('图片尺寸过小');
      }
    };
    img.src = url;

    if (onFileSelect) onFileSelect(file);
  };

  // Handle file input change
  const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  // Handle drag over
  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragOver(true);
  };

  // Handle drag leave
  const handleDragLeave = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragOver(false);
  };

  // Handle drop
  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragOver(false);

    const file = event.dataTransfer.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  // Handle click on drop zone
  const handleDropZoneClick = () => {
    fileInputRef.current?.click();
  };

  // Handle remove file
  const handleRemoveFile = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setSelectedFile(null);
    setPreviewUrl('');
    setError('');
    setWarning('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    if (onFileSelect) onFileSelect(null);
  };

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', padding: '20px' }}>
      {/* Drop Zone */}
      <div
        ref={dropZoneRef}
        onClick={handleDropZoneClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        style={{
          border: `2px dashed ${isDragOver ? '#4CAF50' : error ? '#f44336' : '#ccc'}`,
          borderRadius: '8px',
          padding: '40px 20px',
          textAlign: 'center',
          cursor: 'pointer',
          transition: 'border-color 0.3s ease, background-color 0.3s ease',
          backgroundColor: isDragOver ? '#e8f5e8' : 'transparent'
        }}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={acceptedFormats.join(',')}
          onChange={handleFileInputChange}
          style={{ display: 'none' }}
        />

        <div style={{ marginBottom: '16px' }}>
          {isDragOver ? (
            <span style={{ fontSize: '24px' }}>📂</span>
          ) : selectedFile ? (
            <span style={{ fontSize: '24px' }}>✅</span>
          ) : (
            <span style={{ fontSize: '24px' }}>📤</span>
          )}
        </div>

        <div style={{ fontSize: '16px', fontWeight: '500', marginBottom: '8px' }}>
          {isDragOver ? '松开鼠标上传文件' : selectedFile ? '文件已选择' : '拖拽文件到此处或点击选择'}
        </div>

        <div style={{ fontSize: '14px', color: '#666' }}>
          支持 JPG、PNG 格式，建议尺寸不小于 {minWidth}x{minHeight}px
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div style={{
          marginTop: '16px',
          padding: '12px',
          backgroundColor: '#ffebee',
          color: '#c62828',
          borderRadius: '4px',
          fontSize: '14px'
        }}>
          ⚠️ {error}
        </div>
      )}

      {/* Warning Message */}
      {warning && (
        <div style={{
          marginTop: '16px',
          padding: '12px',
          backgroundColor: '#fff3e0',
          color: '#ef6c00',
          borderRadius: '4px',
          fontSize: '14px'
        }}>
          ⚠️ {warning}
        </div>
      )}

      {/* Preview Section */}
      {previewUrl && !error && (
        <div style={{
          marginTop: '24px',
          padding: '16px',
          border: '1px solid #eee',
          borderRadius: '8px',
          backgroundColor: '#fafafa'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <h3 style={{ margin: '0', fontSize: '16px', fontWeight: '600' }}>预览</h3>
            <button
              onClick={handleRemoveFile}
              style={{
                padding: '6px 12px',
                backgroundColor: '#f44336',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              移除文件
            </button>
          </div>

          <div style={{ textAlign: 'center' }}>
            <img
              src={previewUrl}
              alt="Preview"
              style={{
                maxWidth: '100%',
                maxHeight: '300px',
                borderRadius: '4px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}
            />
            <div style={{ marginTop: '8px', fontSize: '14px', color: '#666' }}>
              {selectedFile?.name} ({(selectedFile?.size || 0) / 1024} KB)
            </div>
          </div>
        </div>
      )}

      {/* Upload Button */}
      {selectedFile && !error && (
        <button
          onClick={() => alert('文件上传功能演示（仅前端）\n\n文件名: ' + selectedFile.name + '\n文件大小: ' + (selectedFile.size / 1024) + ' KB\n文件类型: ' + selectedFile.type)}
          style={{
            marginTop: '20px',
            width: '100%',
            padding: '12px',
            backgroundColor: '#2196F3',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '16px',
            fontWeight: '500',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1976D2'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#2196F3'}
        >
          上传文件
        </button>
      )}
    </div>
  );
};

export default FileUpload;
