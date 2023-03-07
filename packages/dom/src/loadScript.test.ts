import { loadScript } from './loadScript'

// TODO 每个用户单独跑没问题，但一直跑就会报错
describe.todo('loadScript', () => {
  afterEach(() => {
    vi.resetAllMocks()
    document.body.innerHTML = ''
    document.head.innerHTML = ''
  })
  const src = 'https://unpkg.com/@plugin-web-update-notification/core@1.3.1/dist/webUpdateNoticeInjectScript.js'
  const getScriptTag = (): HTMLScriptElement | null =>
    document.head.querySelector(`script[src="${src}"]`)

  it('call unload, should remove script tag', async () => {
    const removeListener = vi.spyOn(Element.prototype, 'remove')
    const { unload } = loadScript(src)
    expect(getScriptTag()).not.toBeNull()
    unload()
    expect(getScriptTag()).toBeNull()
    expect(removeListener).toHaveBeenCalled()
  })

  it('should add script tag', async () => {
    const appendChildListener = vitest.spyOn(document.head, 'appendChild')
    const { scriptTag, unload } = loadScript(src)
    expect(scriptTag).instanceof(HTMLScriptElement)
    expect(scriptTag?.src).toBe(src)
    expect(getScriptTag()).toBe(scriptTag)
    expect(appendChildListener).toHaveBeenCalled()
    unload()
  })

  it('should re-use the same src for multiple loads', async () => {
    const addChildListener = vitest.spyOn(document.head, 'appendChild')

    expect(addChildListener).not.toBeCalled()
    expect(getScriptTag()).toBeNull()

    const { scriptTag: scriptTag1 } = loadScript(src)
    const { scriptTag: scriptTag2, unload } = loadScript(src)

    expect(scriptTag1).not.toBeNull()
    expect(scriptTag2).not.toBeNull()
    expect(document.querySelectorAll(`script[src="${src}"]`)).toHaveLength(1)

    expect(addChildListener).toBeCalledTimes(1)
    expect(getScriptTag()).toBeInstanceOf(HTMLScriptElement)
    unload()
  })

  it('should support attributes', async () => {
    const { unload } = loadScript(src, {
      attrs: { 'id': 'id-value', 'data-test': 'data-test-value' },
      defer: true,
      crossOrigin: 'anonymous',
    })

    const element = getScriptTag()
    // expect(element).toBeInstanceOf(HTMLScriptElement)
    expect(element?.getAttribute('id')).toBe('id-value')
    expect(element?.getAttribute('data-test')).toBe('data-test-value')
    expect(element?.defer).toBe(true)
    expect(element?.crossOrigin).toBe('anonymous')
    unload()
  })
  it('status change', async () => {
    let status = ''
    const onStatusChange = vi.fn((status_) => {
      status = status_
    })
    const { unload } = loadScript(src, { onStatusChange })
    expect(status).toBe('loading')
    expect(onStatusChange).toBeCalledTimes(1)
    unload()
  })
})
