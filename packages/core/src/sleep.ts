/**
 * @linkcode https://github.com/GreatAuk/utopia-utils/blob/main/packages/core/src/sleep.ts
 */
export function sleep(durationMillisecond: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, durationMillisecond))
}
