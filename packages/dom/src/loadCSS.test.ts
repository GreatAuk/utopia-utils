import { loadCSS } from './loadCSS'

const path = 'https://cdnjs.cloudflare.com/ajax/libs/hover.css/2.3.1/css/hover-min.css'

describe('loadCSS', () => {
  it('should load css', () => {
    const { unload, linkTag } = loadCSS(path)
    expect(linkTag).toBeInstanceOf(HTMLLinkElement)
    expect(linkTag?.href).toBe(path)
    expect(linkTag?.rel).toBe('stylesheet')
    unload()
  })
  it('should load css with media', () => {
    const { unload, linkTag } = loadCSS(path, { media: 'print' })
    expect(linkTag).toBeInstanceOf(HTMLLinkElement)
    expect(linkTag?.href).toBe(path)
    expect(linkTag?.rel).toBe('stylesheet')
    expect(linkTag?.media).toBe('print')
    unload()
  })
  it('should load css with attrs', () => {
    const { unload, linkTag } = loadCSS(path, { attrs: { 'data-test': 'test' } })
    expect(linkTag).toBeInstanceOf(HTMLLinkElement)
    expect(linkTag?.href).toBe(path)
    expect(linkTag?.rel).toBe('stylesheet')
    expect(linkTag?.getAttribute('data-test')).toBe('test')
    unload()
  })
  it('should unload css', () => {
    const { unload, linkTag } = loadCSS(path)
    expect(linkTag?.href).toBe(path)
    unload()
    expect(document.querySelector<HTMLLinkElement>(`link[href="${path}"]`)).toBeNull()
  })
})
