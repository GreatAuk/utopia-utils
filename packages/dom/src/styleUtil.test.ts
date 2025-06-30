import { addClass, classNameToArray, hasClass, removeClass } from './styleUtil'

describe('styleUtil', () => {
  let testElement: HTMLElement

  beforeEach(() => {
    /* 创建测试用的DOM元素 */
    testElement = document.createElement('div')
    document.body.appendChild(testElement)
  })

  afterEach(() => {
    /* 清理DOM */
    if (testElement.parentNode) {
      document.body.removeChild(testElement)
    }
  })

  describe('classNameToArray', () => {
    it('应该将单个类名转换为数组', () => {
      expect(classNameToArray('test')).toEqual(['test'])
    })

    it('应该将多个类名转换为数组', () => {
      expect(classNameToArray('class1 class2 class3')).toEqual(['class1', 'class2', 'class3'])
    })

    it('应该过滤掉空字符串和空格', () => {
      expect(classNameToArray('class1  class2   class3')).toEqual(['class1', 'class2', 'class3'])
      expect(classNameToArray('  class1   class2  ')).toEqual(['class1', 'class2'])
    })

    it('应该处理空字符串', () => {
      expect(classNameToArray('')).toEqual([])
    })

    it('应该处理只包含空格的字符串', () => {
      expect(classNameToArray('   ')).toEqual([])
    })

    it('应该处理undefined参数并使用默认值', () => {
      expect(classNameToArray()).toEqual([])
    })

    it('应该处理制表符和换行符', () => {
      /* split(' ') 只会按空格分割，制表符和换行符会保留在字符串中 */
      expect(classNameToArray('class1\tclass2\nclass3')).toEqual(['class1\tclass2\nclass3'])
    })
  })

  describe('hasClass', () => {
    beforeEach(() => {
      /* 为元素添加一些初始类名 */
      testElement.className = 'existing-class another-class'
    })

    it('应该正确检测存在的类名', () => {
      expect(hasClass(testElement, 'existing-class')).toBe(true)
      expect(hasClass(testElement, 'another-class')).toBe(true)
    })

    it('应该正确检测不存在的类名', () => {
      expect(hasClass(testElement, 'non-existing')).toBe(false)
    })

    it('应该区分大小写', () => {
      expect(hasClass(testElement, 'Existing-Class')).toBe(false)
      expect(hasClass(testElement, 'EXISTING-CLASS')).toBe(false)
    })

    describe('边界情况测试', () => {
      it('当元素为null时应返回false', () => {
        expect(hasClass(null as any, 'test')).toBe(false)
      })

      it('当元素为undefined时应返回false', () => {
        expect(hasClass(undefined as any, 'test')).toBe(false)
      })

      it('当类名为空字符串时应返回false', () => {
        expect(hasClass(testElement, '')).toBe(false)
      })

      it('当类名为null时应返回false', () => {
        expect(hasClass(testElement, null as any)).toBe(false)
      })

      it('当类名包含空格时应抛出错误', () => {
        expect(() => hasClass(testElement, 'class with space')).toThrow('className should not contain space.')
      })
    })
  })

  describe('addClass', () => {
    it('应该为元素添加单个类名', () => {
      addClass(testElement, 'new-class')
      expect(testElement.classList.contains('new-class')).toBe(true)
    })

    it('应该为元素添加多个类名', () => {
      addClass(testElement, 'class1 class2 class3')
      expect(testElement.classList.contains('class1')).toBe(true)
      expect(testElement.classList.contains('class2')).toBe(true)
      expect(testElement.classList.contains('class3')).toBe(true)
    })

    it('应该处理已存在的类名（不重复添加）', () => {
      testElement.className = 'existing'
      addClass(testElement, 'existing new-class')

      /* classList.add 不会重复添加已存在的类名 */
      expect(testElement.className.split(' ').filter(c => c === 'existing').length).toBe(1)
      expect(testElement.classList.contains('new-class')).toBe(true)
    })

    it('应该正确处理包含额外空格的类名字符串', () => {
      addClass(testElement, '  class1   class2  ')
      expect(testElement.classList.contains('class1')).toBe(true)
      expect(testElement.classList.contains('class2')).toBe(true)
    })

    describe('边界情况测试', () => {
      it('当元素为null时不应报错', () => {
        expect(() => addClass(null as any, 'test')).not.toThrow()
      })

      it('当元素为undefined时不应报错', () => {
        expect(() => addClass(undefined as any, 'test')).not.toThrow()
      })

      it('当类名为空字符串时不应添加任何类', () => {
        const originalClassName = testElement.className
        addClass(testElement, '')
        expect(testElement.className).toBe(originalClassName)
      })

      it('当类名为只有空格的字符串时不应添加任何类', () => {
        const originalClassName = testElement.className
        addClass(testElement, '   ')
        expect(testElement.className).toBe(originalClassName)
      })

      it('当类名为null时应抛出错误', () => {
        expect(() => addClass(testElement, null as any)).toThrow()
      })
    })
  })

  describe('removeClass', () => {
    beforeEach(() => {
      /* 为元素添加一些初始类名 */
      testElement.className = 'class1 class2 class3 class4'
    })

    it('应该移除单个类名', () => {
      removeClass(testElement, 'class1')
      expect(testElement.classList.contains('class1')).toBe(false)
      expect(testElement.classList.contains('class2')).toBe(true)
    })

    it('应该移除多个类名', () => {
      removeClass(testElement, 'class1 class3')
      expect(testElement.classList.contains('class1')).toBe(false)
      expect(testElement.classList.contains('class2')).toBe(true)
      expect(testElement.classList.contains('class3')).toBe(false)
      expect(testElement.classList.contains('class4')).toBe(true)
    })

    it('应该处理不存在的类名（不报错）', () => {
      expect(() => removeClass(testElement, 'non-existing')).not.toThrow()
      /* 原有类名应保持不变 */
      expect(testElement.classList.contains('class1')).toBe(true)
    })

    it('应该正确处理包含额外空格的类名字符串', () => {
      removeClass(testElement, '  class1   class2  ')
      expect(testElement.classList.contains('class1')).toBe(false)
      expect(testElement.classList.contains('class2')).toBe(false)
      expect(testElement.classList.contains('class3')).toBe(true)
    })

    describe('边界情况测试', () => {
      it('当元素为null时不应报错', () => {
        expect(() => removeClass(null as any, 'test')).not.toThrow()
      })

      it('当元素为undefined时不应报错', () => {
        expect(() => removeClass(undefined as any, 'test')).not.toThrow()
      })

      it('当类名为空字符串时不应移除任何类', () => {
        const originalClassName = testElement.className
        removeClass(testElement, '')
        expect(testElement.className).toBe(originalClassName)
      })

      it('当类名为只有空格的字符串时不应移除任何类', () => {
        const originalClassName = testElement.className
        removeClass(testElement, '   ')
        expect(testElement.className).toBe(originalClassName)
      })

      it('当类名为null时应抛出错误', () => {
        expect(() => removeClass(testElement, null as any)).toThrow()
      })
    })
  })

  describe('集成测试', () => {
    it('应该支持添加和移除类名的组合操作', () => {
      /* 添加类名 */
      addClass(testElement, 'test1 test2')
      expect(hasClass(testElement, 'test1')).toBe(true)
      expect(hasClass(testElement, 'test2')).toBe(true)

      /* 移除部分类名 */
      removeClass(testElement, 'test1')
      expect(hasClass(testElement, 'test1')).toBe(false)
      expect(hasClass(testElement, 'test2')).toBe(true)

      /* 再次添加已移除的类名 */
      addClass(testElement, 'test1')
      expect(hasClass(testElement, 'test1')).toBe(true)
      expect(hasClass(testElement, 'test2')).toBe(true)
    })

    it('classNameToArray应该与addClass和removeClass配合工作', () => {
      const classNames = 'dynamic1 dynamic2 dynamic3'
      const classArray = classNameToArray(classNames)

      /* 使用数组中的类名逐个添加 */
      classArray.forEach(cls => addClass(testElement, cls))

      /* 验证所有类名都被添加 */
      classArray.forEach(cls => {
        expect(hasClass(testElement, cls)).toBe(true)
      })

      /* 移除所有类名 */
      removeClass(testElement, classNames)

      /* 验证所有类名都被移除 */
      classArray.forEach(cls => {
        expect(hasClass(testElement, cls)).toBe(false)
      })
    })
  })
})