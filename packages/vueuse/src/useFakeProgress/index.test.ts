/** @vitest-environment happy-dom */
import { effectScope } from 'vue'
import { useFakeProgress } from './index'

describe('useFakeProgress', () => {
  vi.useFakeTimers()

  afterEach(() => {
    vi.clearAllTimers()
    vi.restoreAllMocks()
  })

  describe('初始化', () => {
    it('应该使用默认值初始化', () => {
      const { progress } = useFakeProgress()

      expect(progress.value).toBe(0)
    })

    it('应该返回所有控制方法', () => {
      const result = useFakeProgress()

      expect(typeof result.startProgress).toBe('function')
      expect(typeof result.stopProgress).toBe('function')
      expect(typeof result.setProgress).toBe('function')
      expect(typeof result.incProgress).toBe('function')
      expect(typeof result.doneProgress).toBe('function')
      expect(typeof result.resetProgress).toBe('function')
    })
  })

  describe('startProgress', () => {
    it('应该启动自动递增', () => {
      const { progress, startProgress } = useFakeProgress({
        minimum: 0.1,
        speed: 100,
      })

      startProgress()

      /* 第一次递增 */
      expect(progress.value).toBeGreaterThanOrEqual(0.1)
      const firstValue = progress.value

      /* 推进时间触发下一次递增 */
      vi.advanceTimersByTime(100)
      expect(progress.value).toBeGreaterThan(firstValue)
    })

    it('应该按 speed 间隔递增', () => {
      const { progress, startProgress } = useFakeProgress({
        minimum: 0.1,
        maximum: 0.9,
        speed: 500,
      })

      startProgress()
      const value1 = progress.value

      vi.advanceTimersByTime(500)
      const value2 = progress.value
      expect(value2).toBeGreaterThan(value1)

      vi.advanceTimersByTime(500)
      const value3 = progress.value
      expect(value3).toBeGreaterThan(value2)
    })

    it('应该在已启动时阻止重复启动', () => {
      const { progress, startProgress } = useFakeProgress({
        minimum: 0.1,
        speed: 100,
      })

      startProgress()
      const value1 = progress.value

      /* 重复调用不应重置 */
      startProgress()
      expect(progress.value).toBe(value1)
    })

    it('应该将进度限制在 maximum 值以内', () => {
      const { progress, startProgress } = useFakeProgress({
        minimum: 0.1,
        maximum: 0.5,
        speed: 50,
      })

      startProgress()

      /* 多次递增直到达到 maximum */
      for (let i = 0; i < 20; i++) {
        vi.advanceTimersByTime(50)
      }

      expect(progress.value).toBeLessThanOrEqual(0.5)
    })
  })

  describe('stopProgress', () => {
    it('应该停止自动递增', () => {
      const { progress, startProgress, stopProgress } = useFakeProgress({
        minimum: 0.1,
        speed: 100,
      })

      startProgress()
      vi.advanceTimersByTime(200)
      const valueBeforeStop = progress.value

      stopProgress()

      /* 继续推进时间，进度不应再变化 */
      vi.advanceTimersByTime(500)
      expect(progress.value).toBe(valueBeforeStop)
    })

    it('应该在未启动时调用不产生副作用', () => {
      const { progress, stopProgress } = useFakeProgress()

      stopProgress()
      expect(progress.value).toBe(0)
    })
  })

  describe('setProgress', () => {
    it('应该手动设置进度值', () => {
      const { progress, setProgress } = useFakeProgress()

      setProgress(0.5)
      expect(progress.value).toBe(0.5)

      setProgress(0.8)
      expect(progress.value).toBe(0.8)
    })

    it('应该将值限制在 minimum 和 maximum 范围内', () => {
      const { progress, setProgress } = useFakeProgress({
        minimum: 0.1,
        maximum: 0.9,
      })

      /* 低于 minimum */
      setProgress(0.05)
      expect(progress.value).toBe(0.1)

      /* 高于 maximum */
      setProgress(0.95)
      expect(progress.value).toBe(0.9)

      /* 在范围内 */
      setProgress(0.5)
      expect(progress.value).toBe(0.5)
    })
  })

  describe('incProgress', () => {
    it('应该增加指定的进度量', () => {
      const { progress, incProgress } = useFakeProgress({
        minimum: 0,
        maximum: 1,
      })

      incProgress(0.1)
      expect(progress.value).toBeCloseTo(0.1, 10)

      incProgress(0.2)
      expect(progress.value).toBeCloseTo(0.3, 10)
    })

    it('应该在不提供参数时使用 amount 函数计算增量', () => {
      const { progress, incProgress } = useFakeProgress({
        minimum: 0,
        maximum: 1,
        amount: () => 0.15, /* 固定增量 */
      })

      incProgress()
      expect(progress.value).toBe(0.15)

      incProgress()
      expect(progress.value).toBe(0.3)
    })

    it('应该将结果限制在 maximum 范围内', () => {
      const { progress, incProgress } = useFakeProgress({
        minimum: 0,
        maximum: 0.5,
      })

      incProgress(0.6)
      expect(progress.value).toBe(0.5)
    })
  })

  describe('doneProgress', () => {
    it('应该设置进度为 100% 并停止自动递增', () => {
      const { progress, startProgress, doneProgress } = useFakeProgress({
        speed: 100,
      })

      startProgress()
      vi.advanceTimersByTime(200)

      doneProgress()

      expect(progress.value).toBe(1)

      /* 继续推进时间，进度不应再变化 */
      vi.advanceTimersByTime(500)
      expect(progress.value).toBe(1)
    })

    it('应该触发 onFinish 回调', () => {
      const onFinishSpy = vi.fn()
      const { doneProgress } = useFakeProgress({
        onFinish: onFinishSpy,
      })

      doneProgress()

      expect(onFinishSpy).toHaveBeenCalledTimes(1)
    })
  })

  describe('resetProgress', () => {
    it('应该重置进度为 0 并停止自动递增', () => {
      const { progress, startProgress, resetProgress } = useFakeProgress({
        speed: 100,
      })

      startProgress()
      vi.advanceTimersByTime(200)

      resetProgress()

      expect(progress.value).toBe(0)

      /* 继续推进时间，进度不应再变化 */
      vi.advanceTimersByTime(500)
      expect(progress.value).toBe(0)
    })
  })

  describe('onProgress 回调', () => {
    it('应该在 setProgress 时触发', () => {
      const onProgressSpy = vi.fn()
      const { setProgress } = useFakeProgress({
        onProgress: onProgressSpy,
      })

      setProgress(0.5)

      expect(onProgressSpy).toHaveBeenCalledWith(0.5)
      expect(onProgressSpy).toHaveBeenCalledTimes(1)
    })

    it('应该在 incProgress 时触发', () => {
      const onProgressSpy = vi.fn()
      const { incProgress } = useFakeProgress({
        minimum: 0,
        maximum: 1,
        onProgress: onProgressSpy,
      })

      incProgress(0.3)

      expect(onProgressSpy).toHaveBeenCalledWith(0.3)
    })

    it('应该在 startProgress 自动递增时触发', () => {
      const onProgressSpy = vi.fn()
      const { startProgress } = useFakeProgress({
        minimum: 0.1,
        speed: 100,
        onProgress: onProgressSpy,
      })

      startProgress()
      expect(onProgressSpy).toHaveBeenCalled()

      vi.advanceTimersByTime(100)
      expect(onProgressSpy.mock.calls.length).toBeGreaterThanOrEqual(2)
    })

    it('应该在 doneProgress 时触发', () => {
      const onProgressSpy = vi.fn()
      const { doneProgress } = useFakeProgress({
        onProgress: onProgressSpy,
      })

      doneProgress()

      expect(onProgressSpy).toHaveBeenCalledWith(1)
    })

    it('应该在 resetProgress 时触发', () => {
      const onProgressSpy = vi.fn()
      const { resetProgress } = useFakeProgress({
        onProgress: onProgressSpy,
      })

      resetProgress()

      expect(onProgressSpy).toHaveBeenCalledWith(0)
    })
  })

  describe('自定义 amount 函数', () => {
    it('应该使用自定义 amount 函数计算增量', () => {
      const customAmount = vi.fn(() => {
        /* 固定增量 0.1 */
        return 0.1
      })

      const { progress, startProgress } = useFakeProgress({
        minimum: 0,
        maximum: 1,
        speed: 100,
        amount: customAmount,
      })

      startProgress()

      expect(customAmount).toHaveBeenCalledWith(0)
      expect(progress.value).toBe(0.1)

      vi.advanceTimersByTime(100)
      expect(customAmount).toHaveBeenCalledWith(0.1)
      expect(progress.value).toBe(0.2)
    })

    it('应该在 incProgress 不传参数时使用 amount 函数', () => {
      const customAmount = vi.fn(() => 0.15)

      const { progress, incProgress } = useFakeProgress({
        minimum: 0,
        maximum: 1,
        amount: customAmount,
      })

      incProgress()

      expect(customAmount).toHaveBeenCalled()
      expect(progress.value).toBe(0.15)
    })
  })

  describe('边界情况', () => {
    it('应该处理 minimum 等于 maximum 的情况', () => {
      const { progress, setProgress } = useFakeProgress({
        minimum: 0.5,
        maximum: 0.5,
      })

      setProgress(0.3)
      expect(progress.value).toBe(0.5)

      setProgress(0.7)
      expect(progress.value).toBe(0.5)
    })

    it('应该处理连续调用不同方法的情况', () => {
      const { progress, startProgress, stopProgress, setProgress, doneProgress, resetProgress }
        = useFakeProgress({
          minimum: 0,
          maximum: 1,
          speed: 100,
        })

      startProgress()
      vi.advanceTimersByTime(100)

      stopProgress()
      setProgress(0.5)
      expect(progress.value).toBe(0.5)

      doneProgress()
      expect(progress.value).toBe(1)

      resetProgress()
      expect(progress.value).toBe(0)
    })
  })

  describe('清理逻辑', () => {
    it('应该在 effectScope dispose 时停止定时器', () => {
      const scope = effectScope()

      let progress: any
      let startProgress: any

      scope.run(() => {
        const result = useFakeProgress({ speed: 100 })
        progress = result.progress
        startProgress = result.startProgress
      })

      startProgress()
      vi.advanceTimersByTime(200)
      const valueBeforeDispose = progress.value

      /* effectScope dispose 应该自动调用 stopProgress */
      scope.stop()

      /* 继续推进时间，进度不应再变化 */
      vi.advanceTimersByTime(500)
      expect(progress.value).toBe(valueBeforeDispose)
    })
  })
})
