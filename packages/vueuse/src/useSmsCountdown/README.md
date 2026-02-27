# useSmsCountdown

短信验证码倒计时的 Vue composable 函数，提供完整的验证码发送倒计时功能。

## 功能特性

- 🕒 可配置的倒计时时长
- 🎛️ 外部控制发送状态
- 📝 自定义显示文本
- 🔄 自动重置功能
- 🧹 自动清理定时器

## 安装

```bash
pnpm add @utopia/vueuse
```

## 基础用法

```vue
<template>
  <button :disabled="!canSend" @click="startCountdown">
    {{ text }}
  </button>
</template>

<script setup>
import { useSmsCountdown } from '@utopia/vueuse'

const { canSend, text, startCountdown } = useSmsCountdown()
</script>
```

## 高级用法

### 自定义配置

```vue
<template>
  <div>
    <input v-model="phone" placeholder="请输入手机号" />
    <button :disabled="!canSend" @click="handleSendSms">
      {{ text }}
    </button>
    <p>倒计时: {{ counts }}秒</p>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useSmsCountdown } from '@utopia/vueuse'

const phone = ref('')

/* 只有手机号合法时才能发送 */
const phoneValid = computed(() => /^1[3-9]\d{9}$/.test(phone.value))

const { counts, canSend, text, startCountdown, stopCountdown } = useSmsCountdown({
  totalSecond: 120, // 倒计时 2 分钟
  sendAble: phoneValid, // 手机号合法时才能发送
  startText: '发送验证码',
  durationText: '%s秒后可重新发送',
})

async function handleSendSms() {
  try {
    /* 调用发送短信 API */
    await sendSmsApi(phone.value)
    startCountdown()
  } catch (error) {
    console.error('发送失败:', error)
  }
}

/* 组件卸载时手动停止倒计时 */
function handleCancel() {
  stopCountdown()
}
</script>
```

## API

### UseSmsCountdownOptions

| 参数           | 类型                | 默认值         | 说明                                    |
| -------------- | ------------------- | -------------- | --------------------------------------- |
| `totalSecond`  | `number`            | `60`           | 倒计时总时长（秒）                      |
| `sendAble`     | `MaybeRef<boolean>` | `true`         | 是否允许发送                            |
| `startText`    | `string`            | `'获取验证码'` | 初始显示文本                            |
| `durationText` | `string`            | `'%s秒后重发'` | 倒计时期间文本，`%s` 会被替换为剩余秒数 |

### 返回值

| 属性             | 类型                   | 说明                                       |
| ---------------- | ---------------------- | ------------------------------------------ |
| `counts`         | `Ref<number>`          | 当前剩余秒数                               |
| `canSend`        | `ComputedRef<boolean>` | 是否可以发送（综合 sendAble 和倒计时状态） |
| `text`           | `ComputedRef<string>`  | 当前显示的文本                             |
| `startCountdown` | `() => void`           | 开始倒计时                                 |
| `stopCountdown`  | `() => void`           | 停止倒计时并重置                           |

## 注意事项

1. **参数验证**：`totalSecond` 必须是正整数，否则会抛出异常
2. **自动清理**：组件卸载时会自动清理定时器，无需手动处理
3. **状态控制**：只有在 `canSend` 为 `true` 时才能开始倒计时
4. **文本格式**：`durationText` 中必须包含 `%s` 占位符

## 类型定义

```typescript
export type UseSmsCountdownOptions = {
  totalSecond?: number
  sendAble?: MaybeRef<boolean>
  startText?: string
  durationText?: string
}

type UseSmsCountdownReturn = {
  counts: Ref<number>
  canSend: ComputedRef<boolean>
  text: ComputedRef<string>
  startCountdown: () => void
  stopCountdown: () => void
}
```

## 常见问题

### Q: 如何在发送失败时停止倒计时？

A: 可以调用 `stopCountdown` 方法：

```javascript
async function handleSendSms() {
  try {
    await sendSmsApi(phone.value)
    startCountdown()
  } catch (error) {
    /* 发送失败时停止倒计时 */
    stopCountdown()
    console.error('发送失败:', error)
  }
}
```

## 许可证

MIT License
