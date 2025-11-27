<template>
  <div class="message-toast-container" v-if="messages.length > 0">
    <div
      v-for="message in messages"
      :key="message.id"
      class="message-toast"
      :class="message.type"
      :style="{
        animation: message.animation
      }"
    >
      <div class="toast-icon">{{ getIcon(message.type) }}</div>
      <div class="toast-content">
        <div class="toast-message">{{ message.text }}</div>
        <div v-if="message.details" class="toast-details">{{ message.details }}</div>
      </div>
      <button class="toast-close" @click="removeMessage(message.id)">×</button>
      <div class="toast-progress" :style="{ animationDuration: `${message.duration}ms` }"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MessageToast',
  props: {
    messages: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    removeMessage(id) {
      this.$emit('remove', id)
    },
    getIcon(type) {
      const icons = {
        success: '✅',
        error: '❌',
        warning: '⚠️',
        info: 'ℹ️'
      }
      return icons[type] || 'ℹ️'
    }
  }
}
</script>

<style scoped>
.message-toast-container {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 2000;
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 400px;
}

.message-toast {
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 16px 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  border-left: 4px solid #e9ecef;
  min-width: 300px;
  animation: slideIn 0.3s ease-out;
}

.message-toast.success {
  border-left-color: #42b983;
  background: #f8fff9;
}

.message-toast.error {
  border-left-color: #e53e3e;
  background: #fff5f5;
}

.message-toast.warning {
  border-left-color: #ed8936;
  background: #fffaf0;
}

.message-toast.info {
  border-left-color: #4299e1;
  background: #f7fbff;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideOut {
  from {
    opacity: 1;
    transform: translateX(0);
  }
  to {
    opacity: 0;
    transform: translateX(100%);
  }
}

.toast-icon {
  font-size: 20px;
  margin-top: 2px;
  flex-shrink: 0;
}

.toast-content {
  flex: 1;
  min-width: 0;
}

.toast-message {
  font-size: 14px;
  font-weight: 500;
  color: #212529;
  margin-bottom: 4px;
  line-height: 1.4;
}

.toast-details {
  font-size: 13px;
  color: #6c757d;
  line-height: 1.3;
  word-wrap: break-word;
}

.toast-close {
  position: absolute;
  top: 8px;
  right: 8px;
  width: 24px;
  height: 24px;
  border: none;
  background: transparent;
  color: #6c757d;
  font-size: 20px;
  cursor: pointer;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
}

.toast-close:hover {
  background: #f8f9fa;
  color: #495057;
}

.toast-progress {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 3px;
  background: #e9ecef;
  border-radius: 0 0 0 4px;
  animation: progress 3000ms linear forwards;
}

.message-toast.success .toast-progress {
  background: #42b983;
}

.message-toast.error .toast-progress {
  background: #e53e3e;
}

.message-toast.warning .toast-progress {
  background: #ed8936;
}

.message-toast.info .toast-progress {
  background: #4299e1;
}

@keyframes progress {
  from {
    width: 100%;
  }
  to {
    width: 0;
  }
}

@media (max-width: 768px) {
  .message-toast-container {
    top: 16px;
    right: 16px;
    left: 16px;
    max-width: none;
  }

  .message-toast {
    min-width: auto;
    width: 100%;
    padding: 12px 16px;
  }

  .toast-message {
    font-size: 13px;
  }

  .toast-details {
    font-size: 12px;
  }
}
</style>