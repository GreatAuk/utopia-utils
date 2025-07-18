# useFakeProgress

用于创建一个可控制的假进度条，常用于文件上传、数据加载等需要显示进度的场景。

## 功能

- 自动递增进度
- 手动控制进度
- 自定义进度递增算法
- 进度变化和完成时的回调函数

## 使用场景

- 文件上传/下载进度显示
- 异步数据加载过程中的进度提示
- 页面预加载指示器

## 基础用法

```ts
import { useFakeProgress } from '@utopia-utils/vueuse'

// 基础用法
const { progress, startProgress, doneProgress } = useFakeProgress()

// 开始自动递增
startProgress()

// 当异步操作完成时，将进度设为100%
doneProgress()
```

## 在 Vue 中使用

```vue
<script setup>
import { useFakeProgress } from '@utopia-utils/vueuse'

const { progress, startProgress, stopProgress, doneProgress } = useFakeProgress()

// 自动开始进度
startProgress()

// 假设某个异步操作完成后，设置进度为100%
setTimeout(() => {
  doneProgress()
}, 3000)
</script>

<template>
  <div>
    <div class="progress-bar" :style="{width: `${progress * 100}%`}"></div>
    <div>{{ Math.floor(progress * 100) }}%</div>

    <button @click="startProgress">开始</button>
    <button @click="stopProgress">暂停</button>
    <button @click="doneProgress">完成</button>
  </div>
</template>
```

## 高级用法

```ts
// 自定义配置
const {
  progress,
  startProgress,
  stopProgress,
  doneProgress,
  incProgress,
  resetProgress,
  setProgress
} = useFakeProgress({
  minimum: 0.1,       // 起始进度为10%
  maximum: 0.95,      // 自动递增最高到95%
  speed: 500,         // 每500ms更新一次进度
  // 自定义递增量计算函数
  amount: (p) => (1 - p) * 0.05,
  onProgress: (p) => console.log('当前进度:', p),
  onFinish: () => console.log('进度完成!')
})

// 手动设置进度
setProgress(0.5)      // 设置为50%

// 手动递增进度
incProgress(0.1)      // 递增10%

// 重置进度
resetProgress()
```

## 类型定义

### 配置选项

```ts
interface Options {
  /** 进度最小值, 默认是 0.08 (8%)，进度条从8%开始 */
  minimum?: number
  /** 进度最大值, 默认是 0.99 (99%)，需要100%时调用 doneProgress */
  maximum?: number
  /** 自动递增的时间间隔，单位毫秒，默认 800ms */
  speed?: number
  /** 自定义进度递增量计算函数，接收当前进度返回递增量 */
  amount?: (progress: number) => number
  /** 进度变化时的回调函数 */
  onProgress?: (progress: number) => void
  /** 进度完成时的回调函数 */
  onFinish?: () => void
}
```

### 返回值

```ts
interface UseFakeProgressReturn {
  /** 当前进度值（响应式的，范围0-1） */
  progress: Ref<number>
  /** 开始自动递增进度 */
  startProgress: () => void
  /** 停止自动递增 */
  stopProgress: () => void
  /** 设置进度到指定值（0-1之间） */
  setProgress: (progress: number) => void
  /** 递增进度，可选参数指定递增量 */
  incProgress: (amount?: number) => void
  /** 完成进度（设为100%并触发onFinish回调） */
  doneProgress: () => void
  /** 重置进度（设为0并停止） */
  resetProgress: () => void
}
```

## 原理说明

`useFakeProgress` 内部使用定时器实现进度的自动递增，并会根据当前进度值动态计算递增量，使进度增长呈现一种逐渐减缓的效果，更符合用户对加载过程的直观感受。

默认情况下：
- 进度起始值为8%，不会从0开始
- 自动递增最高到99%，需调用 `doneProgress()` 才会到达100%
- 递增量会随着进度增加而减小，模拟真实加载过程

组件在卸载时会自动清除定时器，避免内存泄漏。
