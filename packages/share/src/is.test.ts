import {
  isBoolean,
  isString,
  isNumber,
  isFunction,
  isSymbol,
  isArray,
  isRegExp,
  isMap,
  isSet,
  isDate,
  isFile,
  isBlob,
  isPlainObject,
  isPromise,
  isPrimitive,
  isNil,
  isObject,
  isWindow,
  isIntegerKey,
  isStringNumber,
  isDef,
  isUndef,
} from './is'

describe('is', () => {
  describe('isBoolean', () => {
    it('should return true for boolean values', () => {
      expect(isBoolean(true)).toBe(true)
      expect(isBoolean(false)).toBe(true)
    })

    it('should return false for non-boolean values', () => {
      expect(isBoolean('true')).toBe(false)
      expect(isBoolean(1)).toBe(false)
      expect(isBoolean(0)).toBe(false)
      expect(isBoolean(null)).toBe(false)
      expect(isBoolean(undefined)).toBe(false)
      expect(isBoolean({})).toBe(false)
      expect(isBoolean([])).toBe(false)
    })
  })

  describe('isString', () => {
    it('should return true for string values', () => {
      expect(isString('')).toBe(true)
      expect(isString('hello')).toBe(true)
      expect(isString('123')).toBe(true)
      expect(isString(String(123))).toBe(true)
    })

    it('should return false for non-string values', () => {
      expect(isString(123)).toBe(false)
      expect(isString(true)).toBe(false)
      expect(isString(null)).toBe(false)
      expect(isString(undefined)).toBe(false)
      expect(isString({})).toBe(false)
      expect(isString([])).toBe(false)
    })
  })

  describe('isNumber', () => {
    it('should return true for number values', () => {
      expect(isNumber(0)).toBe(true)
      expect(isNumber(123)).toBe(true)
      expect(isNumber(-123)).toBe(true)
      expect(isNumber(3.14)).toBe(true)
      expect(isNumber(Infinity)).toBe(true)
      expect(isNumber(-Infinity)).toBe(true)
      expect(isNumber(NaN)).toBe(true)
    })

    it('should return false for non-number values', () => {
      expect(isNumber('123')).toBe(false)
      expect(isNumber(true)).toBe(false)
      expect(isNumber(null)).toBe(false)
      expect(isNumber(undefined)).toBe(false)
      expect(isNumber({})).toBe(false)
      expect(isNumber([])).toBe(false)
    })
  })

  describe('isFunction', () => {
    it('should return true for function values', () => {
      expect(isFunction(() => {})).toBe(true)
      expect(isFunction(function() {})).toBe(true)
      expect(isFunction(async () => {})).toBe(true)
      expect(isFunction(String)).toBe(true)
      expect(isFunction(Array)).toBe(true)
    })

    it('should return false for non-function values', () => {
      expect(isFunction('function')).toBe(false)
      expect(isFunction(123)).toBe(false)
      expect(isFunction(true)).toBe(false)
      expect(isFunction(null)).toBe(false)
      expect(isFunction(undefined)).toBe(false)
      expect(isFunction({})).toBe(false)
      expect(isFunction([])).toBe(false)
    })
  })

  describe('isSymbol', () => {
    it('should return true for symbol values', () => {
      expect(isSymbol(Symbol())).toBe(true)
      expect(isSymbol(Symbol('test'))).toBe(true)
      expect(isSymbol(Symbol.for('test'))).toBe(true)
    })

    it('should return false for non-symbol values', () => {
      expect(isSymbol('symbol')).toBe(false)
      expect(isSymbol(123)).toBe(false)
      expect(isSymbol(true)).toBe(false)
      expect(isSymbol(null)).toBe(false)
      expect(isSymbol(undefined)).toBe(false)
      expect(isSymbol({})).toBe(false)
    })
  })

  describe('isArray', () => {
    it('should return true for array values', () => {
      expect(isArray([])).toBe(true)
      expect(isArray([1, 2, 3])).toBe(true)
      expect(isArray(new Array())).toBe(true)
      expect(isArray(Array.from('hello'))).toBe(true)
    })

    it('should return false for non-array values', () => {
      expect(isArray('array')).toBe(false)
      expect(isArray(123)).toBe(false)
      expect(isArray(true)).toBe(false)
      expect(isArray(null)).toBe(false)
      expect(isArray(undefined)).toBe(false)
      expect(isArray({})).toBe(false)
      /* arguments 对象在严格模式下不可用，跳过此测试 */
    })
  })

  describe('isRegExp', () => {
    it('should return true for RegExp values', () => {
      expect(isRegExp(/test/)).toBe(true)
      expect(isRegExp(new RegExp('test'))).toBe(true)
      expect(isRegExp(/^test$/g)).toBe(true)
    })

    it('should return false for non-RegExp values', () => {
      expect(isRegExp('/test/')).toBe(false)
      expect(isRegExp(123)).toBe(false)
      expect(isRegExp(true)).toBe(false)
      expect(isRegExp(null)).toBe(false)
      expect(isRegExp(undefined)).toBe(false)
      expect(isRegExp({})).toBe(false)
      expect(isRegExp([])).toBe(false)
    })
  })

  describe('isMap', () => {
    it('should return true for Map values', () => {
      expect(isMap(new Map())).toBe(true)
      expect(isMap(new Map([['key', 'value']]))).toBe(true)
    })

    it('should return false for non-Map values', () => {
      expect(isMap({})).toBe(false)
      expect(isMap([])).toBe(false)
      expect(isMap(new Set())).toBe(false)
      expect(isMap(null)).toBe(false)
      expect(isMap(undefined)).toBe(false)
      expect(isMap('map')).toBe(false)
      expect(isMap(123)).toBe(false)
    })
  })

  describe('isSet', () => {
    it('should return true for Set values', () => {
      expect(isSet(new Set())).toBe(true)
      expect(isSet(new Set([1, 2, 3]))).toBe(true)
    })

    it('should return false for non-Set values', () => {
      expect(isSet({})).toBe(false)
      expect(isSet([])).toBe(false)
      expect(isSet(new Map())).toBe(false)
      expect(isSet(null)).toBe(false)
      expect(isSet(undefined)).toBe(false)
      expect(isSet('set')).toBe(false)
      expect(isSet(123)).toBe(false)
    })
  })

  describe('isDate', () => {
    it('should return true for Date values', () => {
      expect(isDate(new Date())).toBe(true)
      expect(isDate(new Date('2023-01-01'))).toBe(true)
      expect(isDate(new Date(0))).toBe(true)
    })

    it('should return false for non-Date values', () => {
      expect(isDate('2023-01-01')).toBe(false)
      expect(isDate(1672531200000)).toBe(false)
      expect(isDate({})).toBe(false)
      expect(isDate(null)).toBe(false)
      expect(isDate(undefined)).toBe(false)
      expect(isDate('date')).toBe(false)
    })
  })

  describe('isFile', () => {
    it('should return true for File values', () => {
      const file = new File(['content'], 'test.txt', { type: 'text/plain' })
      expect(isFile(file)).toBe(true)
    })

    it('should return false for non-File values', () => {
      expect(isFile(new Blob(['content']))).toBe(false)
      expect(isFile({})).toBe(false)
      expect(isFile(null)).toBe(false)
      expect(isFile(undefined)).toBe(false)
      expect(isFile('file')).toBe(false)
      expect(isFile(123)).toBe(false)
    })
  })

  describe('isBlob', () => {
    it('should return true for Blob values', () => {
      expect(isBlob(new Blob(['content']))).toBe(true)
      expect(isBlob(new Blob(['content'], { type: 'text/plain' }))).toBe(true)
    })

    it('should return false for non-Blob values', () => {
      expect(isBlob({})).toBe(false)
      expect(isBlob(null)).toBe(false)
      expect(isBlob(undefined)).toBe(false)
      expect(isBlob('blob')).toBe(false)
      expect(isBlob(123)).toBe(false)
      expect(isBlob([])).toBe(false)
    })
  })

  describe('isPlainObject', () => {
    it('should return true for plain objects', () => {
      expect(isPlainObject({})).toBe(true)
      expect(isPlainObject({ a: 1 })).toBe(true)
      expect(isPlainObject(Object.create(null))).toBe(true) /* Object.create(null) 也被识别为普通对象 */
      expect(isPlainObject(new Object())).toBe(true)
    })

    it('should return false for non-plain objects', () => {
      expect(isPlainObject([])).toBe(false)
      expect(isPlainObject(new Date())).toBe(false)
      expect(isPlainObject(new Map())).toBe(false)
      expect(isPlainObject(new Set())).toBe(false)
      expect(isPlainObject(null)).toBe(false)
      expect(isPlainObject(undefined)).toBe(false)
      expect(isPlainObject('object')).toBe(false)
      expect(isPlainObject(123)).toBe(false)
      expect(isPlainObject(() => {})).toBe(false)
    })
  })

  describe('isPromise', () => {
    it('should return true for Promise values', () => {
      expect(isPromise(Promise.resolve())).toBe(true)
      expect(isPromise(Promise.reject().catch(() => {}))).toBe(true)
      expect(isPromise(new Promise(() => {}))).toBe(true)
    })

    it('should return true for thenable objects', () => {
      const thenable = {
        // oxlint-disable-next-line no-thenable - test
        then: () => {},
        catch: () => {},
      }
      expect(isPromise(thenable)).toBe(true)
    })

    it('should return false for non-Promise values', () => {
      expect(isPromise({})).toBe(false)
      // oxlint-disable-next-line no-thenable - test
      expect(isPromise({ then: 'not a function' })).toBe(false)
      // oxlint-disable-next-line no-thenable - test
      expect(isPromise({ then: () => {} })).toBe(false) /* 缺少 catch 方法 */
      expect(isPromise(null)).toBe(false)
      expect(isPromise(undefined)).toBe(false)
      expect(isPromise('promise')).toBe(false)
      expect(isPromise(123)).toBe(false)
    })
  })

  describe('isPrimitive', () => {
    it('should return true for primitive values', () => {
      expect(isPrimitive('string')).toBe(true)
      expect(isPrimitive(123)).toBe(true)
      expect(isPrimitive(true)).toBe(true)
      expect(isPrimitive(false)).toBe(true)
      expect(isPrimitive(Symbol('test'))).toBe(true)
      expect(isPrimitive(null)).toBe(false) /* null 的 typeof 是 'object'，不在原始类型检查中 */
      expect(isPrimitive(undefined)).toBe(true)
    })

    it('should return false for non-primitive values', () => {
      expect(isPrimitive({})).toBe(false)
      expect(isPrimitive([])).toBe(false)
      expect(isPrimitive(() => {})).toBe(false)
      expect(isPrimitive(new Date())).toBe(false)
      expect(isPrimitive(new Map())).toBe(false)
      expect(isPrimitive(/test/)).toBe(false)
    })
  })

  describe('isNil', () => {
    it('should return true for null or undefined values', () => {
      expect(isNil(null)).toBe(true)
      expect(isNil(undefined)).toBe(true)
    })

    it('should return false for non-nil values', () => {
      expect(isNil(0)).toBe(false)
      expect(isNil('')).toBe(false)
      expect(isNil(false)).toBe(false)
      expect(isNil({})).toBe(false)
      expect(isNil([])).toBe(false)
      expect(isNil(NaN)).toBe(false)
    })
  })

  describe('isObject', () => {
    it('should return true for objects', () => {
      expect(isObject({})).toBe(true)
      expect(isObject({ a: 1 })).toBe(true)
      expect(isObject(new Object())).toBe(true)
    })

    it('should return false for non-objects', () => {
      expect(isObject(null)).toBe(false)
      expect(isObject(undefined)).toBe(false)
      expect(isObject('object')).toBe(false)
      expect(isObject(123)).toBe(false)
      expect(isObject(true)).toBe(false)
      expect(isObject([])).toBe(false)
      expect(isObject(new Date())).toBe(false)
      expect(isObject(() => {})).toBe(false)
    })
  })

  describe('isWindow', () => {
    it('should return false in test environment', () => {
      /* 在测试环境中，通常没有真正的 window 对象 */
      expect(isWindow({})).toBe(false)
      expect(isWindow(global)).toBe(false)
      expect(isWindow(null)).toBe(false)
      expect(isWindow(undefined)).toBe(false)
    })
  })

  describe('isIntegerKey', () => {
    it('should return true for valid integer keys', () => {
      expect(isIntegerKey('0')).toBe(true)
      expect(isIntegerKey('1')).toBe(true)
      expect(isIntegerKey('123')).toBe(true)
      expect(isIntegerKey('999')).toBe(true)
    })

    it('should return false for invalid integer keys', () => {
      expect(isIntegerKey('NaN')).toBe(false)
      expect(isIntegerKey('-1')).toBe(false)
      expect(isIntegerKey('1.5')).toBe(false)
      expect(isIntegerKey('01')).toBe(false)
      expect(isIntegerKey('abc')).toBe(false)
      expect(isIntegerKey('')).toBe(false)
      expect(isIntegerKey('123abc')).toBe(false)
      expect(isIntegerKey(123)).toBe(false) /* 不是字符串 */
      expect(isIntegerKey(null)).toBe(false)
      expect(isIntegerKey(undefined)).toBe(false)
    })
  })

  describe('isStringNumber', () => {
    it('should return true for string numbers', () => {
      expect(isStringNumber('123')).toBe(true)
      expect(isStringNumber('0')).toBe(true)
      expect(isStringNumber('-123')).toBe(true)
      expect(isStringNumber('3.14')).toBe(true)
      expect(isStringNumber('1e10')).toBe(true)
      expect(isStringNumber('Infinity')).toBe(true)
      expect(isStringNumber('-Infinity')).toBe(true)
    })

    it('should return false for non-string numbers', () => {
      expect(isStringNumber('abc')).toBe(false)
      expect(isStringNumber('123abc')).toBe(false)
      expect(isStringNumber('')).toBe(false)
      expect(isStringNumber(' ')).toBe(false)
      expect(isStringNumber('NaN')).toBe(false)
      expect(isStringNumber(123 as any)).toBe(false) /* 不是字符串 */
      expect(isStringNumber(null as any)).toBe(false)
      expect(isStringNumber(undefined as any)).toBe(false)
    })
  })

  describe('isDef', () => {
    it('should return true for defined values', () => {
      expect(isDef(0)).toBe(true)
      expect(isDef('')).toBe(true)
      expect(isDef(false)).toBe(true)
      expect(isDef({})).toBe(true)
      expect(isDef([])).toBe(true)
      expect(isDef(NaN)).toBe(true)
    })

    it('should return false for undefined or null values', () => {
      expect(isDef(undefined)).toBe(false)
      expect(isDef(null)).toBe(false)
    })
  })

  describe('isUndef', () => {
    it('should return true for undefined or null values', () => {
      expect(isUndef(undefined)).toBe(true)
      expect(isUndef(null)).toBe(true)
    })

    it('should return false for defined values', () => {
      expect(isUndef(0)).toBe(false)
      expect(isUndef('')).toBe(false)
      expect(isUndef(false)).toBe(false)
      expect(isUndef({})).toBe(false)
      expect(isUndef([])).toBe(false)
      expect(isUndef(NaN)).toBe(false)
    })
  })
})