const p1 = new Promise((res, rej) => {
    try {
        setTimeout(() => res('P1 resolved'), 3000)

    } catch (error) {
        rej(error)

    }
})

const p2 = new Promise((res, rej) => {
    try {
        setTimeout(() => res('P2 resolved'), 1000)

    } catch (error) {
        rej(error)

    }
})

const p3 = new Promise((res, rej) => {
    try {
        setTimeout(() => rej('P3 rejected'), 2000)
    } catch (error) {
    }
})
const allpromises = [p1, p2, p3]
const myRace = function (promises) {
    return new Promise((resolve, reject) => {
        for (let index = 0; index < promises.length; index++) {
            Promise.resolve(promises[index]).then(data =>
                resolve(data)
            ).catch(err => {
                reject(err)
            })
        }
    })
}
myRace(allpromises).then(data => console.log(data)).catch(err => console.log(err))