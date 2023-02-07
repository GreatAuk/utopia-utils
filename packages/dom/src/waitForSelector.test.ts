/**
 * @vitest-environment happy-dom
 */
import { waitForSelector } from './waitForSelector'

describe('waitForSelector', () => {
  it('should wait for selector', async () => {
    const dom = document.createElement('div')
    dom.innerHTML = `
      <div id="a">33333333</div>
    `
    document.body.appendChild(dom)

    const a = await waitForSelector('#a')
    expect(a).toBeInstanceOf(HTMLDivElement)
    expect(a).toMatchInlineSnapshot(`
      <div
        id="a"
      >
        33333333
      </div>
    `)
    expect(a?.id).toBe('a')
  })
  it('should wait for selector with timeout', async () => {
    const dom = document.createElement('div')
    dom.innerHTML = `
      <div id="a">33333333</div>
    `
    document.body.appendChild(dom)
    const timeStart = Date.now()
    const a = await waitForSelector('#b', { timeoutMillisecond: 10 })
    expect(a).toBe(null)
    const timeEnd = Date.now()
    expect(timeEnd - timeStart).toBeGreaterThanOrEqual(10)
  })
})
