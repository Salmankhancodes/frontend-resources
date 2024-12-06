// for each polyfills
Array.prototype.customForEach = function (cb) {
  if (!Array.isArray(this)) return
  for (let i = 0; i < this.length; i++) {
    cb(this[i], i, this)
  }
}

const forEachArr = [1, 2, 3, 4, 5, 6]
forEachArr.customForEach((ele, index) =>
  console.log('element=>', ele, 'index=>', index)
)

// map each polyfills
Array.prototype.customMap = function (cb) {
  const ans = []
  for (let i = 0; i < this.length; i++) {
    ans.push(cb(this[i], i, this))
  }
  return ans
}

const mapArr = [1, 2, 3, 4, 5, 6]
const updatedArr = mapArr.customMap((ele) => ele * 2)
console.log(updatedArr)

//filter polyfills
Array.prototype.customFilter = function (cb) {
  const ans = []
  for (let i = 0; i < this.length; i++) {
    if (cb(this[i], i, this)) {
      ans.push(this[i])
    }
  }
  return ans
}

const filterArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const multipleOfThree = filterArr.customFilter((ele) => ele % 3 == 0)
console.log(multipleOfThree)

//reduce polyfills
const reduceArr = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
]
Array.prototype.customForReduce = function (cb, initialValue) {
  let acc = initialValue ?? this[0]
  for (let i = 0; i < this.length; i++) {
    acc = cb(this[i], acc, i, this)
  }
  return acc
}

const reducedValue = reduceArr.customForReduce((curr, acc) => curr + acc)
console.log(reducedValue)

// every polyfill
const everyArray = [1, 3, 5, 7, 9, 11]
Array.prototype.customEvery = function (cb) {
  for (let i = 0; i < this.length; i++) {
    if (!cb(this[i], i, this)) return false
  }
  return true
}

console.log(everyArray.customEvery((ele) => ele % 2 == 0)) // if all even
console.log(everyArray.customEvery((ele) => ele % 2 == 1)) // if all odd

// flat an array
const flatArray = (ele, ans) => {
  for (let i = 0; i < ele.length; i++) {
    if (!Array.isArray(ele[i])) {
      ans.push(ele[i])
    } else {
      flatArray(ele[i], ans)
    }
  }
}

class EventEmitter {
  constructor() {
    this.events = {}
  }
  on = function (eventName, listener) {
    if (!this.events.hasOwnProperty(eventName)) {
      this.events[eventName] = []
    }
    this.events[eventName].push(listener)
  }
  emit = function (eventName, ...params) {
    if (this.events[eventName]) {
      const allCbs = this.events[eventName]
      allCbs.forEach((listener) => {
        listener(...params)
      })
    }
  }
  off = function (eventName, listener) {
    if (this.events[eventName]) {
      this.events[eventName] = this.events[eventName].filter(
        (cb) => cb !== listener
      )
    }
  }
}

const listener1 = (name, age) =>
  console.log(`Hello ${name}, Your age is ${age} yrs`)
const listener2 = (designation, age, company) =>
  console.log(`${designation},${age},${company}`)

const emitter = new EventEmitter()
emitter.on('great', listener1)
emitter.on('great', listener2)
emitter.emit('great', 'Batman', '24', 'Earth')
emitter.off('great', listener2)
emitter.emit('great', 'Super man', '24', 'Krypton')
