let successCount = 0

const api = function() {
    return new Promise((res, rej) => {
        setTimeout(() => {
           // randomize the res/rej
           const probabilityOfSuccess = Math.round(Math.random()*100)
        //    console.log(probabilityOfSuccess)
           if( probabilityOfSuccess > 50) {
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
    let retryCount = 0
    return (cb) => {
        if(retryCount < max) {
            cb().catch(_ => {
                retryCount++
                makeRetry(max-retryCount)(cb)
            })
        } else {
            console.log("Stopping ...")
        }
    }
}

const with5TimesRetry = makeRetry(5)
with5TimesRetry(api)
