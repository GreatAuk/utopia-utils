import { treeFindPath } from './treeFindPath'

describe('treeFindPath', () => {
  it('should find the first path', () => {
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
    expect(path).toMatchInlineSnapshot(`
      [
        {
          "children": [
            {
              "name": "b",
            },
          ],
          "name": "a",
        },
        {
          "name": "b",
        },
      ]
    `)
    expect(path?.map(v => v.name)).toEqual(['a', 'b'])
  })

  it('should return null if not found', () => {
    const tree = {
      name: 'a',
      children: [
        { name: 'b' },
      ],
    }
    const path = treeFindPath(tree, node => node.name === 'd')
    expect(path).toBe(null)
  })

  it('fieldNames should work', () => {
    const customTree = [
      {
        name: 'a',
        Children_: [
          { name: 'b' },
        ],
      },
    ]
    const path = treeFindPath(customTree, node => node.name === 'b', { fieldNames: { children: 'Children_' } })
    expect(path?.map(v => v.name)).toEqual(['a', 'b'])
  })

  it('should work with deeply nested trees', () => {
    const tree = [
      {
        name: 'a',
        children: [
          {
            name: 'b',
            children: [
              {
                name: 'c',
                children: [
                  { name: 'd' }
                ]
              }
            ]
          },
        ],
      },
      {
        name: 'e',
      },
    ]
    const path = treeFindPath(tree, node => node.name === 'd')
    expect(path?.map(v => v.name)).toEqual(['a', 'b', 'c', 'd'])
  })

  it('should return null for empty array', () => {
    const tree: any[] = []
    const path = treeFindPath(tree, node => node.name === 'a')
    expect(path).toBe(null)
  })

  it('should work with a single node tree (not array)', () => {
    const tree = {
      name: 'a',
      children: [
        { name: 'b' },
      ],
    }
    const path = treeFindPath(tree, node => node.name === 'b')
    expect(path?.map(v => v.name)).toEqual(['a', 'b'])
  })

  it('should find the first match when multiple nodes match', () => {
    interface TreeNode {
      name: string;
      id?: number;
      children?: TreeNode[];
    }

    const tree: TreeNode[] = [
      {
        name: 'a',
        children: [
          { name: 'b', id: 1 },
          { name: 'b', id: 2 },
        ],
      },
      {
        name: 'c',
        children: [
          { name: 'b', id: 3 },
        ],
      },
    ]
    const path = treeFindPath(tree, node => node.name === 'b')
    expect(path?.length).toBe(2)
    expect((path?.[1] as TreeNode)?.id).toBe(1) // Should find the first 'b' with id=1
  })

  it('should handle nodes without children', () => {
    const tree = [
      {
        name: 'a',
      },
      {
        name: 'b',
      },
    ]
    const path = treeFindPath(tree, node => node.name === 'b')
    expect(path?.map(v => v.name)).toEqual(['b'])
  })
})
