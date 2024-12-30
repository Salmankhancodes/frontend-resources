// finite curring
function add(a) {
    return function (b) {
        return function (c) {
            return a + b + c
        }
    }
}
console.log('simple currying', add(10)(20)(30))

// evaluate
function evaluate(opt) {
    let operation = opt
    return function (param1) {
        return function (param2) {
            switch (operation) {
                case 'sum':
                    return param1 + param2;
                    break;
                case 'multiply':
                    return param1 * param2;
                    break;
                case 'divide':
                    return param1 / param2;
                    break;
                default:
                    return 'invalid operation'
            }

        }
    }
}
console.log('evaluate 1', evaluate('sum')(4)(2))
console.log('evaluate 2', evaluate('multiply')(4)(2))

// infinite currying
function currying(param = 0) {
    let sum = param
    return function b(a) {
        if (a !== undefined) {
            sum = sum + a
            return b
        }
        return sum
    }
}

const sum = currying(10)(20)(40)()
console.log('infinite currying', sum)

// partial application
function partial(a) {
    return function (b, c) {
        return a + b + c
    }
}
console.log('partial application', partial(1)(2, 3))

// manipulating DOM
function updateUIelement(id) {
    const ele = document.querySelector(id)
    return function (content) {
        ele.textContent = content
    }
}

const singleSum = (a, b, c) => a + b + c
// curry method
function curry(fn) {
    return function curried(...args) {
        if (args.length >= fn.length) {
            return fn(...args)
        }
        else {
            return function (...next) {
                return curried(...args, ...next)
            }
        }
    }
}
const totalSum = curry(singleSum)
console.log('curry', totalSum(1)(2)(3))