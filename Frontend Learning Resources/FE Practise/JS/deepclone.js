const deepCloneObject = (obj) => {
  const result = {}
  for (let i in obj) {
    if (Array.isArray(obj[i])) {
      result[i] = deepClone(obj[i])
    } else if (typeof obj[i] === 'object' && obj[i] !== 'null') {
      result[i] = deepCloneObject(obj[i])
    } else {
      result[i] = obj[i]
    }
  }
  return result
}

const deepClone = (arr) => {
  const result = []
  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      result[i] = deepClone(arr[i])
    } else if (typeof arr[i] === 'object' && arr[i] !== 'null') {
      result[i] = deepCloneObject(arr[i])
    } else {
      result[i] = arr[i]
    }
  }
  return result
}

const arr1 = [1, 2, [3, 4], { five: 5, six: 6 }]
const arr2 = deepClone(arr1)

console.log('before update')
console.log(arr1, arr2)

console.log('after update')
arr1[0] = 11 // updating root child
arr1[2][0] = 33 // updating nested array
arr1[3]['five'] = '55' // updating nested object

console.log(arr1, arr2)
