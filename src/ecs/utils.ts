export function getRandom(max: number, min: number = 0) {
  return Math.random() * (max - min) + min
}

export function getRandomInt(max: number, min: number = 0, inclusive: boolean = true) {
  if (inclusive) {
    min = Math.ceil(min)
    max = Math.floor(max)
  }
  return Math.floor(Math.random() * (max - min + 1) + min)
}