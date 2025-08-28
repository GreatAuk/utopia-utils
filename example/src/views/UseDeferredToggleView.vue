<script setup lang='ts'>
import { ref } from 'vue'
import { useDeferredToggle } from '@utopia-utils/vueuse'
import Code from '../components/Code.vue'

// 控制页面上的遮罩元素显示/隐藏
const overlayVisible = ref(false)
const costTime = ref(0)

const { open, hide } = useDeferredToggle(
  () => { overlayVisible.value = true },
  () => { overlayVisible.value = false },
  { delay: 300, minDisplayTime: 500 },
)

async function request() {
  open()
  try {
    const time = Math.random() * 700 + 100
    // 模拟异步任务（随机 100~800ms）
    await new Promise(resolve => setTimeout(resolve, time))
    costTime.value = time
  } finally {
    hide()
  }
}
</script>

<template>
  <div>
    <h1>useDeferredToggle Demo</h1>
    <button @click="request">发送请求</button>
    <p>异步任务耗时: {{ costTime }}ms</p>

    <Code>
      <pre>
        <code>
const { open, hide } = useDeferredToggle(
  () => { overlayVisible.value = true },
  () => { overlayVisible.value = false },
  { delay: 300, minDisplayTime: 500 },
)</code>
      </pre>
    </Code>

    <!-- 简易 loading 遮罩 -->
    <div v-if="overlayVisible" class="overlay">
      <div class="loader">Loading...</div>
    </div>
  </div>
</template>

<style scoped>
button {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  border: 1px solid #ccc;
  cursor: pointer;
}
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}
.loader {
  color: #fff;
  font-size: 1.2rem;
}
</style>
