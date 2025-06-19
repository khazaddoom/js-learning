const api = function() {
    return new Promise((res, rej) => {
        setTimeout(() => {
           // randomize the res/rej
           if(Math.round(Math.random()*100) > 50) {
               console.log("Succeeding ...")
                res({
                    message: "All ok!",
                    data: {}
                })
           } else {
               console.log("Failing ...")
               rej({
                   message: "Something went wrong!",
                   data: {}
               })
           }
        },[200])
    })
}

// api().catch(_ => {
//     api().catch(_ => {
//         api().catch(_ => {
//         })
//     })
// })

const makeRetry = (max) => {
    let retryCount = 1
    return (cb) => {
        if(retryCount++ < max) {
            cb().catch(_ => {
                makeRetry(max)(cb)
            })
        } else {
            
        }
    }
}

const with3TimesRetry = check(3)
with3TimesRetry(api)
