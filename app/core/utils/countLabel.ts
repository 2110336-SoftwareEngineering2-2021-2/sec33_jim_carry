export function countLabel(label: string, count: number) {
  if (count === 0) {
    return label
  }
  return `${label} (${count})`
}
