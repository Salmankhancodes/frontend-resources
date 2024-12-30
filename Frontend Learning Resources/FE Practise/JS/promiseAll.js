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


myPromise = function (promises) {
    return new Promise((resolve, reject) => {
        let results = []
        let count = 0;
        for (let i = 0; i < promises.length; i++) {
            Promise.resolve(promises[i]).then((data) => {
                results[i] = data
                count++;
                if (count === promises.length) {
                    resolve(results)
                }
            }).catch(err => {
                reject(err)
            })
        }
    })
}

myPromise(allpromises).then(data => console.log(data)).catch(err => console.log(err))