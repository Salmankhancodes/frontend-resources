const nestedObject = {
  B: 'bbb',
  C: 'ccc',
  arr: [
    1,
    2,
    [
      3,
      {
        nested: {
          A: 'a again',
          B: 'b again',
          c: ['array', 'in', 'object', null, undefined],
        },
      },
      null,
      undefined,
      4,
    ],
  ],
  A: {
    D: 'ddd',
  },
  F: {
    E: null,
  },
  G: undefined,
  one: {
    two: {
      seven: 'number 7',
    },
    three: {
      four: {
        five: 'numbers',
        six: 'this is also numberrr',
      },
    },
  },
} // example 1
const obj = {
  A: {
    B: {
      C: 'abc',
      D: [1, 2, 3],
    },
  },
} //example 2
const customFlatObject = function (obj, parentkey, result) {
  for (let i in obj) {
    // why function also getting listed here as own property of object
    // when added to prototype?
    if (typeof obj[i] === 'function') return
    if (typeof obj[i] === 'object' && obj !== null) {
      customFlatObject(obj[i], parentkey + `${i}.`, result)
    } else {
      result[parentkey + i] = obj[i]
    }
  }
}

Object.prototype.flatObject = function () {
  const res = {}
  const obj = this
  const parentkey = ''
  customFlatObject(obj, parentkey, res)
  return res
}

console.log(nestedObject.flatObject())

console.log(obj.flatObject())
