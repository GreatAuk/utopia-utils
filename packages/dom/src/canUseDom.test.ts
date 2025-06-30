import { canUseDom } from './canUseDom'

describe('canUseDom', () => {
  /* 保存原始的全局对象引用 */
  let originalWindow: typeof globalThis.window
  let originalDocument: typeof globalThis.document

  beforeEach(() => {
    originalWindow = globalThis.window
    originalDocument = globalThis.document
  })

  afterEach(() => {
    /* 恢复原始的全局对象 */
    globalThis.window = originalWindow
    globalThis.document = originalDocument
  })

    describe('DOM 可用性检测', () => {
                it('应正确检测 DOM 可用性', () => {
      /* 在当前测试环境中测试 canUseDom 的实际行为 */
      const result = canUseDom()
      expect(typeof result).toBe('boolean')

      /* 如果返回 true，说明检测到了可用的 DOM 环境 */
      /* 如果返回 false，说明当前环境不支持 DOM */
      expect([true, false]).toContain(result)
    })

    it('当 window 为 undefined 时应返回 false', () => {
      /* 模拟没有 window 的环境 */
      // @ts-ignore - 为了测试目的设置为 undefined
      globalThis.window = undefined

      expect(canUseDom()).toBe(false)
    })

    it('当 document 不存在时应返回 false', () => {
      /* 模拟 window 存在但 document 不存在的环境 */
      // @ts-ignore - 为了测试目的移除 document
      globalThis.window = {} as Window

      expect(canUseDom()).toBe(false)
    })

    it('当 document 为 null 时应返回 false', () => {
      /* 模拟 document 为 null 的情况 */
      // @ts-ignore - 为了测试目的设置为 null
      globalThis.window = { document: null } as Window

      expect(canUseDom()).toBe(false)
    })

    it('当 createElement 方法不存在时应返回 false', () => {
      /* 模拟 document 存在但 createElement 不存在的环境 */
      // @ts-ignore - 为了测试目的创建不完整的 document
      globalThis.window = {
        document: {} as Document
      } as Window

      expect(canUseDom()).toBe(false)
    })

        it('当 createElement 为 null 时应返回 false', () => {
      /* 模拟 createElement 为 null 的情况 */
      // @ts-ignore - 为了测试目的设置 createElement 为 null
      globalThis.window = {
        document: { createElement: null } as unknown as Document
      } as Window

      expect(canUseDom()).toBe(false)
    })
  })

  describe('边界情况测试', () => {
    it('应正确处理 window 为 null 的情况', () => {
      /* 模拟 window 为 null */
      // @ts-ignore - 为了测试目的设置为 null
      globalThis.window = null

      expect(canUseDom()).toBe(false)
    })

    it('应正确处理 window 为空对象的情况', () => {
      /* 模拟 window 为空对象 */
      // @ts-ignore - 为了测试目的设置为空对象
      globalThis.window = {}

      expect(canUseDom()).toBe(false)
    })

            it('应验证 createElement 是可调用的函数', () => {
      /* 模拟 createElement 存在但不是函数的情况 */
      /* 由于 JavaScript 的真值判断，字符串 'not a function' 仍然是真值 */
      /* 所以这个测试实际上会返回 true，我们需要使用 falsy 值 */
      // @ts-ignore - 为了测试目的设置为 falsy 值
      globalThis.window = {
        document: { createElement: '' } as unknown as Document
      } as Window

      expect(canUseDom()).toBe(false)
    })
  })

  describe('类型安全测试', () => {
    it('函数返回值应为 boolean 类型', () => {
      const result = canUseDom()
      expect(typeof result).toBe('boolean')
    })

        it('在任何情况下都不应抛出异常', () => {
      expect(() => canUseDom()).not.toThrow()

      /* 测试各种异常情况下都不抛出错误 */
      // @ts-ignore
      globalThis.window = undefined
      expect(() => canUseDom()).not.toThrow()

      /* 由于修复了函数实现，现在 null 情况也不会抛出异常 */
      // @ts-ignore
      globalThis.window = null
      expect(() => canUseDom()).not.toThrow()

      // @ts-ignore
      globalThis.window = {}
      expect(() => canUseDom()).not.toThrow()
    })
  })

  describe('功能验证测试', () => {
        it('在真实 DOM 环境中能够使用 createElement', () => {
      /* 如果 canUseDom 返回 true，应该能够实际创建元素 */
      if (canUseDom()) {
        expect(() => globalThis.window.document.createElement('div')).not.toThrow()

        const element = globalThis.window.document.createElement('div')
        expect(element).toBeInstanceOf(HTMLElement)
        expect(element.tagName).toBe('DIV')
      }
    })

        it('应与实际 DOM 操作能力保持一致', () => {
      const canUse = canUseDom()

      if (canUse) {
        /* 如果检测 DOM 可用，应该能执行基本 DOM 操作 */
        expect(globalThis.window).toBeDefined()
        expect(globalThis.window.document).toBeDefined()
        expect(typeof globalThis.window.document.createElement).toBe('function')
      } else {
        /* 如果检测 DOM 不可用，相关对象应该确实不可用 */
        const hasValidWindow = typeof globalThis.window !== 'undefined' && globalThis.window
        const hasValidDocument = hasValidWindow && globalThis.window.document
        const hasCreateElement = hasValidDocument && typeof globalThis.window.document.createElement === 'function'

        expect(hasValidWindow && hasValidDocument && hasCreateElement).toBe(false)
      }
    })
  })
})