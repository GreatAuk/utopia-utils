/**
 * The function converts a base64 string to a File object with the specified filename and optional
 * mimeType.
 * @param {string} base64 - A string representing the base64 encoded data of the file.
 * @param {string} filename - The `filename` parameter is a string that represents the desired name of
 * the file that will be created from the base64 data.
 * @returns a File object.
 */
export function base64ToFile(base64: string, filename: string): File {
  const arr = base64.split(',')
  const mime = arr[0].match(/:(.*?);/)![1]
  const bstr = atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)
  while (n--)
    u8arr[n] = bstr.charCodeAt(n)

  return new File([u8arr], filename, { type: mime })
}
