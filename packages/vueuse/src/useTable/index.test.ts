/** @vitest-environment happy-dom */
import { effectScope, nextTick } from 'vue'
import { useTable } from './index'

interface TestFilters {
  keyword?: string
  status?: string
  [key: string]: any
}

describe('useTable', () => {
  vi.useFakeTimers()

  afterEach(() => {
    vi.clearAllTimers()
    vi.restoreAllMocks()
  })

  describe('初始化', () => {
    it('应该使用默认值初始化', () => {
      const { pageSize, currentPage, sort, filters } = useTable<TestFilters>()

      expect(pageSize.value).toBe(10)
      expect(currentPage.value).toBe(1)
      expect(sort.value).toBeUndefined()
      expect(filters.value).toEqual({})
    })

    it('应该使用自定义默认值初始化', () => {
      const { pageSize, filters } = useTable<TestFilters>({
        defaultPageSize: 20,
        defaultFilters: { keyword: 'test', status: 'active' },
      })

      expect(pageSize.value).toBe(20)
      expect(filters.value).toEqual({ keyword: 'test', status: 'active' })
    })

    it('应该返回所有必要的属性和方法', () => {
      const result = useTable<TestFilters>()

      expect(result).toHaveProperty('pageSize')
      expect(result).toHaveProperty('currentPage')
      expect(result).toHaveProperty('sort')
      expect(result).toHaveProperty('filters')
      expect(result).toHaveProperty('search')
      expect(result.search).toHaveProperty('submit')
      expect(result.search).toHaveProperty('reset')
      expect(result.search).toHaveProperty('formState')
    })
  })

  describe('defaultFilters', () => {
    it('应该支持 defaultFilters 为对象', () => {
      const defaultFilters = { keyword: 'test', page: 1 }
      const { filters, search } = useTable<TestFilters>({
        defaultFilters,
      })

      expect(filters.value).toEqual(defaultFilters)
      expect(search.formState.value).toEqual(defaultFilters)
    })

    it('应该支持 defaultFilters 为函数', () => {
      const getDefaultFilters = () => ({ keyword: 'dynamic', timestamp: Date.now() })
      const { filters } = useTable<TestFilters>({
        defaultFilters: getDefaultFilters,
      })

      expect(filters.value).toHaveProperty('keyword', 'dynamic')
      expect(filters.value).toHaveProperty('timestamp')
    })

    it('应该深拷贝 defaultFilters', () => {
      const defaultFilters = { keyword: 'test', nested: { value: 1 } }
      const { filters, search } = useTable<TestFilters>({
        defaultFilters,
      })

      /* 修改 filters 不应影响 defaultFilters */
      filters.value.keyword = 'modified'
      filters.value.nested.value = 999

      expect(defaultFilters.keyword).toBe('test')
      expect(defaultFilters.nested.value).toBe(1)

      /* 修改 formState 也不应影响 defaultFilters */
      search.formState.value.keyword = 'another'
      expect(defaultFilters.keyword).toBe('test')
    })

    it('应该确保 formState 和 filters 独立', () => {
      const { filters, search } = useTable<TestFilters>({
        defaultFilters: { keyword: 'test' },
        searchType: 'advance',
      })

      search.formState.value.keyword = 'modified'

      /* advance 模式下，formState 修改不应自动影响 filters */
      expect(filters.value.keyword).toBe('test')
    })
  })

  describe('advance 模式', () => {
    it('应该在 formState 更新时不自动触发 filters 更新', async () => {
      const { filters, search } = useTable<TestFilters>({
        defaultFilters: { keyword: '' },
        searchType: 'advance',
      })

      search.formState.value.keyword = 'test'
      await nextTick()

      vi.advanceTimersByTime(1000)

      /* filters 不应自动更新 */
      expect(filters.value.keyword).toBe('')
    })

    it('应该在调用 submit 时更新 filters', async () => {
      const { filters, search } = useTable<TestFilters>({
        defaultFilters: { keyword: '' },
        searchType: 'advance',
      })

      search.formState.value.keyword = 'test'
      search.submit()
      await nextTick()

      expect(filters.value.keyword).toBe('test')
    })

    it('应该在 submit 时添加强制刷新标记', async () => {
      const { filters, search } = useTable<TestFilters>({
        defaultFilters: { keyword: '' },
        searchType: 'advance',
      })

      search.formState.value.keyword = 'test'
      search.submit()
      await nextTick()

      expect(filters.value).toHaveProperty('__now__')
      expect(typeof filters.value.__now__).toBe('number')
    })

    it('应该在 submit 时重置 currentPage 为 1', async () => {
      const { currentPage, search } = useTable<TestFilters>({
        searchType: 'advance',
      })

      currentPage.value = 5
      expect(currentPage.value).toBe(5)

      search.submit()
      await nextTick()

      expect(currentPage.value).toBe(1)
    })

    it('应该在 reset 时重置 formState 和 filters', async () => {
      const { filters, search } = useTable<TestFilters>({
        defaultFilters: { keyword: 'default', status: 'active' },
        searchType: 'advance',
      })

      search.formState.value.keyword = 'modified'
      search.formState.value.status = 'inactive'
      search.submit()
      await nextTick()

      expect(filters.value.keyword).toBe('modified')

      search.reset()
      await nextTick()

      expect(search.formState.value.keyword).toBe('default')
      expect(filters.value.keyword).toBe('default')
    })
  })

  describe('simple 模式', () => {
    it('应该在 formState 更新后自动 debounce 更新 filters', async () => {
      const { filters, search } = useTable<TestFilters>({
        defaultFilters: { keyword: '' },
        searchType: 'simple',
        searchDebounce: 400,
      })

      search.formState.value.keyword = 'test'
      await nextTick()

      /* debounce 未满足 */
      vi.advanceTimersByTime(399)
      expect(filters.value.keyword).toBe('')

      /* debounce 满足 */
      vi.advanceTimersByTime(1)
      await nextTick()

      expect(filters.value.keyword).toBe('test')
    })

    it('应该处理多次快速更新只触发一次', async () => {
      const { filters, search } = useTable<TestFilters>({
        defaultFilters: { keyword: '' },
        searchType: 'simple',
        searchDebounce: 400,
      })

      search.formState.value.keyword = 'a'
      await nextTick()

      vi.advanceTimersByTime(100)

      search.formState.value.keyword = 'ab'
      await nextTick()

      vi.advanceTimersByTime(100)

      search.formState.value.keyword = 'abc'
      await nextTick()

      /* 距离最后一次更新 400ms */
      vi.advanceTimersByTime(399)
      expect(filters.value.keyword).toBe('')

      vi.advanceTimersByTime(1)
      await nextTick()

      expect(filters.value.keyword).toBe('abc')
    })

    it('应该使用自定义 searchDebounce 时间', async () => {
      const { filters, search } = useTable<TestFilters>({
        defaultFilters: { keyword: '' },
        searchType: 'simple',
        searchDebounce: 200,
      })

      search.formState.value.keyword = 'test'
      await nextTick()

      vi.advanceTimersByTime(199)
      expect(filters.value.keyword).toBe('')

      vi.advanceTimersByTime(1)
      await nextTick()

      expect(filters.value.keyword).toBe('test')
    })

    it('应该在 formState 更新时重置 currentPage 为 1', async () => {
      const { currentPage, search } = useTable<TestFilters>({
        defaultFilters: { keyword: '' },
        searchType: 'simple',
        searchDebounce: 100,
      })

      currentPage.value = 5

      search.formState.value.keyword = 'test'
      await nextTick()

      vi.advanceTimersByTime(100)
      await nextTick()

      expect(currentPage.value).toBe(1)
    })

    it('应该在 simple 模式下 submit 方法仍然有效', async () => {
      const { filters, search } = useTable<TestFilters>({
        defaultFilters: { keyword: '' },
        searchType: 'simple',
      })

      search.formState.value.keyword = 'test'
      search.submit()
      await nextTick()

      expect(filters.value.keyword).toBe('test')
      expect(filters.value).toHaveProperty('__now__')
    })
  })

  describe('分页和排序', () => {
    it('应该支持修改 pageSize', () => {
      const { pageSize } = useTable()

      pageSize.value = 20
      expect(pageSize.value).toBe(20)

      pageSize.value = 50
      expect(pageSize.value).toBe(50)
    })

    it('应该支持修改 currentPage', () => {
      const { currentPage } = useTable()

      currentPage.value = 2
      expect(currentPage.value).toBe(2)

      currentPage.value = 10
      expect(currentPage.value).toBe(10)
    })

    it('应该支持设置 sort', () => {
      const { sort } = useTable()

      sort.value = { field: 'createdAt', order: 'ascend' }
      expect(sort.value).toEqual({ field: 'createdAt', order: 'ascend' })

      sort.value = { field: 'updatedAt', order: 'descend' }
      expect(sort.value).toEqual({ field: 'updatedAt', order: 'descend' })
    })
  })

  describe('强制刷新机制', () => {
    it('应该在每次 submit 时添加不同的 __now__ 时间戳', async () => {
      const { filters, search } = useTable<TestFilters>({
        defaultFilters: { keyword: 'test' },
        searchType: 'advance',
      })

      search.submit()
      await nextTick()
      const firstTimestamp = filters.value.__now__

      vi.advanceTimersByTime(10)

      search.submit()
      await nextTick()
      const secondTimestamp = filters.value.__now__

      expect(secondTimestamp).toBeGreaterThan(firstTimestamp!)
    })

    it('应该在不使用 forceRefresh 时不添加 __now__', async () => {
      const { filters, search } = useTable<TestFilters>({
        defaultFilters: { keyword: '' },
        searchType: 'simple',
        searchDebounce: 100,
      })

      search.formState.value.keyword = 'test'
      await nextTick()

      vi.advanceTimersByTime(100)
      await nextTick()

      /* simple 模式的自动更新不添加 __now__ */
      expect(filters.value).not.toHaveProperty('__now__')
    })
  })

  describe('清理逻辑', () => {
    it('应该在 simple 模式下 effectScope dispose 时停止 watcher', async () => {
      const scope = effectScope()

      let search: any
      let filters: any
      let formState: any

      scope.run(() => {
        const result = useTable<TestFilters>({
          defaultFilters: { keyword: '' },
          searchType: 'simple',
          searchDebounce: 100,
        })
        search = result.search
        filters = result.filters
        formState = result.search.formState
      })

      /* 先触发一次更新让 watcher 初始化 */
      formState.value = { ...formState.value, keyword: 'initial' }
      await nextTick()
      vi.advanceTimersByTime(100)
      await nextTick()

      /* effectScope dispose 应该停止 watcher */
      scope.stop()

      /* 尝试更新 formState，但由于 watcher 已停止，不应影响 filters */
      formState.value = { ...formState.value, keyword: 'test' }
      await nextTick()

      /* 继续推进时间，filters 不应更新 */
      vi.advanceTimersByTime(200)
      await nextTick()

      /* filters 应该保持为 'initial'，而不是 'test' */
      expect(filters.value.keyword).toBe('initial')
    })

    it('应该在 advance 模式下不创建 watcher', () => {
      /* advance 模式下不使用 watchDebounced，无需测试 watcher 清理 */
      const { filters, search } = useTable<TestFilters>({
        searchType: 'advance',
      })

      /* 仅验证基本功能 */
      search.formState.value = { keyword: 'test' }
      expect(filters.value).toEqual({})
    })
  })

  describe('边界情况', () => {
    it('应该处理空的 defaultFilters', () => {
      const { filters, search } = useTable<TestFilters>()

      expect(filters.value).toEqual({})
      expect(search.formState.value).toEqual({})
    })

    it('应该处理 searchDebounce 为 0', async () => {
      const { filters, search } = useTable<TestFilters>({
        searchType: 'simple',
        searchDebounce: 0,
      })

      search.formState.value.keyword = 'test'
      await nextTick()

      vi.advanceTimersByTime(0)
      await nextTick()

      expect(filters.value.keyword).toBe('test')
    })

    it('应该处理复杂的嵌套对象 defaultFilters', () => {
      const defaultFilters = {
        keyword: 'test',
        range: { start: 1, end: 10 },
        tags: ['tag1', 'tag2'],
      }

      const { filters, search } = useTable({
        defaultFilters,
      })

      expect(filters.value).toEqual(defaultFilters)

      /* 修改不应影响原对象 */
      search.formState.value.range.start = 999
      expect(defaultFilters.range.start).toBe(1)
    })

    it('应该处理连续调用 submit 和 reset', async () => {
      const { filters, search } = useTable<TestFilters>({
        defaultFilters: { keyword: 'default' },
        searchType: 'advance',
      })

      search.formState.value.keyword = 'test1'
      search.submit()
      await nextTick()

      expect(filters.value.keyword).toBe('test1')

      search.reset()
      await nextTick()

      expect(filters.value.keyword).toBe('default')

      search.formState.value.keyword = 'test2'
      search.submit()
      await nextTick()

      expect(filters.value.keyword).toBe('test2')
    })
  })

  describe('完整流程测试', () => {
    it('应该正确处理 advance 模式的完整流程', async () => {
      const { pageSize, currentPage, filters, search } = useTable<TestFilters>({
        defaultFilters: { keyword: '', status: 'all' },
        defaultPageSize: 20,
        searchType: 'advance',
      })

      /* 初始状态 */
      expect(pageSize.value).toBe(20)
      expect(currentPage.value).toBe(1)
      expect(filters.value).toEqual({ keyword: '', status: 'all' })

      /* 用户填写表单 */
      search.formState.value.keyword = 'vue'
      search.formState.value.status = 'active'

      /* filters 不应自动更新 */
      await nextTick()
      expect(filters.value.keyword).toBe('')

      /* 用户点击搜索 */
      search.submit()
      await nextTick()

      /* filters 应该更新 */
      expect(filters.value.keyword).toBe('vue')
      expect(filters.value.status).toBe('active')
      expect(currentPage.value).toBe(1)

      /* 用户切换页码 */
      currentPage.value = 3
      expect(currentPage.value).toBe(3)

      /* 用户再次搜索 */
      search.formState.value.keyword = 'react'
      search.submit()
      await nextTick()

      /* currentPage 应该重置 */
      expect(currentPage.value).toBe(1)
      expect(filters.value.keyword).toBe('react')

      /* 用户重置表单 */
      search.reset()
      await nextTick()

      expect(search.formState.value).toEqual({ keyword: '', status: 'all' })
      expect(filters.value.keyword).toBe('')
    })

    it('应该正确处理 simple 模式的完整流程', async () => {
      const { filters, search, currentPage } = useTable<TestFilters>({
        defaultFilters: { keyword: '' },
        searchType: 'simple',
        searchDebounce: 200,
      })

      /* 用户输入关键词 */
      search.formState.value.keyword = 'v'
      await nextTick()

      vi.advanceTimersByTime(100)

      search.formState.value.keyword = 'vu'
      await nextTick()

      vi.advanceTimersByTime(100)

      search.formState.value.keyword = 'vue'
      await nextTick()

      /* debounce 未满足 */
      expect(filters.value.keyword).toBe('')

      /* debounce 满足 */
      vi.advanceTimersByTime(200)
      await nextTick()

      expect(filters.value.keyword).toBe('vue')
      expect(currentPage.value).toBe(1)
    })
  })
})
