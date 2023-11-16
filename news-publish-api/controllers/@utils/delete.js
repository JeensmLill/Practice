const {asyncArray_forEach} = require('#utils/async')
const { createResultRecord } = require('#utils/record')
const { readJoinedDoc } = require('./read')
const docFormOperation = require('./docForm')

/**
 * @function
 * @param {Mongoose.Document[]} documents 
 * @param {Controllers.Option_delJoinedDoc} option 
 * @returns 
 */
const delJoinedDoc = async (documents, option) => {
    const {
        joined: {Model, field},
        onBeforeDelete,
        onDeleted,
    } = option

    let joineds = null
    let rsl = null

    joineds = await readJoinedDoc(documents, [{Model, field}])
    const joinedDocs = docFormOperation.getDoc(joineds)
    if(onBeforeDelete) await onBeforeDelete(joinedDocs)
    rsl = await delDocIncludedInDocForm(joineds)
    if(onDeleted) await onDeleted(joinedDocs)

    return rsl
}

module.exports = {
    delJoinedDoc
}