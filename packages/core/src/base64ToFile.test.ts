/**
 * @vitest-environment happy-dom
 */

import { describe, expect, it } from 'vitest'

import { base64ToFile } from './base64ToFile'

describe('base64ToFile', () => {
  it('should convert a base64 string to a File object', () => {
    const base64 = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxQTEhQUExQWFhQYGBgYGBgYGBgYGBgYGBgYGBgYGBgYHSggGBolGxgXITEhJSkrLi4uGB8zODMsNygtLisB'
    const file = base64ToFile(base64, 'test.jpg')
    expect(file).toBeInstanceOf(File)
    expect(file.name).toBe('test.jpg')
    expect(file.type).toBe('image/jpeg')
  })
})
