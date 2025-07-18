<template>
  <div class="delayed-loading-demo">
    <h1>useDelayedLoading 演示</h1>

    <div class="demo-section">
      <h2>基本使用</h2>
      <div class="demo-card">
        <div class="demo-controls">
          <button @click="startLoading" :disabled="loading">开始加载 ({{ requestTime }}ms)</button>
          <div class="loading-config">
            <label>
              是否使用 useDelayedLoading 优化 loading 的显示:
              <input type="checkbox" v-model="isOptimized" />
            </label>
            <label>
              请求时间:
              <input type="range" v-model="requestTime" min="100" max="3000" step="100" />
              {{ requestTime }}ms
            </label>
            <label>
              延迟显示:
              <input type="range" v-model="delay" min="0" max="1000" step="100" />
              {{ delay }}ms
            </label>
            <label>
              最小显示时间:
              <input type="range" v-model="minDisplayTime" min="0" max="2000" step="100" />
              {{ minDisplayTime }}ms
            </label>
          </div>
        </div>

        <div class="result-display">
          <div class="status-info">
            <div class="status-item">
              <span>加载状态 (loading):</span>
              <span :class="{ 'status-active': loading }">{{ loading ? '加载中' : '空闲' }}</span>
            </div>
            <div class="status-item">
              <span>延迟加载状态 (loadingDelayed):</span>
              <span :class="{ 'status-active': loadingDelayed }">{{ loadingDelayed ? '显示' : '隐藏' }}</span>
            </div>
          </div>
          <div class="loading-container">
            <div v-if="isOptimized ? loadingDelayed : loading" class="loading-spinner"></div>
            <div v-else class="content">{{ content }}, 本次 loading 显示时间: {{ useTime }}ms</div>
          </div>
        </div>
      </div>
    </div>

    <div class="code-section">
      <h2>代码示例</h2>
      <pre><code>
import { ref, onUnmounted } from 'vue'
import { useDelayedLoading } from '@utopia/vueuse'

// 创建加载状态
const loading = ref(false)

// 配置延迟加载
const { loadingDelayed, cleanup } = useDelayedLoading(loading, {
  delay: 300,         // 延迟300ms显示加载
  minDisplayTime: 500 // 最小显示500ms
})

// 模拟异步请求
const fetchData = async () => {
  loading.value = true
  try {
    await new Promise(resolve => setTimeout(resolve, 1000))
    // 获取数据...
  } finally {
    loading.value = false
  }
}

// 在组件卸载时清理计时器
onUnmounted(() => {
  cleanup()
})
      </code></pre>
    </div>

    <div class="explanation">
      <h2>说明</h2>
      <ul>
        <li><strong>加载延迟 (delay)</strong>: 当异步操作开始时，等待指定时间后再显示加载动画，避免闪烁</li>
        <li><strong>最小显示时间 (minDisplayTime)</strong>: 一旦显示加载动画，确保它至少显示指定的时间，避免过快消失造成的视觉混乱</li>
        <li><strong>清理功能 (cleanup)</strong>: 在组件卸载时调用，防止内存泄漏</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onUnmounted, watch } from 'vue'
import { useDelayedLoading } from '@utopia-utils/vueuse'

// 配置参数
const delay = ref(300)
const minDisplayTime = ref(500)
const requestTime = ref(3000)

const useTime = ref(0)

// 状态
const loading = ref(false)
const content = ref('数据已加载')
/** 是否优化 loading 的显示 */
const isOptimized = ref(true)

// 使用延迟加载Hook的函数和值
let { loadingDelayed, cleanup } = useDelayedLoading(loading, {
  delay: delay,
  minDisplayTime: minDisplayTime
})

let now = Date.now()
watch(loadingDelayed, (newVal) => {
  if (newVal) {
    now = Date.now()
  } else {
    useTime.value = Date.now() - now
  }
})

// 模拟异步请求
const startLoading = async () => {
  loading.value = true
  content.value = '加载中...'

  try {
    // 模拟API请求
    await new Promise(resolve => setTimeout(resolve, requestTime.value))
    content.value = `数据已更新 (${new Date().toLocaleTimeString()})`
  } catch (error) {
    content.value = '加载失败'
  } finally {
    loading.value = false
  }
}

// 组件卸载时清理
onUnmounted(cleanup)
</script>

<style scoped>
.delayed-loading-demo {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}

h1, h2 {
  color: #2c3e50;
}

.demo-section, .code-section, .explanation {
  margin-bottom: 30px;
  border: 1px solid #eaeaea;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  background-color: white;
}

.demo-card {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.demo-controls {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

button {
  padding: 10px 16px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}

button:hover:not(:disabled) {
  background-color: #2980b9;
}

button:disabled {
  background-color: #95a5a6;
  cursor: not-allowed;
}

.loading-config {
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: #f8f9fa;
  padding: 15px;
  border-radius: 4px;
}

label {
  display: flex;
  align-items: center;
  gap: 10px;
}

input[type="range"] {
  flex: 1;
}

.result-display {
  border: 1px dashed #ddd;
  border-radius: 4px;
  padding: 20px;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.status-info {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 10px;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
}

.status-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.status-active {
  color: #2ecc71;
  font-weight: bold;
}

.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 120px;
}

.loading-spinner {
  width: 50px;
  height: 50px;
  border: 5px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top-color: #3498db;
  animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.content {
  text-align: center;
  font-size: 18px;
}

pre {
  background-color: #f8f9fa;
  padding: 15px;
  border-radius: 4px;
  overflow-x: auto;
  font-family: 'Courier New', Courier, monospace;
  font-size: 14px;
  line-height: 1.5;
}

code {
  color: #16a085;
}

.explanation ul {
  line-height: 1.6;
}

.explanation li {
  margin-bottom: 10px;
}
</style>