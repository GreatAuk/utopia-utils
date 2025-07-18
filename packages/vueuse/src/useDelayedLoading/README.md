# useDelayedLoading

处理异步请求时 loading 的闪烁问题。

## 功能

延迟显示 loading 状态，避免短时间的加载过程中出现闪烁，并确保 loading 状态显示的最小时间，提升用户体验。

## 使用场景

- 网络请求加载数据时
- 执行可能较快完成的异步操作时
- 需要避免 loading 状态快速闪烁的情况

## 原理

1. **延迟显示** - 设置一个延迟（默认300ms），如果请求在这个时间内完成，则不显示 loading 状态
2. **最小显示时间** - 一旦显示了 loading 状态，确保它至少显示指定的最小时间（默认500ms），避免过快消失造成的视觉不适

## API

```ts
function useDelayedLoading(
  loading: Ref<boolean>,
  options?: {
    delay?: MaybeRefOrGetter<number>,
    minDisplayTime?: MaybeRefOrGetter<number>
  }
): {
  loadingDelayed: Ref<boolean>,
  cleanup: () => void
}
```

### 参数

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| loading | `Ref<boolean>` | 用于控制 loading 状态的响应式引用 |
| options | `object` | 可选配置项 |
| options.delay | `MaybeRefOrGetter<number>` | 延迟显示 loading 的毫秒数，默认为 300ms |
| options.minDisplayTime | `MaybeRefOrGetter<number>` | loading 动画的最小显示时间，默认为 500ms |

### 返回值

| 属性 | 类型 | 说明 |
| --- | --- | --- |
| loadingDelayed | `Ref<boolean>` | 经过延迟处理的 loading 状态，用于在 UI 中显示 |
| cleanup | `() => void` | 清理函数，用于手动清理定时器，防止内存泄漏 |

## 示例

### 基础用法

```vue
<script setup>
import { ref } from 'vue';
import { useDelayedLoading } from '@utopia/vueuse';

// 模拟一个异步请求的 loading 状态
const isLoading = ref(false);

// 使用 useDelayedLoading 优化 loading 状态
const { loadingDelayed } = useDelayedLoading(isLoading);

// 模拟一个请求函数
const fetchData = async () => {
  isLoading.value = true;
  try {
    // 模拟异步请求
    await new Promise(resolve => setTimeout(resolve, 1000));
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div>
    <button @click="fetchData">加载数据</button>
    <!-- 使用优化后的 loading 状态显示 loading 指示器 -->
    <div v-if="loadingDelayed">加载中...</div>
  </div>
</template>
```

### 自定义配置

```vue
<script setup>
import { ref } from 'vue';
import { useDelayedLoading } from '@utopia/vueuse';

const isLoading = ref(false);

// 自定义延迟时间和最小显示时间
const { loadingDelayed } = useDelayedLoading(isLoading, {
  delay: 500,           // 500ms 后才显示 loading
  minDisplayTime: 1000  // 一旦显示，至少显示 1000ms
});

// 模拟请求函数
const fetchData = async () => {
  isLoading.value = true;
  try {
    await new Promise(resolve => setTimeout(resolve, 2000));
  } finally {
    isLoading.value = false;
  }
};
</script>
```

## 注意事项

1. 组件卸载时会自动清理定时器，无需手动调用 `cleanup` 函数
2. 如需手动管理定时器生命周期，可以使用返回的 `cleanup` 函数
3. `delay` 和 `minDisplayTime` 参数支持响应式数据，可以动态调整
