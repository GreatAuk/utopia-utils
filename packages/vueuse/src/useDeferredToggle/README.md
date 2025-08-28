# useDeferredToggle

> 在 Vue 组件中防止“闪烁”显示/隐藏的 Hook。

## 何时使用

当你需要在界面上展示某种遮罩、Loading、提示条等，但又担心请求过快导致闪现时，可以使用 `useDeferredToggle` 控制其显示/隐藏：

1. **延迟显示**：在 `delay` 毫秒(默认 `300ms`)内，如果操作完成，则不会显示遮罩。
2. **最短展示时长**：一旦真正显示后，至少展示 `minDisplayTime` 毫秒(默认 `500ms`)再隐藏，避免“刚出现就消失”的突兀体验。

## 安装

```bash
pnpm add @utopia-utils/vueuse
```

## 使用示例

```vue
<script setup lang="ts">
import { useDeferredToggle } from '@utopia-utils/vueuse'

const { open, hide } = useDeferredToggle(
  () => uni.showLoading({ title: '加载中...' }),
  () => uni.hideLoading({
    noConflict: true, // 微信小程序中避免与 toast 冲突
  }),
  { delay: 300, minDisplayTime: 500 },
)

async function fetchData() {
  try {
    open()
    await apiCall()
  } finally {
    hide()
  }
}
</script>

<template>
  <button @click="fetchData">load</button>
</template>
```

## API

### `useDeferredToggle(openFn, hideFn, options?)`

| 参数          | 说明                              | 类型                              | 默认值 |
| ------------- | --------------------------------- | --------------------------------- | ------ |
| `openFn`      | 真正执行“显示”的函数 (例如 uni.showLoading) | `AnyFn` | —      |
| `hideFn`      | 真正执行“隐藏”的函数 (例如 uni.hideLoading) | `AnyFn` | —      |
| `options`     | 延迟与最短展示配置，可选          | `DeferredToggleOptions`           | —      |

### `DeferredToggleOptions`

| 属性            | 说明                                       | 类型     | 默认值 |
| --------------- | ------------------------------------------ | -------- | ------ |
| `delay`         | 延迟触发 `open` 的时间(ms)                 | `number` | 300    |
| `minDisplayTime`| `open` 真正触发后最短展示时长(ms)         | `number` | 500    |

### 返回值

| 属性     | 说明                                       | 类型         |
| -------- | ------------------------------------------ | ------------ |
| `open`   | 触发“显示”逻辑（可能被延迟）                   | `AnyFn` |
| `hide`   | 触发“隐藏”逻辑（可能被延迟以保证最短展示时长）  | `AnyFn` |
| `cancel` | 立即终止所有计时器并重置(`hide` 不被触发)   | `() => void` |
