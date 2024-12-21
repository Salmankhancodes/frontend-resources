const memoize = (fn) => {
  const cache = {}
  return function (...args) {
    const key = JSON.stringify(args)
    if (cache.hasOwnProperty(key)) {
      return cache[key]
    }
    const result = fn(...args)
    cache[key] = result
    return result
  }
}
const fibo = (n) => {
  if (n <= 1) return n
  return fibo(n - 1) + fibo(n - 2)
}

const num = 40
const memoized = memoize(fibo)
console.time(`Non memoized fibo for ${num}`)
console.log(fibo(num)) // 2.018 s
console.timeEnd(`Non memoized fibo for ${num}`)

console.time(`memoized fibo for ${num}`)
console.log(memoized(num)) //2.101 s - first call
console.timeEnd(`memoized fibo for ${num}`)

console.time(`memoized fibo for ${num}`)
console.log(memoized(num)) //0.416 ms - second call
console.timeEnd(`memoized fibo for ${num}`)
