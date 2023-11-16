const asyncArray_forEach = async function(arr, cb) {
    if(!Array.isArray(arr) || arr.length <= 0) return

    return await new Promise(async (resolve) => {
        let index = -1
        let item = null

        while(index + 1 !== arr.length) {
            index ++ 
            item = arr[index]
            await cb(item, index, arr)
        }
        resolve()
    })
}
const asyncArray_some = async function(arr, cb) {
    if(!Array.isArray(arr) || arr.length <= 0) return

    let result = false
    return await new Promise(async (resolve) => {
        let index = -1
        let item = null

        while(index + 1 !== arr.length && !result) {
            index ++ 
            item = arr[index]
            result = await cb(item, index, arr)
        }
        resolve(result)
    })
}

module.exports = {
    asyncArray_forEach,
    asyncArray_some
}