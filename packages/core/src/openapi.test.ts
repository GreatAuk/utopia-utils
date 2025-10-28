import { describe, expect, it } from 'vitest'
import { patchOpenApiJSON } from './openapi'

describe('patchOpenApiJSON', () => {
  it('should convert tag names to camelCase from descriptions', () => {
    const input = {
      tags: [
        { name: '用户管理', description: 'User Management' },
        { name: '订单管理', description: 'Order Management' },
      ],
      paths: {},
    }

    const result = patchOpenApiJSON(input)

    expect(result.tags[0].name).toBe('userManagement')
    expect(result.tags[1].name).toBe('orderManagement')
  })

  it('should update path tags from Chinese to English camelCase', () => {
    const input = {
      tags: [
        { name: '用户管理', description: 'User Management' },
        { name: '订单管理', description: 'Order Management' },
      ],
      paths: {
        '/api/user': {
          get: {
            tags: ['用户管理'],
            summary: 'Get user',
          },
          post: {
            tags: ['用户管理'],
            summary: 'Create user',
          },
        },
        '/api/order': {
          get: {
            tags: ['订单管理'],
            summary: 'Get order',
          },
        },
      },
    }

    const result = patchOpenApiJSON(input)

    expect(result.paths['/api/user'].get.tags).toEqual(['User Management'])
    expect(result.paths['/api/user'].post.tags).toEqual(['User Management'])
    expect(result.paths['/api/order'].get.tags).toEqual(['Order Management'])
  })

  it('should handle multiple HTTP methods', () => {
    const input = {
      tags: [{ name: 'test', description: 'Test API' }],
      paths: {
        '/api/test': {
          get: { tags: ['test'] },
          post: { tags: ['test'] },
          put: { tags: ['test'] },
          delete: { tags: ['test'] },
          patch: { tags: ['test'] },
          head: { tags: ['test'] },
          options: { tags: ['test'] },
          trace: { tags: ['test'] },
        },
      },
    }

    const result = patchOpenApiJSON(input)

    Object.keys(result.paths['/api/test']).forEach((method) => {
      expect(result.paths['/api/test'][method].tags).toEqual(['Test API'])
    })
  })

  it('should skip non-existent HTTP methods in paths', () => {
    const input = {
      tags: [{ name: 'test', description: 'Test API' }],
      paths: {
        '/api/test': {
          get: { tags: ['test'] },
          // 只有 get 方法存在
        },
      },
    }

    const result = patchOpenApiJSON(input)

    expect(result.paths['/api/test'].get.tags).toEqual(['Test API'])
    expect(result.paths['/api/test'].post).toBeUndefined()
  })

  it('should handle multiple tags per endpoint', () => {
    const input = {
      tags: [
        { name: '用户管理', description: 'User Management' },
        { name: '权限管理', description: 'Permission Management' },
      ],
      paths: {
        '/api/user': {
          get: {
            tags: ['用户管理', '权限管理'],
            summary: 'Get user with permissions',
          },
        },
      },
    }

    const result = patchOpenApiJSON(input)

    expect(result.paths['/api/user'].get.tags).toEqual([
      'User Management',
      'Permission Management',
    ])
  })

  it('should handle empty tags array', () => {
    const input = {
      tags: [],
      paths: {
        '/api/test': {
          get: {
            tags: [],
          },
        },
      },
    }

    const result = patchOpenApiJSON(input)

    expect(result.tags).toEqual([])
    expect(result.paths['/api/test'].get.tags).toEqual([])
  })

  it('should handle missing tags in input', () => {
    const input = {
      paths: {
        '/api/test': {
          get: {
            tags: ['test'],
          },
        },
      },
    }

    const result = patchOpenApiJSON(input)

    expect(result.tags).toBeUndefined()
  })

  it('should handle complex camelCase conversions', () => {
    const input = {
      tags: [
        { name: 'test', description: 'API Management System' },
        { name: 'test2', description: 'user profile data' },
        { name: 'test3', description: 'OAuth Token' },
      ],
      paths: {},
    }

    const result = patchOpenApiJSON(input)

    // camelize 函数会将每个单词的首字母大写(除了第一个单词)
    expect(result.tags[0].name).toBe('aPIManagementSystem')
    expect(result.tags[1].name).toBe('userProfileData')
    expect(result.tags[2].name).toBe('oAuthToken')
  })

  it('should preserve original object properties', () => {
    const input = {
      openapi: '3.0.0',
      info: { title: 'Test API', version: '1.0.0' },
      tags: [{ name: 'test', description: 'Test API' }],
      paths: {
        '/api/test': {
          get: {
            tags: ['test'],
            summary: 'Test endpoint',
            operationId: 'getTest',
          },
        },
      },
    }

    const result = patchOpenApiJSON(input)

    expect(result.openapi).toBe('3.0.0')
    expect(result.info).toEqual({ title: 'Test API', version: '1.0.0' })
    expect(result.paths['/api/test'].get.summary).toBe('Test endpoint')
    expect(result.paths['/api/test'].get.operationId).toBe('getTest')
  })

  it('should handle edge case with single word descriptions', () => {
    const input = {
      tags: [
        { name: '用户', description: 'User' },
        { name: '订单', description: 'Order' },
      ],
      paths: {},
    }

    const result = patchOpenApiJSON(input)

    expect(result.tags[0].name).toBe('user')
    expect(result.tags[1].name).toBe('order')
  })
})
