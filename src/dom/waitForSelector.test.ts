// /**
//  * @vitest-environment happy-dom
//  */
// import { describe, expect, it } from 'vitest'
// import { waitForSelector } from './waitForSelector'

// describe('waitForSelector', () => {
//   it('should wait for selector 1111', async () => {
//     const dom = document.createElement('div')
//     dom.innerHTML = `
//       <div id="a"></div>
//     `
//     document.body.appendChild(dom)

//     const a = await waitForSelector('#a')
//     expect(a).toBeInstanceOf(HTMLDivElement)
//     expect(a?.id).toBe('a')
//   })
// })

// TODO complete unit test
