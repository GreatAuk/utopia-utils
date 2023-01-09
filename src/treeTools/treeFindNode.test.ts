import { describe, expect, it } from 'vitest'
import { treeFindNode } from './treeFindNode'

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
describe('treeFindNode', () => {
  it('should find the first node', () => {
    const res = treeFindNode(tree, node => node.name === 'b')
    expect(res).toEqual([{ name: 'b' }])
  })
  it('should return empty array if not found', () => {
    const res = treeFindNode(tree, node => node.name === 'd')
    expect(res).toEqual([])
  })
  it('should find all nodes', () => {
    const res = treeFindNode(tree, node => node.name === 'b' || node.name === 'c', { isFindAll: true })
    expect(res).toEqual([{ name: 'c' }, { name: 'b' }])
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
    const res = treeFindNode(customTree, node => node.name === 'b', { fieldNames: { children: 'Children_' } })
    expect(res).toEqual([{ name: 'b' }])
  })
  it('options.onEachTraverse should be called for each node', () => {
    const ids: string[] = []
    treeFindNode(tree, node => node.name === 'b', {
      onEachTraverse: node => ids.push(node.name),
    })
    expect(ids).toEqual(['a', 'c', 'b'])
  })
})
