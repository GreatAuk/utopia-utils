export function sleep(durationMillisecond: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, durationMillisecond))
}
