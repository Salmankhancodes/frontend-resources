// for each polyfills
Array.prototype.customForEach = function (cb) {
  // Check if `this` is an array
  if (!Array.isArray(this)) {
    throw new TypeError('customForEach must be called on an array.')
  }

  // Check if the callback is a function
  if (typeof cb !== 'function') {
    throw new TypeError('The callback argument must be a function.')
  }

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
  if (!Array.isArray(this)) {
    throw new TypeError('customMap must be called on an array.')
  }
  // Check if the callback is a function
  if (typeof cb !== 'function') {
    throw new TypeError('The callback argument must be a function.')
  }
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
  if (!Array.isArray(this)) {
    throw new TypeError('customFilter must be called on an array.')
  }
  // Check if the callback is a function
  if (typeof cb !== 'function') {
    throw new TypeError('The callback argument must be a function.')
  }
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
  if (!Array.isArray(this)) {
    throw new TypeError('customForReduce must be called on an array.')
  }
  // Check if the callback is a function
  if (typeof cb !== 'function') {
    throw new TypeError('The callback argument must be a function.')
  }
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

Array.prototype.customFlat = function () {
  const ans = []
  const flatArray = (ele) => {
    for (let i = 0; i < ele.length; i++) {
      if (!Array.isArray(ele[i])) {
        ans.push(ele[i])
      } else {
        flatArray(ele[i])
      }
    }
  }
  flatArray(this)
  return ans
}
console.log(
  'flatten array',
  [1, 2, [1, [2, [3], 4], 5], [3, 4], 5, 6].customFlat()
)
