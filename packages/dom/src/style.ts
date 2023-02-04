/**
 * Split the className string into an array of class names, and filter out any empty strings.
 * @param [cls] - The className string
 */
export const classNameToArray = (cls = '') =>
  cls.split(' ').filter(v => !!v.trim())

export const hasClass = (el: Element, cls: string): boolean => {
  if (!el || !cls)
    return false
  if (cls.includes(' '))
    throw new Error('className should not contain space.')
  return el.classList.contains(cls)
}

export const addClass = (el: Element, cls: string) => {
  if (!el || !cls.trim())
    return
  el.classList.add(...classNameToArray(cls))
}

export const removeClass = (el: Element, cls: string) => {
  if (!el || !cls.trim())
    return
  el.classList.remove(...classNameToArray(cls))
}
