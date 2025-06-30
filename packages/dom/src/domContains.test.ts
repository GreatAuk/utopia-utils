import { domContains } from './domContains'

describe('domContains', () => {
  let container: HTMLElement
  let child: HTMLElement
  let grandChild: HTMLElement
  let sibling: HTMLElement

  beforeEach(() => {
    /* 创建测试用的 DOM 结构 */
    container = document.createElement('div')
    child = document.createElement('div')
    grandChild = document.createElement('span')
    sibling = document.createElement('div')

    /* 构建层级关系: container > child > grandChild */
    child.appendChild(grandChild)
    container.appendChild(child)

    /* 将容器添加到 document.body */
    document.body.appendChild(container)
    document.body.appendChild(sibling)
  })

  afterEach(() => {
    /* 清理 DOM */
    document.body.removeChild(container)
    document.body.removeChild(sibling)
  })

  describe('边界情况测试', () => {
    it('当 root 为 null 时应返回 false', () => {
      expect(domContains(null, child)).toBe(false)
    })

    it('当 root 为 undefined 时应返回 false', () => {
      expect(domContains(undefined, child)).toBe(false)
    })

    it('当 n 为 null 时应返回 false', () => {
      expect(domContains(container, null)).toBe(false)
    })

    it('当 root 和 n 都为 null 时应返回 false', () => {
      expect(domContains(null, null)).toBe(false)
    })
  })

  describe('包含关系测试', () => {
    it('节点应包含其自身', () => {
      expect(domContains(container, container)).toBe(true)
    })

    it('父节点应包含直接子节点', () => {
      expect(domContains(container, child)).toBe(true)
    })

    it('祖先节点应包含后代节点', () => {
      expect(domContains(container, grandChild)).toBe(true)
    })

    it('子节点不应包含父节点', () => {
      expect(domContains(child, container)).toBe(false)
    })

    it('兄弟节点之间不应相互包含', () => {
      expect(domContains(container, sibling)).toBe(false)
      expect(domContains(sibling, container)).toBe(false)
    })

    it('不相关的节点不应相互包含', () => {
      const unrelated = document.createElement('div')
      expect(domContains(container, unrelated)).toBe(false)
      expect(domContains(unrelated, container)).toBe(false)
    })
  })

  describe('原生 contains 方法测试', () => {
    it('当支持原生 contains 时应使用原生方法', () => {
      /* 确保原生 contains 方法存在 */
      expect(container.contains).toBeDefined()

      /* 模拟 contains 方法并验证是否被调用 */
      const containsSpy = vi.spyOn(container, 'contains')
      domContains(container, child)

      expect(containsSpy).toHaveBeenCalledWith(child)

      containsSpy.mockRestore()
    })
  })

  describe('fallback 方法测试', () => {
    it('当不支持 contains 方法时应使用 fallback 方法', () => {
      /* 临时移除 contains 方法 */
      const originalContains = container.contains
      // @ts-ignore - 为了测试目的临时删除 contains 属性
      delete container.contains

      /* 测试 fallback 方法是否正常工作 */
      expect(domContains(container, grandChild)).toBe(true)
      expect(domContains(container, sibling)).toBe(false)

      /* 恢复原始方法 */
      container.contains = originalContains
    })

    it('fallback 方法应正确遍历父节点链', () => {
      /* 创建更深层的嵌套结构 */
      const deepChild = document.createElement('div')
      const deeperChild = document.createElement('div')
      deepChild.appendChild(deeperChild)
      grandChild.appendChild(deepChild)

      /* 临时移除 contains 方法 */
      const originalContains = container.contains
      // @ts-ignore
      delete container.contains

      /* 测试深层嵌套的包含关系 */
      expect(domContains(container, deeperChild)).toBe(true)

      /* 恢复原始方法 */
      container.contains = originalContains
    })
  })

  describe('document 节点测试', () => {
    it('document 应包含页面中的元素', () => {
      expect(domContains(document, container)).toBe(true)
      expect(domContains(document, document.body)).toBe(true)
    })

    it('document 不应包含未添加到页面的元素', () => {
      const detached = document.createElement('div')
      expect(domContains(document, detached)).toBe(false)
    })
  })

  describe('文档片段测试', () => {
    it('应正确处理 DocumentFragment', () => {
      const fragment = document.createDocumentFragment()
      const fragmentChild = document.createElement('div')
      fragment.appendChild(fragmentChild)

      expect(domContains(fragment, fragmentChild)).toBe(true)
      expect(domContains(fragmentChild, fragment)).toBe(false)
    })
  })
})