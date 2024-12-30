const p1 = new Promise((res, rej) => {
    try {
        setTimeout(() => res('P1 resolved'), 3000)

    } catch (error) {
        rej(error)

    }
})

const p2 = new Promise((res, rej) => {
    try {
        setTimeout(() => res('P2 resolved'), 3000)

    } catch (error) {
        rej(error)

    }
})

const p3 = new Promise((res, rej) => {
    try {
        setTimeout(() => rej('P3 rejected'), 4000)
    } catch (error) {
    }
})
const allpromises = [p1, p2, p3]


const myAllSetteled = function (promises) {
    let allResults = []
    let count = 0;

    return new Promise((resolve, reject) => {
        for (let i = 0; i < promises.length; i++) {
            Promise.resolve(promises[i]).then(data => {
                allResults[i] = { status: 'fulfilled', value: data }
            }).catch(err => {
                allResults[i] = { status: 'rejected', reason: err }
            }).finally(() => {
                count++
                if (count === promises.length) {
                    resolve(allResults)
                }
            })
        }
    })
}

myAllSetteled(allpromises).then((res) => console.log(res)).catch(er => console.log(er))
