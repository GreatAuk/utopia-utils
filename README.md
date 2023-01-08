# Utopia-Utils

### Tree Tools

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

查找符合条件的单个节点或多个节点（options.isFindAll set true），通过广度优先遍历查找。

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



## License

[MIT](./LICENSE)
