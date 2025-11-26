<template>
  <div>
    <header class="header">
      <h1>文件上传系统</h1>
      <p>支持多文件上传，最大文件大小 10MB</p>
    </header>

    <div class="upload-section">
      <!-- 消息提示 -->
      <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
      <div v-if="successMessage" class="success-message">{{ successMessage }}</div>

      <!-- 文件选择和上传 -->
      <div>
        <input
          id="fileInput"
          ref="fileInput"
          type="file"
          multiple
          @change="handleFileSelect"
          accept=".jpg,.jpeg,.png,.gif,.pdf"
          style="display: none;"
        />
        <button @click="$refs.fileInput.click()" class="file-input-label">选择文件</button>
      </div>

      <button
        class="upload-btn"
        :disabled="selectedFiles.length === 0 || isUploading"
        @click="uploadFiles"
      >
        {{ isUploading ? '上传中...' : '上传文件' }}
      </button>

      <!-- 选中文件列表 -->
      <div v-if="selectedFiles.length > 0" class="file-list">
        <h3>已选择 {{ selectedFiles.length }} 个文件</h3>
        <div v-for="file in selectedFiles" :key="file.id" class="file-item">
          <div class="file-info">
            <div :class="getFileTypeClass(file.type)" class="file-type-icon">
              {{ getFileIcon(file.type) }}
            </div>
            <div class="file-details">
              <h4>{{ file.name }}</h4>
              <div class="file-size">{{ formatFileSize(file.size) }}</div>
            </div>
          </div>
          <div class="file-status" :class="file.statusClass">
            {{ file.statusText }}
          </div>
        </div>

        <!-- 总体上传进度 -->
        <div v-if="isUploading" class="progress-bar">
          <div class="progress-fill" :style="{ width: uploadProgress + '%' }"></div>
        </div>
      </div>
    </div>

    <!-- 已上传文件列表 -->
    <div class="files-section">
      <h2>已上传文件</h2>
      <button class="btn-refresh" @click="fetchFiles">刷新列表</button>

      <div v-if="uploadedFiles.length > 0" class="file-list">
        <div v-for="file in uploadedFiles" :key="file.filename" class="file-item">
          <div class="file-info">
            <div :class="getFileTypeClassByExtension(file.filename)" class="file-type-icon">
              {{ getFileIconByExtension(file.filename) }}
            </div>
            <div class="file-details">
              <h4>{{ file.filename }}</h4>
              <div class="file-size">{{ formatFileSize(file.size) }}</div>
              <div class="file-date">
                上传时间: {{ formatDate(file.createdAt) }}
              </div>
            </div>
          </div>
          <div class="action-buttons">
            <button class="btn btn-download" @click="downloadFile(file.filename)">
              下载
            </button>
            <button class="btn btn-delete" @click="deleteFile(file.filename)">
              删除
            </button>
          </div>
        </div>
      </div>

      <div v-else-if="!isLoadingFiles" class="empty-state">
        <p>暂无上传的文件</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'FileUploadApp',
  data() {
    return {
      selectedFiles: [],
      uploadedFiles: [],
      isUploading: false,
      uploadProgress: 0,
      errorMessage: '',
      successMessage: '',
      isLoadingFiles: false,
      serverUrl: ''
    }
  },

  mounted() {
    this.fetchFiles()
  },

  methods: {
    // 处理文件选择
    handleFileSelect(event) {
      const files = Array.from(event.target.files)
      this.selectedFiles = files.map(file => ({
        id: Date.now() + Math.random(),
        file: file,
        name: file.name,
        size: file.size,
        type: file.type,
        status: 'pending',
        statusText: '等待上传',
        statusClass: 'status-pending'
      }))

      this.errorMessage = ''
      this.successMessage = ''
    },

    // 上传文件
    async uploadFiles() {
      if (this.selectedFiles.length === 0) return

      // 验证文件大小
      const oversizedFiles = this.selectedFiles.filter(file => file.size > 10 * 1024 * 1024)
      if (oversizedFiles.length > 0) {
        this.errorMessage = `以下文件超过 10MB 限制: ${oversizedFiles.map(f => f.name).join(', ')}`
        return
      }

      this.isUploading = true
      this.errorMessage = ''
      this.successMessage = ''
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

        // 更新文件状态
        this.selectedFiles.forEach(file => {
          file.status = 'success'
          file.statusText = '上传成功'
          file.statusClass = 'status-success'
        })

        this.successMessage = `成功上传 ${response.data.files.length} 个文件`
        this.selectedFiles = []

        // 清空文件输入
        if (this.$refs.fileInput) {
          this.$refs.fileInput.value = ''
        }

        // 刷新文件列表
        this.fetchFiles()

      } catch (error) {
        console.error('上传失败:', error)

        // 更新文件状态
        this.selectedFiles.forEach(file => {
          file.status = 'error'
          file.statusText = '上传失败'
          file.statusClass = 'status-error'
        })

        if (error.response) {
          this.errorMessage = error.response.data.error || '上传失败'
        } else {
          this.errorMessage = '网络错误，请检查服务器连接'
        }
      } finally {
        this.isUploading = false
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
        this.errorMessage = '无法获取文件列表，请检查服务器连接'
      } finally {
        this.isLoadingFiles = false
      }
    },

    // 下载文件
    async downloadFile(filename) {
      try {
        const response = await axios.get(`/api/download/${filename}`, {
          responseType: 'blob'
        })

        // 创建下载链接
        const url = window.URL.createObjectURL(new Blob([response.data]))
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', filename)
        document.body.appendChild(link)
        link.click()
        link.remove()
        window.URL.revokeObjectURL(url)
      } catch (error) {
        console.error('下载失败:', error)
        this.errorMessage = '下载失败，请重试'
      }
    },

    // 删除文件
    async deleteFile(filename) {
      if (!confirm(`确定要删除文件 "${filename}" 吗？`)) return

      try {
        await axios.delete(`/api/files/${filename}`)
        this.successMessage = '文件删除成功'
        this.fetchFiles()
      } catch (error) {
        console.error('删除失败:', error)
        this.errorMessage = '删除失败，请重试'
      }
    },

    // 格式化文件大小
    formatFileSize(bytes) {
      if (bytes === 0) return '0 Bytes'
      const k = 1024
      const sizes = ['Bytes', 'KB', 'MB', 'GB']
      const i = Math.floor(Math.log(bytes) / Math.log(k))
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
    },

    // 格式化日期
    formatDate(dateString) {
      const date = new Date(dateString)
      return date.toLocaleString('zh-CN')
    },

    // 获取文件图标
    getFileIcon(mimeType) {
      if (mimeType.startsWith('image/')) return '🖼️'
      if (mimeType === 'application/pdf') return '📄'
      return '📁'
    },

    // 根据扩展名获取文件图标
    getFileIconByExtension(filename) {
      const ext = filename.split('.').pop().toLowerCase()
      if (['jpg', 'jpeg', 'png', 'gif'].includes(ext)) return '🖼️'
      if (ext === 'pdf') return '📄'
      return '📁'
    },

    // 获取文件类型样式类
    getFileTypeClass(mimeType) {
      if (mimeType.startsWith('image/')) return 'file-type-icon image-type'
      if (mimeType === 'application/pdf') return 'file-type-icon pdf-type'
      return 'file-type-icon unknown-type'
    },

    // 根据扩展名获取文件类型样式类
    getFileTypeClassByExtension(filename) {
      const ext = filename.split('.').pop().toLowerCase()
      if (['jpg', 'jpeg', 'png', 'gif'].includes(ext)) return 'file-type-icon image-type'
      if (ext === 'pdf') return 'file-type-icon pdf-type'
      return 'file-type-icon unknown-type'
    }
  }
}
</script>