import { afterEach, describe, expect, it } from 'vitest'

import { setCssVar } from './setCssVar'

describe('setCssVar', () => {
  afterEach(() => {
    document.documentElement.style.removeProperty('--color')
    document.documentElement.style.removeProperty('--size')
  })
  it('should set CSS variables on the root element of a document using the provided variables object', () => {
    const root = document.createElement('div')
    const variables = {
      '--color': 'red',
      '--size': '10px',
    }

    setCssVar(variables, root)

    expect(root.style.getPropertyValue('--color')).toBe('red')
    expect(root.style.getPropertyValue('--size')).toBe('10px')
  })

  it('should set CSS variables on the root element of a document using the provided variables object', () => {
    const variables = {
      '--color': 'red',
      '--size': '10px',
    }

    setCssVar(variables)

    expect(window.document.documentElement.style.getPropertyValue('--color')).toBe('red')
    expect(window.document.documentElement.style.getPropertyValue('--size')).toBe('10px')
  })

  it('should not set CSS variables on the root element of a document if the provided variables object is not a plain object', () => {
    const root = document.createElement('div')
    const variables = null

    // @ts-expect-error for test
    setCssVar(variables, root)

    expect(root.style.getPropertyValue('--color')).toBe('')
    expect(root.style.getPropertyValue('--size')).toBe('')
  })

  it('should not set CSS variables on the root element of a document if the provided variables object is not a plain object', () => {
    const variables = null

    // @ts-expect-error for test
    setCssVar(variables)

    expect(document.documentElement.style.getPropertyValue('--color')).toBe('')
    expect(document.documentElement.style.getPropertyValue('--size')).toBe('')
  })
})
