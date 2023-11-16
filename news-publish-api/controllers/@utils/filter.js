const { Model, Document } = require('mongoose')
const { asyncArray_forEach } = require('#utils/async')
const { validReferedDoc } = require('./validate')

/**
 * @fuction
 * @param {Mongoose.Document[]} documents 
 * @param {Mongoose.Model} Model 
 * @param {Controllers.Options_filterInvalidReferedDoc} options 
 * @returns 
 */
async function filterInvalidReferedDoc(documents, Model, options) {
    if (!documents || !Model || !options) return

    /**type
     * @type  {Controllers.Form_doc[]}
     */
    const rsl = []

    const modelRefDocs = []
    await asyncArray_forEach(documents, async (document) => {
        const isEffective = await validReferedDoc(document, options)
        if (!isEffective) {
            modelRefDocs.push(document)
        }
    })
    rsl.push({ Model, documents: modelRefDocs })

    return rsl
}

module.exports = {
    filterInvalidReferedDoc
}