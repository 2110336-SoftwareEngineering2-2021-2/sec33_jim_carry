export function groupBy<T, K extends string | number | symbol>(
  items: T[],
  extractKey: (item: T) => K
): Record<K, T[]> {
  const groups = {} as Record<K, T[]>
  for (const item of items) {
    const group = extractKey(item)
    if (!groups[group]) {
      groups[group] = []
    }
    groups[group].push(item)
  }
  return groups
}
