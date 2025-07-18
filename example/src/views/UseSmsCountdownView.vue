<script setup lang='ts'>
import { ref, computed } from 'vue'
import { useSmsCountdown } from '@utopia-utils/vueuse'

// 手机号输入
const phone = ref('')
// 验证手机号是否有效
const phoneValid = computed(() => /^1[3-9]\d{9}$/.test(phone.value))

// 基础用法
const { counts, canSend, text, startCountdown, stopCountdown } = useSmsCountdown({
  totalSecond: 60,
  sendAble: phoneValid, // 手机号合法时才能发送
  startText: '发送验证码',
  durationText: '%s秒后可重新发送'
})

// 自定义配置示例
const {
  counts: customCounts,
  canSend: customCanSend,
  text: customText,
  startCountdown: startCustomCountdown,
  stopCountdown: stopCustomCountdown
} = useSmsCountdown({
  totalSecond: 10, // 更短的倒计时
  startText: '获取验证码',
  durationText: '请等待%s秒'
})

// 模拟发送短信 API
async function sendSmsApi(phoneNumber: string): Promise<void> {
  return new Promise((resolve, reject) => {
    // 模拟API调用延迟
    setTimeout(() => {
      // 模拟成功/失败条件
      if (phoneNumber.length === 11) {
        console.log(`短信已发送到 ${phoneNumber}`)
        resolve()
      } else {
        reject(new Error('无效的手机号码'))
      }
    }, 2000)
  })
}

// 处理发送短信
async function handleSendSms() {
  try {
    await sendSmsApi(phone.value)
    startCountdown() // 发送成功后开始倒计时
  } catch (error) {
    console.error('发送失败:', error)
    // 发送失败时停止倒计时
    stopCountdown()
    alert('发送失败，请重试')
  }
}

// 演示自定义配置
async function handleCustomSendSms() {
  startCustomCountdown()
}

// 手动停止倒计时（如页面关闭或用户取消）
function handleStopCountdown() {
  stopCountdown()
}
</script>

<template>
  <div>
    <h1>UseSmsCountdownView</h1>

    <div class="demo-section">
      <h2>标准用法</h2>
      <div class="input-group">
        <input v-model="phone" placeholder="请输入手机号" type="tel" maxlength="11" />
        <button :disabled="!canSend" @click="handleSendSms" class="send-button">
          {{ text }}
        </button>
      </div>
      <div class="info">
        <p>倒计时: {{ counts }}秒</p>
        <p>验证状态: {{ phoneValid ? '手机号有效' : '请输入有效手机号' }}</p>
        <p>可发送状态: {{ canSend ? '可发送' : '不可发送' }}</p>
      </div>
      <div class="control-buttons">
        <button @click="handleStopCountdown">手动停止倒计时</button>
      </div>
    </div>

    <div class="demo-section">
      <h2>自定义配置（10秒倒计时）</h2>
      <button :disabled="!customCanSend" @click="handleCustomSendSms" class="send-button">
        {{ customText }}
      </button>
      <div class="info">
        <p>倒计时: {{ customCounts }}秒</p>
        <p>可发送状态: {{ customCanSend ? '可发送' : '不可发送' }}</p>
      </div>
      <div class="control-buttons">
        <button @click="stopCustomCountdown">停止倒计时</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.demo-section {
  margin-bottom: 2rem;
  padding: 1rem;
  border: 1px solid #eee;
  border-radius: 8px;
}

.input-group {
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
}

input {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  flex: 1;
}

.send-button {
  min-width: 120px;
  background-color: #4caf50;
  color: white;
}

.send-button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

button {
  padding: 0.5rem 1rem;
  border-radius: 4px;
  border: 1px solid #ccc;
  cursor: pointer;
}

.control-buttons {
  margin-top: 1rem;
}

.info {
  margin-top: 1rem;
  padding: 0.5rem;
  background-color: #f5f5f5;
  border-radius: 4px;
}

p {
  margin: 0.5rem 0;
}
</style>
