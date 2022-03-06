export function uuid() {
  if ('randomUUID' in crypto) {
    return crypto.randomUUID()
  }

  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  )
}
