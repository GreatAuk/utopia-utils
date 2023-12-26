import { isBlob, isFile, isString } from '@utopia-utils/share'

/**
 * The function `toBase64` converts a File, Blob, or string to a base64 encoded string.
 * @param {File | Blob | string} o - The parameter "o" can be one of the following types: File, Blob,
 * or string.
 * @returns a Promise that resolves to a string.
 */
export async function toBase64(o: File | Blob | string) {
  if (isFile(o) || isBlob(o))
    return await fileToBase64(o)

  else if (isString(o))
    return await imgUrlToBase64(o)

  else
    throw new Error('The parameter must be a File, Blob or a string.')
}
/**
 * The function `fileToBase64` converts a File or Blob object to a base64 encoded string.
 * @param {File | Blob} file - The `file` parameter can be either a `File` object or a `Blob` object.
 * @returns a Promise that resolves to a string.
 */
export function fileToBase64(file: File | Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

/**
 * The function `imgUrlToBase64` converts an image URL to a base64 encoded string.
 * @param {string} imgUrl - The `imgUrl` parameter is a string that represents the URL of the image you
 * want to convert to base64.
 * @param {string} [fileType] - the first parameter of canvas.toDataURL
 * @param {any} [quality] - the second parameter of canvas.toDataURL
 * @returns a Promise that resolves to a string.
 */
export function imgUrlToBase64(imgUrl: string, fileType?: string, quality?: Parameters<HTMLCanvasElement['toDataURL']>[1]): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = 'Anonymous'
    img.onload = () => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')!
      canvas.width = img.width
      canvas.height = img.height
      ctx.drawImage(img, 0, 0)
      resolve(canvas.toDataURL(fileType, quality))
    }
    img.onerror = reject
    img.src = `${imgUrl}?timeStamp=${new Date().getTime()}`
  })
}
