<template>
  <div class="file-preview" v-if="visible" @click.self="handleClose">
    <div class="preview-overlay"></div>
    <div class="preview-content">
      <button class="close-btn" @click="handleClose">×</button>

      <div v-if="fileType === 'image'" class="image-preview">
        <img :src="previewUrl" :alt="filename" />
        <div class="preview-info">
          <h3>{{ filename }}</h3>
          <p>{{ formatFileSize(fileSize) }}</p>
        </div>
      </div>

      <div v-else-if="fileType === 'pdf'" class="pdf-preview">
        <embed :src="previewUrl" type="application/pdf" />
        <div class="preview-info">
          <h3>{{ filename }}</h3>
          <p>{{ formatFileSize(fileSize) }}</p>
          <a :href="previewUrl" target="_blank" class="open-external">在新窗口中打开</a>
        </div>
      </div>

      <div v-else class="unknown-preview">
        <div class="file-icon">📄</div>
        <h3>{{ filename }}</h3>
        <p>无法预览此文件类型</p>
        <p class="file-size">{{ formatFileSize(fileSize) }}</p>
        <button class="btn-download" @click="handleDownload">下载文件</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FilePreview',
  props: {
    filename: {
      type: String,
      required: true
    },
    fileSize: {
      type: Number,
      required: true
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    previewUrl() {
      return `/api/download/${this.filename}`
    },
    fileType() {
      const ext = this.filename.split('.').pop().toLowerCase()
      if (['jpg', 'jpeg', 'png', 'gif'].includes(ext)) {
        return 'image'
      } else if (ext === 'pdf') {
        return 'pdf'
      }
      return 'unknown'
    }
  },
  methods: {
    handleClose() {
      this.$emit('close')
    },
    handleDownload() {
      this.$emit('download')
      this.handleClose()
    },
    formatFileSize(bytes) {
      if (bytes === 0) return '0 Bytes'
      const k = 1024
      const sizes = ['Bytes', 'KB', 'MB', 'GB']
      const i = Math.floor(Math.log(bytes) / Math.log(k))
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
    }
  }
}
</script>

<style scoped>
.file-preview {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
}

.preview-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
}

.preview-content {
  position: relative;
  background: white;
  border-radius: 8px;
  padding: 24px;
  max-width: 90%;
  max-height: 90%;
  overflow: auto;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  animation: modalFadeIn 0.3s ease-out;
}

@keyframes modalFadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.close-btn {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 32px;
  height: 32px;
  border: none;
  background: #f5f5f5;
  border-radius: 50%;
  font-size: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
  transition: all 0.3s;
}

.close-btn:hover {
  background: #e0e0e0;
  color: #333;
}

.image-preview img {
  max-width: 100%;
  max-height: 70vh;
  border-radius: 4px;
  display: block;
  margin: 0 auto 16px;
}

.pdf-preview embed {
  width: 100%;
  min-height: 600px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  margin-bottom: 16px;
}

.preview-info {
  text-align: center;
}

.preview-info h3 {
  margin: 0 0 8px 0;
  font-size: 18px;
  color: #333;
}

.preview-info p {
  margin: 0 0 12px 0;
  color: #666;
  font-size: 14px;
}

.open-external {
  color: #42b983;
  text-decoration: none;
  font-size: 14px;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  transition: color 0.3s;
}

.open-external:hover {
  color: #359469;
  text-decoration: underline;
}

.unknown-preview {
  text-align: center;
  padding: 48px 24px;
}

.file-icon {
  font-size: 64px;
  margin-bottom: 16px;
}

.unknown-preview h3 {
  margin: 0 0 8px 0;
  font-size: 18px;
  color: #333;
}

.unknown-preview p {
  margin: 0 0 8px 0;
  color: #666;
  font-size: 14px;
}

.unknown-preview .file-size {
  margin-bottom: 24px;
}

.btn-download {
  background: #42b983;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background 0.3s;
}

.btn-download:hover {
  background: #359469;
}

@media (max-width: 768px) {
  .preview-content {
    padding: 16px;
    margin: 16px;
  }

  .pdf-preview embed {
    min-height: 400px;
  }

  .unknown-preview {
    padding: 32px 16px;
  }

  .file-icon {
    font-size: 48px;
  }
}
</style>