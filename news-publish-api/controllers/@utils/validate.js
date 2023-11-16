///<reference path='../../types.d.ts'/>
const {asyncArray_some} = require('#utils/async')

/**
 * @function
 * @param {Mongoose.Document} document 
 * @param {Controllers.Options_validReferedDoc} options 
 * @returns 
 */
async function validReferedDoc(document, options) {
    if(!document || !options) return

    let rsl = null
    let hasNull = false
    await asyncArray_some(options, async (option) => {
        const {Model, field} = option
        await Model.findById(document[field])
        .then((doc) => {
            if(!doc) {
                hasNull = true
            }
        })

        return hasNull
    })

    rsl = !hasNull
    return rsl
}

module.exports = {
    validReferedDoc
}