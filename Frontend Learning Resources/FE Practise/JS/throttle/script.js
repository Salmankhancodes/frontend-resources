document.addEventListener('DOMContentLoaded', () => {
  const btn = document.querySelector('#btn')

  let clickCounter = 0
  let throttleCounter = 0

  const customthrottle = (cb, d) => {
    let lastUse = 0
    return function (...args) {
      let now = Date.now()
      if (now - lastUse >= d) {
        cb(...args)
        lastUse = Date.now()
      }
    }
  }

  const throttleCount = customthrottle(() => {
    throttleCounter++
    document.querySelector('#throttle').innerText = throttleCounter
  }, 1000)

  document.querySelector('#clicked').innerText = clickCounter
  document.querySelector('#throttle').innerText = throttleCounter

  btn.addEventListener('click', () => {
    clickCounter++
    document.querySelector('#clicked').innerText = clickCounter
    throttleCount()
  })
})
