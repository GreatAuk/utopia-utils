/** @vitest-environment happy-dom */
import { effectScope, nextTick, ref } from 'vue'
import { useDelayedLoading } from './index'

describe('useDelayedLoading', () => {
  vi.useFakeTimers()

  afterEach(() => {
    vi.clearAllTimers()
    vi.restoreAllMocks()
  })

  describe('初始化', () => {
    it('应该使用默认值初始化', () => {
      const loading = ref(false)
      const { loadingDelayed } = useDelayedLoading(loading)

      expect(loadingDelayed.value).toBe(false)
    })

    it('应该返回 loadingDelayed 和 cleanup 方法', () => {
      const loading = ref(false)
      const result = useDelayedLoading(loading)

      expect(result).toHaveProperty('loadingDelayed')
      expect(typeof result.cleanup).toBe('function')
    })
  })

  describe('快速请求（< delay）', () => {
    it('应该在请求快速完成时不显示 loadingDelayed', async () => {
      const loading = ref(false)
      const { loadingDelayed } = useDelayedLoading(loading, { delay: 300 })

      /* 开始加载 */
      loading.value = true
      await nextTick()

      /* 在 delay 前结束 */
      vi.advanceTimersByTime(200)
      loading.value = false
      await nextTick()

      /* loadingDelayed 不应被显示 */
      expect(loadingDelayed.value).toBe(false)

      vi.advanceTimersByTime(500)
      expect(loadingDelayed.value).toBe(false)
    })
  })

  describe('慢速请求（>= delay）', () => {
    it('应该在 delay 后显示 loadingDelayed', async () => {
      const loading = ref(false)
      const { loadingDelayed } = useDelayedLoading(loading, { delay: 300 })

      /* 开始加载 */
      loading.value = true
      await nextTick()

      /* delay 前不显示 */
      vi.advanceTimersByTime(299)
      expect(loadingDelayed.value).toBe(false)

      /* delay 后显示 */
      vi.advanceTimersByTime(1)
      expect(loadingDelayed.value).toBe(true)
    })

    it('应该在请求结束后隐藏 loadingDelayed', async () => {
      const loading = ref(false)
      const { loadingDelayed } = useDelayedLoading(loading, { delay: 300, minDisplayTime: 200 })

      loading.value = true
      await nextTick()

      /* delay 后显示 */
      vi.advanceTimersByTime(300)
      expect(loadingDelayed.value).toBe(true)

      /* 再过 200ms，满足 minDisplayTime */
      vi.advanceTimersByTime(200)

      /* 结束加载 */
      loading.value = false
      await nextTick()

      /* 应该立即隐藏（因为已满足 minDisplayTime） */
      expect(loadingDelayed.value).toBe(false)
    })
  })

  describe('最小显示时长（minDisplayTime）', () => {
    it('应该确保 loadingDelayed 至少显示 minDisplayTime', async () => {
      const loading = ref(false)
      const { loadingDelayed } = useDelayedLoading(loading, {
        delay: 300,
        minDisplayTime: 500,
      })

      /* 开始加载 */
      loading.value = true
      await nextTick()

      /* delay 后显示 */
      vi.advanceTimersByTime(300)
      expect(loadingDelayed.value).toBe(true)

      /* 再过 50ms 后结束加载（距离显示仅 50ms，< minDisplayTime） */
      vi.advanceTimersByTime(50)
      loading.value = false
      await nextTick()

      /* loadingDelayed 不应立即隐藏 */
      expect(loadingDelayed.value).toBe(true)

      /* 剩余时间 450ms - 1 */
      vi.advanceTimersByTime(450 - 1)
      expect(loadingDelayed.value).toBe(true)

      /* 剩余时间满足后隐藏 */
      vi.advanceTimersByTime(1)
      expect(loadingDelayed.value).toBe(false)
    })

    it('应该在已满足 minDisplayTime 时立即隐藏', async () => {
      const loading = ref(false)
      const { loadingDelayed } = useDelayedLoading(loading, {
        delay: 300,
        minDisplayTime: 500,
      })

      loading.value = true
      await nextTick()

      /* delay 后显示 */
      vi.advanceTimersByTime(300)
      expect(loadingDelayed.value).toBe(true)

      /* 再过 500ms（已满足 minDisplayTime） */
      vi.advanceTimersByTime(500)

      /* 结束加载 */
      loading.value = false
      await nextTick()

      /* 应该立即隐藏 */
      expect(loadingDelayed.value).toBe(false)
    })
  })

  describe('多次切换 loading 状态', () => {
    it('应该处理 loading 多次快速切换', async () => {
      const loading = ref(false)
      const { loadingDelayed } = useDelayedLoading(loading, { delay: 300, minDisplayTime: 200 })

      /* 第一次切换 */
      loading.value = true
      await nextTick()
      loading.value = false
      await nextTick()

      vi.advanceTimersByTime(400)
      expect(loadingDelayed.value).toBe(false)

      /* 第二次切换 */
      loading.value = true
      await nextTick()
      vi.advanceTimersByTime(300)
      expect(loadingDelayed.value).toBe(true)

      vi.advanceTimersByTime(200)

      loading.value = false
      await nextTick()
      expect(loadingDelayed.value).toBe(false)
    })

    it('应该在 delay 期间多次切换时正确清理定时器', async () => {
      const loading = ref(false)
      const { loadingDelayed } = useDelayedLoading(loading, { delay: 300 })

      loading.value = true
      await nextTick()
      vi.advanceTimersByTime(100)

      loading.value = false
      await nextTick()
      vi.advanceTimersByTime(100)

      loading.value = true
      await nextTick()
      vi.advanceTimersByTime(100)

      /* 应该重新计时 */
      expect(loadingDelayed.value).toBe(false)

      vi.advanceTimersByTime(200)
      expect(loadingDelayed.value).toBe(true)
    })
  })

  describe('响应式参数（MaybeRefOrGetter）', () => {
    it('应该支持 delay 为 ref', async () => {
      const loading = ref(false)
      const delayRef = ref(200)
      const { loadingDelayed } = useDelayedLoading(loading, { delay: delayRef })

      loading.value = true
      await nextTick()

      vi.advanceTimersByTime(200)
      expect(loadingDelayed.value).toBe(true)
    })

    it('应该支持 delay 为 getter 函数', async () => {
      const loading = ref(false)
      const delayValueRef = ref(200)
      const { loadingDelayed } = useDelayedLoading(loading, {
        delay: () => delayValueRef.value,
      })

      loading.value = true
      await nextTick()

      vi.advanceTimersByTime(200)
      expect(loadingDelayed.value).toBe(true)
    })

    it('应该支持 minDisplayTime 为 ref', async () => {
      const loading = ref(false)
      const minDisplayTimeRef = ref(400)
      const { loadingDelayed } = useDelayedLoading(loading, {
        delay: 100,
        minDisplayTime: minDisplayTimeRef,
      })

      loading.value = true
      await nextTick()

      vi.advanceTimersByTime(100)
      expect(loadingDelayed.value).toBe(true)

      vi.advanceTimersByTime(50)
      loading.value = false
      await nextTick()

      /* 剩余 350ms */
      vi.advanceTimersByTime(349)
      expect(loadingDelayed.value).toBe(true)

      vi.advanceTimersByTime(1)
      expect(loadingDelayed.value).toBe(false)
    })

    it('应该支持 minDisplayTime 为 getter 函数', async () => {
      const loading = ref(false)
      const minDisplayTimeValueRef = ref(300)
      const { loadingDelayed } = useDelayedLoading(loading, {
        delay: 100,
        minDisplayTime: () => minDisplayTimeValueRef.value,
      })

      loading.value = true
      await nextTick()

      vi.advanceTimersByTime(100)
      expect(loadingDelayed.value).toBe(true)

      vi.advanceTimersByTime(50)
      loading.value = false
      await nextTick()

      /* 剩余 250ms */
      vi.advanceTimersByTime(249)
      expect(loadingDelayed.value).toBe(true)

      vi.advanceTimersByTime(1)
      expect(loadingDelayed.value).toBe(false)
    })
  })

  describe('cleanup 方法', () => {
    it('应该手动清理所有定时器', async () => {
      const loading = ref(false)
      const { loadingDelayed, cleanup } = useDelayedLoading(loading, { delay: 300 })

      loading.value = true
      await nextTick()

      vi.advanceTimersByTime(100)

      cleanup()

      /* 继续推进时间，loadingDelayed 不应变化 */
      vi.advanceTimersByTime(500)
      expect(loadingDelayed.value).toBe(false)
    })

    it('应该在未启动时调用不产生副作用', () => {
      const loading = ref(false)
      const { cleanup } = useDelayedLoading(loading)

      cleanup()
      /* 不应抛出错误 */
    })
  })

  describe('边界情况', () => {
    it('应该处理 loading 立即 true 再立即 false', async () => {
      const loading = ref(false)
      const { loadingDelayed } = useDelayedLoading(loading, { delay: 300 })

      loading.value = true
      await nextTick()
      loading.value = false
      await nextTick()

      vi.advanceTimersByTime(500)
      expect(loadingDelayed.value).toBe(false)
    })

    it('应该处理 delay 为 0 的情况', async () => {
      const loading = ref(false)
      const { loadingDelayed } = useDelayedLoading(loading, { delay: 0 })

      loading.value = true
      await nextTick()

      vi.advanceTimersByTime(0)
      expect(loadingDelayed.value).toBe(true)
    })

    it('应该处理 minDisplayTime 为 0 的情况', async () => {
      const loading = ref(false)
      const { loadingDelayed } = useDelayedLoading(loading, {
        delay: 100,
        minDisplayTime: 0,
      })

      loading.value = true
      await nextTick()

      vi.advanceTimersByTime(100)
      expect(loadingDelayed.value).toBe(true)

      loading.value = false
      await nextTick()

      /* 应该立即隐藏 */
      expect(loadingDelayed.value).toBe(false)
    })
  })

  describe('清理逻辑', () => {
    it('应该在 effectScope dispose 时自动清理', async () => {
      const scope = effectScope()

      let loading: any
      let loadingDelayed: any

      scope.run(() => {
        loading = ref(false)
        const result = useDelayedLoading(loading, { delay: 300 })
        loadingDelayed = result.loadingDelayed
      })

      loading.value = true
      await nextTick()

      vi.advanceTimersByTime(100)

      /* effectScope dispose 应该自动调用 cleanup */
      scope.stop()

      /* 继续推进时间，loadingDelayed 不应变化 */
      vi.advanceTimersByTime(500)
      expect(loadingDelayed.value).toBe(false)
    })
  })

  describe('完整流程测试', () => {
    it('应该正确处理完整的 loading 流程', async () => {
      const loading = ref(false)
      const { loadingDelayed } = useDelayedLoading(loading, {
        delay: 300,
        minDisplayTime: 500,
      })

      /* 初始状态 */
      expect(loadingDelayed.value).toBe(false)

      /* 开始加载 */
      loading.value = true
      await nextTick()

      /* delay 前不显示 */
      vi.advanceTimersByTime(200)
      expect(loadingDelayed.value).toBe(false)

      /* delay 后显示 */
      vi.advanceTimersByTime(100)
      expect(loadingDelayed.value).toBe(true)

      /* 再过 200ms 后结束加载（距离显示 200ms，< minDisplayTime） */
      vi.advanceTimersByTime(200)
      loading.value = false
      await nextTick()

      /* 还需要显示 300ms */
      expect(loadingDelayed.value).toBe(true)

      vi.advanceTimersByTime(299)
      expect(loadingDelayed.value).toBe(true)

      vi.advanceTimersByTime(1)
      expect(loadingDelayed.value).toBe(false)
    })
  })
})
