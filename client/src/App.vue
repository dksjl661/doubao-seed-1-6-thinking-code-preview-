<template>
  <div class="app-container">
    <!-- 头部 -->
    <header class="app-header">
      <div class="header-content">
        <div class="logo-section">
          <div class="logo-icon">📁</div>
          <div class="logo-text">
            <h1>文件上传系统</h1>
            <p>支持多文件上传，最大文件大小 10MB</p>
          </div>
        </div>
      </div>
    </header>

    <!-- 主要内容 -->
    <main class="app-main">
      <div class="main-content">
        <!-- 文件操作区域 -->
        <div class="operations-panel">
          <FileOperations
            :selected-files="selectedFiles"
            :uploaded-files="uploadedFiles"
            :is-uploading="isUploading"
            :upload-progress="uploadProgress"
            :is-loading-files="isLoadingFiles"
            @file-select="handleFileSelect"
            @upload="uploadFiles"
            @refresh="fetchFiles"
            @clear-all="clearAllFiles"
            @clear-selected="clearSelectedFiles"
            @remove-file="removeFile"
            @download="downloadFile"
            @delete="deleteFile"
            @preview="previewFile"
          />
        </div>
      </div>
    </main>

    <!-- 预览组件 -->
    <FilePreview
      v-if="previewFileData"
      :filename="previewFileData.filename"
      :file-size="previewFileData.size"
      :visible="!!previewFileData"
      @close="closePreview"
      @download="handlePreviewDownload"
    />

    <!-- 消息提示 -->
    <MessageToast
      :messages="messages"
      @remove="removeMessage"
    />
  </div>
</template>

<script>
import axios from 'axios'
import FileOperations from './components/FileOperations.vue'
import FilePreview from './components/FilePreview.vue'
import MessageToast from './components/MessageToast.vue'

export default {
  name: 'App',
  components: {
    FileOperations,
    FilePreview,
    MessageToast
  },
  data() {
    return {
      selectedFiles: [],
      uploadedFiles: [],
      isUploading: false,
      uploadProgress: 0,
      isLoadingFiles: false,
      previewFileData: null,
      messages: []
    }
  },

  mounted() {
    this.fetchFiles()
  },

  methods: {
    // 处理文件选择
    handleFileSelect(newFiles) {
      // 检查文件大小限制
      const oversizedFiles = newFiles.filter(file => file.size > 10 * 1024 * 1024)
      if (oversizedFiles.length > 0) {
        this.showMessage('error', '文件过大',
          `以下文件超过 10MB 限制: ${oversizedFiles.map(f => f.name).join(', ')}`)
        const validFiles = newFiles.filter(file => file.size <= 10 * 1024 * 1024)
        this.selectedFiles = [...this.selectedFiles, ...validFiles]
        if (validFiles.length > 0) {
          this.showMessage('info', '部分文件已添加',
            `已添加 ${validFiles.length} 个有效文件`)
        }
      } else {
        this.selectedFiles = [...this.selectedFiles, ...newFiles]
        this.showMessage('success', '文件选择成功',
          `已选择 ${newFiles.length} 个文件`)
      }
    },

    // 上传文件
    async uploadFiles() {
      if (this.selectedFiles.length === 0) return

      this.isUploading = true
      this.uploadProgress = 0

      const formData = new FormData()
      this.selectedFiles.forEach(file => {
        formData.append('files', file.file)
      })

      try {
        const response = await axios.post('/api/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          onUploadProgress: (progressEvent) => {
            if (progressEvent.total) {
              this.uploadProgress = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              )
            }
          }
        })

        this.showMessage('success', '上传成功',
          `成功上传 ${response.data.files.length} 个文件`)

        // 清空选择的文件
        this.selectedFiles = []

        // 刷新文件列表
        await this.fetchFiles()

      } catch (error) {
        console.error('上传失败:', error)
        let errorMessage = '上传失败，请重试'
        if (error.response) {
          errorMessage = error.response.data.error || errorMessage
        }
        this.showMessage('error', '上传失败', errorMessage)
      } finally {
        this.isUploading = false
        this.uploadProgress = 0
      }
    },

    // 获取已上传文件列表
    async fetchFiles() {
      this.isLoadingFiles = true
      try {
        const response = await axios.get('/api/files')
        this.uploadedFiles = response.data
      } catch (error) {
        console.error('获取文件列表失败:', error)
        this.showMessage('error', '获取文件列表失败', '无法连接到服务器')
      } finally {
        this.isLoadingFiles = false
      }
    },

    // 下载文件
    async downloadFile(file) {
      try {
        const response = await axios.get(`/api/download/${file.filename}`, {
          responseType: 'blob'
        })

        const url = window.URL.createObjectURL(new Blob([response.data]))
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', file.filename)
        document.body.appendChild(link)
        link.click()
        link.remove()
        window.URL.revokeObjectURL(url)

        this.showMessage('success', '下载成功', `${file.filename}`)
      } catch (error) {
        console.error('下载失败:', error)
        this.showMessage('error', '下载失败', '无法下载文件')
      }
    },

    // 删除文件
    async deleteFile(file) {
      if (!confirm(`确定要删除文件 "${file.filename}" 吗？`)) return

      try {
        await axios.delete(`/api/files/${file.filename}`)
        this.showMessage('success', '删除成功', `${file.filename} 已删除`)
        await this.fetchFiles()
      } catch (error) {
        console.error('删除失败:', error)
        this.showMessage('error', '删除失败', '无法删除文件')
      }
    },

    // 清空所有文件
    async clearAllFiles() {
      if (!confirm('确定要删除所有已上传的文件吗？此操作不可恢复！')) return

      try {
        const response = await axios.delete('/api/files')
        this.showMessage('success', '清空成功',
          `${response.data.message}（${response.data.deletedCount} 个文件）`)
        await this.fetchFiles()
      } catch (error) {
        console.error('清空失败:', error)
        let errorMessage = '无法删除所有文件'
        if (error.response) {
          errorMessage = error.response.data.error || errorMessage
        }
        this.showMessage('error', '清空失败', errorMessage)
      }
    },

    // 清空选择的文件
    clearSelectedFiles() {
      this.selectedFiles = []
      this.showMessage('info', '已清空', '已清空选择的文件')
    },

    // 移除单个选中文件
    removeFile(fileId) {
      const file = this.selectedFiles.find(f => f.id === fileId)
      if (file) {
        this.selectedFiles = this.selectedFiles.filter(f => f.id !== fileId)
        this.showMessage('info', '已移除', `${file.name} 已从选择列表中移除`)
      }
    },

    // 预览文件
    previewFile(file) {
      this.previewFileData = file
    },

    // 关闭预览
    closePreview() {
      this.previewFileData = null
    },

    // 处理预览中的下载
    handlePreviewDownload() {
      if (this.previewFileData) {
        this.downloadFile(this.previewFileData)
      }
    },

    // 显示消息
    showMessage(type, title, details = '') {
      const id = Date.now() + Math.random()
      this.messages.push({
        id,
        type,
        text: title,
        details,
        duration: 3000
      })

      // 自动移除消息
      setTimeout(() => {
        this.removeMessage(id)
      }, 3000)
    },

    // 移除消息
    removeMessage(id) {
      const message = this.messages.find(m => m.id === id)
      if (message) {
        message.animation = 'slideOut 0.3s ease-out forwards'
        setTimeout(() => {
          this.messages = this.messages.filter(m => m.id !== id)
        }, 300)
      }
    }
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: #f8f9fa;
  color: #212529;
}

.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* 头部样式 */
.app-header {
  background: linear-gradient(135deg, #4299e1 0%, #3182ce 100%);
  color: white;
  padding: 24px 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

.logo-section {
  display: flex;
  align-items: center;
  gap: 16px;
}

.logo-icon {
  font-size: 48px;
}

.logo-text h1 {
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 4px;
  letter-spacing: -0.5px;
}

.logo-text p {
  font-size: 14px;
  opacity: 0.9;
  font-weight: 400;
}

/* 主要内容 */
.app-main {
  flex: 1;
  padding: 32px 0;
}

.main-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

.operations-panel {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  overflow: hidden;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .app-header {
    padding: 16px 0;
  }

  .header-content {
    padding: 0 16px;
  }

  .logo-section {
    gap: 12px;
  }

  .logo-icon {
    font-size: 36px;
  }

  .logo-text h1 {
    font-size: 22px;
  }

  .logo-text p {
    font-size: 12px;
  }

  .app-main {
    padding: 24px 0;
  }

  .main-content {
    padding: 0 16px;
  }
}

@media (max-width: 480px) {
  .logo-text h1 {
    font-size: 20px;
  }

  .logo-text p {
    font-size: 11px;
  }
}
</style>