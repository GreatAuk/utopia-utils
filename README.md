# Utopia-Utils

### 树结构工具

* [breadthFirstTraverse](#breadthFirstTraverse): 广度优先遍历。
* [treeFindNode](#treeFindNode): 查找符合条件的单个节点或多个节点，通过广度优先遍历查找。
* [buildTreeFromList](#buildTreeFromList): 列表结构转树结构。
* [flattenTree](#flattenTree): 打平，树结构转列表结构。
* [treeFindPath](#treeFindPath): 查打符合条件节点的路径。
* [treeFilterNode](#treeFilterNode): 过滤不符合条件的树节点。

### 类型判断

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

### 字符串

* randomString: 随机生成指定长度、指定字符集的字符串。

### Dom

* waitForSelector: 等待指定的选择器匹配的元素出现在页面中，如果调用此方法时已经有匹配的元素，那么此方法立即返回。 如果指定的选择器在超时时间后扔不出现，返回 null。

### 杂项

* [createEnumFromOptions](#createEnumFromOptions): 通过 `options` 自动生成对应的 `enum`， 后期只需要维护 `options`。**类型安全**。
* sleep: 等待指定的时间。

* retry: 重试函数（如果函数抛出错误）直到成功或者达到最大重试次数。

------



##### createEnumFromOptions

通过 `options` 自动生成对应的 `enum`， 后期只需要维护 `options`。

type safe

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
] as const // as const is required to make the type safe

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

##### breadthFirstTraverse

广度优先遍历。

![img](https://miro.medium.com/max/1400/1*ePzEF2S4pcLqoRzPSW_gKA.png)

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
