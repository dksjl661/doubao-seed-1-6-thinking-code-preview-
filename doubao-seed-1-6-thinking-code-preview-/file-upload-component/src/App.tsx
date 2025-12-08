import React from 'react';
import FileUpload from './components/FileUpload';

function App() {
  const handleFileSelect = (file: File | null) => {
    console.log('Selected file:', file);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5', padding: '40px 20px' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <h1 style={{ textAlign: 'center', color: '#333', marginBottom: '40px', fontSize: '28px', fontWeight: '600' }}>
          文件上传组件
        </h1>

        <FileUpload
          onFileSelect={handleFileSelect}
          acceptedFormats={['image/jpeg', 'image/png']}
          minWidth={100}
          minHeight={100}
        />

        <div style={{ marginTop: '40px', textAlign: 'center', color: '#666', fontSize: '14px' }}>
          <p>支持拖拽或点击选择图片文件</p>
          <p>仅支持 JPG、PNG 格式，最小尺寸 100x100px</p>
        </div>
      </div>
    </div>
  );
}

export default App;
