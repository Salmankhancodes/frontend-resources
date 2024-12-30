const p1 = new Promise((res, rej) => {
  try {
    setTimeout(() => res('P1 resolved'), 3000)

  } catch (error) {
    rej(error)

  }
})

const p2 = new Promise((res, rej) => {
  try {
    setTimeout(() => rej('P2 resolved'), 1000)

  } catch (error) {
    rej(error)

  }
})

const p3 = new Promise((_, rej) => {
  try {
    setTimeout(() => rej('P3 rejected'), 1000)

  } catch (error) {
    rej(error)

  }
})
const allpromises = [p1, p2, p3]
const myAny = function (promises) {
  return new Promise((resolve, reject) => {
    let errors = [];
    let count = 0;

    for (let index = 0; index < promises.length; index++) {
      Promise.resolve(promises[index])
        .then(data => resolve(data))
        .catch(err => {
          errors[index] = err
          count++;
          if (count === promises.length) {
            reject(errors)
          }
        })

    }

  })
}

myAny(allpromises).then((res) => console.log(res)).catch(er => console.log(er))

