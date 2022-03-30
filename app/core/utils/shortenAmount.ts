export function shortenAmount(amount: number): string {
  if (amount < 1000) {
    return `${amount}`
  } else if (amount >= 1000) {
    return `${(amount / 1000).toFixed(1)}K`
  } else if (amount >= 10 ** 6) {
    return `${(amount / 10 ** 6).toFixed(1)}M`
  } else {
    return `${amount}`
  }
}
