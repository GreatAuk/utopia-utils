// Implementation inspired by: https://juejin.cn/post/7449307011710894080?searchId=20250718132153BF01E630CCB4D6552FD3
import { ref, type Ref } from 'vue'

import { tryOnScopeDispose } from '../utils'

import type { TimeOut } from '@utopia-utils/type'

/**
 * useFakeProgress 配置选项
 */
interface Options {
  /** progress 最小值, 默认是 0.08 (8%)，所以进度条是从 8% 开始的
   * @default 0.08 (8%)
  */
  minimum?: number
  /** progress 最大值, 默认是 99%， 如果想最终完成（100%），可以调用 doneProgress 方法
   * @default 0.99 (99%)
  */
  maximum?: number
  /** 自动递增的时间间隔，单位毫秒
   * @default 800ms
  */
  speed?: number
  /** 自定义进度递增量计算函数，接收当前进度返回递增量 */
  amount?: (progress: number) => number
  /** 进度变化时的回调函数 */
  onProgress?: (progress: number) => void
  /** 进度完成时的回调函数 */
  onFinish?: () => void
}

/**
 * useFakeProgress 返回值类型定义
 */
interface UseFakeProgressReturn {
  /** 当前进度值 */
  progress: Ref<number>
  /** 开始自动递增进度 */
  startProgress: () => void
  /** 停止自动递增 */
  stopProgress: () => void
  /** 设置进度到指定值 */
  setProgress: (progress: number) => void
  /** 递增进度 */
  incProgress: (amount?: number) => void
  /** 完成进度 */
  doneProgress: () => void
  /** 重置进度 */
  resetProgress: () => void
}

/**
 * fake progress hook
 *
 * 用于创建一个可控制的假进度条，常用于文件上传、数据加载等场景
 * 提供自动递增、手动控制、格式化显示等功能
 *
 * @param options - 配置选项
 * @returns 返回进度状态和控制方法
 *
 * @example
 * ```typescript
 * // 基础用法
 * const { progress, startProgress, doneProgress } = useFakeProgress()
 *
 * // 自定义配置
 * const { progress, startProgress, stopProgress, doneProgress, incProgress, resetProgress, setProgress } = useFakeProgress({
 *   minimum: 0.1,
 *   maximum: 0.95,
 *   speed: 500,
 *   onProgress: (progress) => console.log('当前进度:', progress),
 *   onFinish: () => console.log('进度完成!')
 * })
 *
 * // 开始自动递增
 * startProgress()
 *
 * // 手动设置进度
 * setProgress(0.5) // 设置为50%
 *
 * // 完成进度
 * doneProgress()
 *
 * // 递增进度
 * incProgress(0.1) // 递增10%
 *
 * // 重置进度
 * resetProgress()
 *
 * // 停止自动递增
 * stopProgress()
 * ```
 *
 * @see https://github.com/GreatAuk/utopia-utils/blob/main/packages/vueuse/src/useFakeProgress/README.md
 */
export function useFakeProgress(options?: Options): UseFakeProgressReturn {
  const {
    minimum = 0.08,
    maximum = 0.99,
    speed = 800,
    amount = (p: number) => (1 - p) * clamp(Math.random() * p, minimum, maximum),
    onProgress,
    onFinish,
  } = options || {}

  /** 定时器引用，用于控制自动递增 */
  let timer: TimeOut | null = null
  /** 当前进度值 (0-1) */
  const progress = ref<number>(0)

  /**
   * 限制数值在指定范围内
   * @param value - 待限制的数值
   * @param min - 最小值
   * @param max - 最大值
   * @returns 限制后的数值
   */
  const clamp = (value: number, min: number, max: number): number => Math.min(Math.max(value, min), max)

  /**
   * 设置进度值
   * @param p - 进度值 (0-1)
   */
  const setProgress = (p: number): void => {
    progress.value = p
    onProgress?.(p)
  }

  /**
   * 执行一次进度递增
   * 根据当前进度和配置的递增算法计算新的进度值
   */
  const work = (): void => {
    const p = clamp(progress.value + amount(progress.value), minimum, maximum)
    setProgress(p)
  }

  /**
   * 开始自动递增进度
   * 启动定时器，按指定间隔自动递增进度
   * 如果已经在运行则不会重复启动
   */
  const start = (): void => {
    /**
     * 轮询执行进度递增
     */
    function pollingWork(): void {
      work()
      timer = setTimeout(pollingWork, speed)
    }

    if (!timer) {
      pollingWork()
    }
  }

  /**
   * 设置进度到指定值
   * @param p - 目标进度值 (0-1)，会被限制在 minimum 和 maximum 范围内
   */
  const set = (p: number): void => {
    setProgress(clamp(p, minimum, maximum))
  }

  /**
   * 递增进度
   * @param add - 可选的递增量，如果不提供则使用配置的 amount 函数计算
   */
  const inc = (add?: number): void => {
    set(progress.value + (add || amount(progress.value)))
  }

  /**
   * 停止自动递增
   * 清除定时器，停止进度的自动更新
   */
  const stop = (): void => {
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
  }

  /**
   * 重置进度到0并停止
   * 停止自动递增并将进度重置为初始状态
   */
  const reset = (): void => {
    stop()
    setProgress(0)
  }

  /**
   * 完成进度（设置为100%）
   * 停止自动递增，将进度设置为1（100%），并触发完成回调
   */
  const done = (): void => {
    stop()
    setProgress(1)
    onFinish?.()
  }

  /** 组件卸载时清理定时器，防止内存泄漏 */
  tryOnScopeDispose(stop)

  return {
    progress,
    startProgress: start,
    stopProgress: stop,
    setProgress: set,
    incProgress: inc,
    doneProgress: done,
    resetProgress: reset,
  }
}
