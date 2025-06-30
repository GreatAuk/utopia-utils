/**
 * Split the className string into an array of class names, and filter out any empty strings.
 * @param [cls] - The className string
 */
export function classNameToArray(cls = ''): string[] {
  return cls.split(' ').filter(v => !!v.trim())
}

export function hasClass(el: Element, cls: string): boolean {
  if (!el || !cls)
    return false
  if (cls.includes(' '))
    throw new Error('className should not contain space.')
  return el.classList.contains(cls)
}

export function addClass(el: Element, cls: string): void {
  if (!el || !cls.trim())
    return
  el.classList.add(...classNameToArray(cls))
}

export function removeClass(el: Element, cls: string): void {
  if (!el || !cls.trim())
    return
  el.classList.remove(...classNameToArray(cls))
}
