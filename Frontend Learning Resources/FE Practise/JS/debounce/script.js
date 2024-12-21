document.addEventListener('DOMContentLoaded', () => {
  const btn = document.querySelector('#btn')

  let clickCounter = 0
  let debounceCounter = 0

  const customDebounce = (cb, d) => {
    let id
    return function (...args) {
      if (id) clearTimeout(id)
      id = setTimeout(() => {
        cb(...args)
      }, d)
    }
  }

  const debounceCount = customDebounce(() => {
    debounceCounter++
    document.querySelector('#debounce').innerText = debounceCounter
  }, 300)

  document.querySelector('#clicked').innerText = clickCounter
  document.querySelector('#debounce').innerText = debounceCounter

  btn.addEventListener('click', () => {
    clickCounter++
    document.querySelector('#clicked').innerText = clickCounter
    debounceCount()
  })
})
