# Utopia-Utils

**目录**

* [Install](#Install)
* [树结构工具](#树结构工具)
* [字符串](#字符串)
* [Dom](#Dom)
* [杂项](#杂项)
* [类型判断](#类型判断)
* [类型判断](#类型判断)
* [vendor](#vendor)
* [推荐的工具库](#推荐的工具库)

### Install

```bash
# 包含所有的 utils
pnpm add @utopia-utils/core
```

### 树结构工具

```bash
# 如果只需要使用树结构 utils
pnpm add @utopia-utils/tree
```



* [breadthFirstTraverse](#breadthFirstTraverse): 广度优先遍历。[source](https://github.com/GreatAuk/utopia-utils/blob/main/packages/tree/src/breadthFirstTraverse.ts)
* [treeFindNode](#treeFindNode): 查找符合条件的单个节点或多个节点，通过广度优先遍历查找。[source](https://github.com/GreatAuk/utopia-utils/blob/main/packages/tree/src/treeFindNode.ts)
* [buildTreeFromList](#buildTreeFromList): 列表结构转树结构。[source](https://github.com/GreatAuk/utopia-utils/blob/main/packages/tree/src/buildTreeFromList.ts)
* [flattenTree](#flattenTree): 打平，树结构转列表结构。[source](https://github.com/GreatAuk/utopia-utils/blob/main/packages/tree/src/flattenTree.ts)
* [treeFindPath](#treeFindPath): 查打符合条件节点的路径。[source](https://github.com/GreatAuk/utopia-utils/blob/main/packages/tree/src/treeFindPath.ts)
* [treeFilterNode](#treeFilterNode): 过滤不符合条件的树节点。[source](https://github.com/GreatAuk/utopia-utils/blob/main/packages/tree/src/treeFilterNode.ts)

### 字符串

* randomString: 随机生成指定长度、指定字符集的字符串。[source](https://github.com/GreatAuk/utopia-utils/blob/main/packages/core/src/randomString.ts)

### Dom

```bash
# 如果只需要使用 Dom utils
pnpm add @utopia-utils/dom
```

* waitForSelector: 等待指定的选择器匹配的元素出现在页面中，如果调用此方法时已经有匹配的元素，那么此方法立即返回。 如果指定的选择器在超时时间后扔不出现，返回 `null`。[source](https://github.com/GreatAuk/utopia-utils/blob/main/packages/dom/src/waitForSelector.ts)
* panzoom: 为指定的元素添加拖拽缩放功能。[source](https://github.com/GreatAuk/utopia-utils/blob/main/packages/dom/src/panzoom/core.ts

### 杂项
* [defineDictionary](#defineDictionary): 定义业务字典。 **typesafe** [source](https://github.com/GreatAuk/utopia-utils/blob/main/packages/core/src/defineDictionary.ts)
* ~~[createEnumFromOptions](#createEnumFromOptions): 通过 `options` 自动生成对应的 `enum`， 后期只需要维护 `options`。**typesafe**。[source](https://github.com/GreatAuk/utopia-utils/blob/main/packages/core/src/createEnumFromOptions.ts)~~
* sleep: 等待指定的时间。[source](https://github.com/GreatAuk/utopia-utils/blob/main/packages/core/src/sleep.ts)
* capitalize: 首字母大写。[source](https://github.com/GreatAuk/utopia-utils/blob/main/packages/core/src/capitalize.ts)
* [retry](#retry): 重试函数（如果函数抛出错误）直到成功或者达到最大重试次数。[source](https://github.com/GreatAuk/utopia-utils/blob/main/packages/core/src/retry.ts)
* objectKeys: 带类型的 `Object.keys()`。[source](https://github.com/GreatAuk/utopia-utils/blob/main/packages/core/src/objectKeys.ts)
* omit: 删除 `object` 对象的指定属性。[source](https://github.com/GreatAuk/utopia-utils/blob/main/packages/core/src/omit.ts)
* pick: 从 `object` 对象中获取指定属性。[source](https://github.com/GreatAuk/utopia-utils/blob/main/packages/core/src/pick.ts)
* randomInt: 生成指定范围内`[min, max]`的整数。[source](https://github.com/GreatAuk/utopia-utils/blob/main/packages/core/src/randomInt.ts)
* [awaitTo](https://github.com/scopsy/await-to-js): Async await wrapper for easy error handling without try-catch。[source](https://github.com/GreatAuk/utopia-utils/blob/main/packages/core/src/awaitTo.ts)
* escapeStringRegexp: 把字符串中的特殊字符转义为它可以在正则表达式中使用的形式。[source](https://github.com/GreatAuk/utopia-utils/blob/main/packages/core/src/escapeStringRegexp.ts)
* isMobile: 判断是否是移动端浏览器。[source](https://github.com/GreatAuk/utopia-utils/blob/main/packages/share/src/isMobile.ts)
* toFixedWithoutZeros: `Number.toFixed` 并移除末尾的零。[source](https://github.com/GreatAuk/utopia-utils/blob/main/packages/core/src/math.ts)
* average: 计算数组的平均值。[source](https://github.com/GreatAuk/utopia-utils/blob/main/packages/core/src/math.ts)
* [debounce](https://github.com/niksy/throttle-debounce#debounce): 防抖。（export from [throttle-debounce](https://github.com/niksy/throttle-debounce)）
* [throttle](https://github.com/niksy/throttle-debounce#throttle): 节流。（export from [throttle-debounce](https://github.com/niksy/throttle-debounce)）
* callLimit: 限制函数调用次数。[source](https://github.com/GreatAuk/utopia-utils/blob/main/packages/core/src/callLimit.ts)
* once: 限制函数只能调用一次。[source](https://github.com/GreatAuk/utopia-utils/blob/main/packages/core/src/once.ts)
* encryptPhone: 加密手机号, 中间 4 位显示成 *。[source](https://github.com/GreatAuk/utopia-utils/blob/main/packages/core/src/encryptPhone.ts)
* getByPath: 通过路径获取对象的值。**typesafe**[source](https://github.com/GreatAuk/utopia-utils/blob/main/packages/core/src/getByPath.ts)
* arrayToCSV: 数组转换为 CSV 字符串。[source](https://github.com/GreatAuk/utopia-utils/blob/main/packages/core/src/csv.ts)
* memoize: 创建一个会缓存返回结果的函数。[source](https://github.com/GreatAuk/utopia-utils/blob/main/packages/core/src/memoize.ts)
* getFileName: 获取文件名。[source](https://github.com/GreatAuk/utopia-utils/blob/main/packages/core/src/getFileName.ts)
* [Cookies](https://github.com/js-cookie/js-cookie#basic-usage): cookie utils.（export from [js-cookie](https://github.com/js-cookie/js-cookie)）
* [mitt](https://github.com/developit/mitt): event emitter / pubsub, typesafe.（export from [mitt](https://github.com/developit/mitt)）
* unique: 数组去重。[source](https://github.com/GreatAuk/utopia-utils/blob/main/packages/core/src/unique.ts)
* uniqueWith: 数组去重，使用自定义的比较函数。[source](https://github.com/GreatAuk/utopia-utils/blob/main/packages/core/src/uniqueWith.ts)
### 类型判断

```bash
# 如果只需要使用类型判断 utils
pnpm add @utopia-utils/share
```



* isBoolean
* isString
* isNumber
* isFunction
* isSymbol
* isArray
* isRegExp
* isMap
* isPromise
* isSet
* isDate
* isPlainObject
* isObject
* isIntegerKey
* isEmpty
------

### vendor

> @utopia-utils/core 导出了下面这些 package

* [debounce](https://github.com/niksy/throttle-debounce#debounce): 防抖。
* [throttle](https://github.com/niksy/throttle-debounce#throttle): 节流。
* [js-cookie](https://github.com/js-cookie/js-cookie): A simple, lightweight JavaScript API for handling browser cookies.
* [mitt](https://github.com/developit/mitt): 🥊 Tiny 200 byte functional event emitter / pubsub. typesafe.

### 推荐的工具

* [`saveAs`](https://github.com/eligrey/FileSaver.js): An HTML5 saveAs() FileSaver implementation.

* [`zod`](https://github.com/colinhacks/zod): TypeScript-first schema validation with static type inference.
* [`dayjs`](https://github.com/iamkun/dayjs): ⏰ Day.js 2kB immutable date-time library alternative to Moment.js with the same modern API.
* [`any-rule`](https://any-rule.vercel.app/): 常用正则大全.
* [`fast-deep-equal`](https://github.com/epoberezkin/fast-deep-equal): The fastest deep equality check with Date, RegExp and ES6 Map, Set and typed arrays support.
* [`nanoclone`](https://github.com/kelin2025/nanoclone): Tiny util to deep clone.

##### defineDictionary

定义业务字典, **typesafe**

```ts
// at src/constant.ts
const { get_MUSIC_TYPE_KEYS, get_MUSIC_TYPE_KV, get_MUSIC_TYPE_MAP, get_MUSIC_TYPE_MAP_BY_KEY, get_MUSIC_TYPE_MAP_BY_VALUE, get_MUSIC_TYPE_OPTIONS, get_MUSIC_TYPE_VALUES, get_MUSIC_TYPE_VK } = defineDictionary([
  {
    key: 'POP',
    value: 1,
    label: '流行音乐',
    color: 'red',
  },
  {
    key: 'ROCK',
    value: 2,
    label: '摇滚音乐',
    color: 'blue',
  },
] as const, 'MUSIC_TYPE') // !!! as const is required for type safe

export const { MUSIC_TYPE_KEYS } = get_MUSIC_TYPE_KEYS()
// ['POP', 'ROCK']
export const { MUSIC_TYPE_VALUES } = get_MUSIC_TYPE_VALUES()
// [1, 2]
export const { MUSIC_TYPE_KV } = get_MUSIC_TYPE_KV()
// { POP: 1, ROCK: 2 }
export const { MUSIC_TYPE_VK } = get_MUSIC_TYPE_VK()
// { 1: 'POP', 2: 'ROCK' }
export const { MUSIC_TYPE_MAP_BY_KEY } = get_MUSIC_TYPE_MAP_BY_KEY()
// POP: {
//   key: 'POP',
//   value: 1,
//   label: '流行音乐',
//   color: 'red',
// },
// ROCK: {
//   key: 'ROCK',
//   value: 2,
//   label: '摇滚音乐',
//   color: 'blue',
// },
export const { MUSIC_TYPE_MAP_BY_VALUE } = get_MUSIC_TYPE_MAP_BY_VALUE()
// 1: {
//   key: 'POP',
//   value: 1,
//   label: '流行音乐',
//   color: 'red',
// },
// 2: {
//   key: 'ROCK',
//   value: 2,
//   label: '摇滚音乐',
//   color: 'blue',
// },
export const { MUSIC_TYPE_MAP } = get_MUSIC_TYPE_MAP()
// { POP: 1, ROCK: 2 }
export const { MUSIC_TYPE_OPTIONS } = get_MUSIC_TYPE_OPTIONS()
// [
//   {
//     key: 'POP',
//     value: 1,
//     label: '流行音乐',
//     color: 'red',
//   },
//   {
//     key: 'ROCK',
//     value: 2,
//     label: '摇滚音乐',
//     color: 'blue',
//   }
// ]
```



##### ~~createEnumFromOptions~~

通过 `options` 自动生成对应的 `enum`， 后期只需要维护 `options`。**typesafe**

废弃, 使用 [defineDictionary](#defineDictionary) 代替。

```ts
// example
const optionsLevel = [
  {
    value: 0,
    label: 'level1',
  },
  {
    value: 1,
    label: 'level2',
  },
] as const // as const is required to make the typesafe

const enumLevel = createEnumFromOptions(optionsLevel)
console.log(enumLevel.level1) // 0
console.log(enumLevel['0']) // 'level1'
console.log(enumLevel)
// {
//   "0": "level1",
//   "1": "level2",
//   "level1": 0,
//   "level2": 1
// }
```

##### retry
重试函数（如果函数抛出错误）直到成功或者达到最大重试次数。

```ts
let callNum = 0
const fn = () => {
  callNum++
  return Promise.reject(new Error('foo'))
}
const [err, res] = await retry(fn, 2, (attemptTime) => {
  return attemptTime * 5
})
// output
// err is Error, res is null, callNum is 3
// execute time is greater than or equal to 15
```



### Tree Utils

> 所有的 Tree utils 支持定义 fieldName
>
> ```ts
> export interface FieldNames {
>   id?: string
>   children?: string
>   parentId?: string
> }
> ```

##### breadthFirstTraverse

广度优先遍历。

![img](https://miro.medium.com/max/1400/1*ePzEF2S4pcLqoRzPSW_gKA.png)

```ts
// example
const tree = [
  {
    name: 'a',
    Children_: [
      { name: 'b' },
    ],
  },
  {
    name: 'c',
  },
]

breadthFirstTraverse(tree, node => console.log(node.name), {
  fieldNames: {
    children: 'Children_', // default is children
  },
})
// output 'a', 'c', 'b'
```

##### treeFindNode

查找符合条件的单个节点或多个节点，通过广度优先遍历查找。

```ts
// example
const tree = [
  {
    name: 'a',
    children: [
      { name: 'b' },
    ],
  }
]

const res = treeFindNode(tree, node => node.name === 'b') // res is [{ name: 'b' }]
```

##### buildTreeFromList

列表结构转树结构。

```ts
// example
const list = [
  { uid: '1', title: 'node 1', pid: '' },
  { uid: '1-1', title: 'node 1-1', pid: '1' },
  { uid: '1-2', title: 'node 1-2', pid: '1' },
  { uid: '1-1-1', title: 'node 1-1-1', pid: '1-1' },
]

interface TreeNode {
  key: string
  title: string
  children: TreeNode[]
  pid: string
}

const tree = buildTreeFromList<TreeNode>(list, {
  listFieldNames: { id: 'uid', parentId: 'pid', children: '_Children' },
  treeFieldNames: { id: 'key', parentId: 'pid', children: 'children' },
})
```

##### flattenTree

打平，树结构转列表结构。

```ts
// example
const tree = {
  id: 1,
  children: [
    {
      id: 2,
    },
  ],
}
const list = flattenTree(tree)
console.log(list)
// output
// [
//   {
//     "ID": 1,
//     "children": [
//       {
//         "ID": 2,
//       },
//     ],
//   },
//   {
//     "ID": 2,
//   },
// ]
```

##### treeFindPath

查打符合条件节点的路径。

```ts
// example
const tree = [
  {
    name: 'a',
    children: [
      { name: 'b' },
    ],
  },
  {
    name: 'c',
  },
]

const path = treeFindPath(tree, node => node.name === 'b')
console.log(path?.map(v => v.name)) // ['a', 'b']
```

##### treeFilterNode

过滤不符合条件的树节点。

```ts
const tree = [
  {
    id: 'root',
    children: [
      {
        id: 'child1',
      },
      {
        id: 'child2',
      },
    ],
  },
]
treeFilterNode(tree, node => node.id.includes('1'))
// output
// [
//   {
//     children: [
//       {
//         id: 'child1',
//       },
//     ],
//     id: 'root',
//   },
// ]
```



## License

[MIT](./LICENSE)
