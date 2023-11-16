///<reference path='../../types.d.ts'/>
const {asyncArray_forEach} = require('#utils/async')

/**
 * @function
 * @param {Mongoose.Document[]} documents 
 * @param {Controllers.Options_readJoinedDoc} options 
 * @returns 
 */
async function readJoinedDoc(documents, options) {
    if(!documents || !options) return

    let opt = null
    let docs = []
    let store_docs = []
    /**
     * @type  {Controllers.Form_doc[]}
     */
    const rsl = []

    await asyncArray_forEach(documents, async (document) => {
        await asyncArray_forEach(options, async (option) => {
            if(option && option.Model && option.field) {
                opt = option
                docs.push(document)
                
                while(docs.length > 0 && opt) {
                    const {Model, field, joined} = opt
                    await asyncArray_forEach(docs, async (doc) => {
                        const joinedDocs = await Model.find({[field]: doc.id})
                        store_docs.push(...joinedDocs)
                    })
                    rsl.unshift({Model: Model, documents: store_docs})
                    
                    if(joined && joined.Model && joined.field) {
                        opt = joined
                    } else {
                        opt = null
                    }
                    docs = store_docs
                    store_docs = []
                }
            }
        })
    })

    return rsl
}
/**
 * @function
 * @param {Mongoose.Document} document 
 * @param {Controllers.Option_readSelfJoinedDoc} option 
 * @returns 
 */
const readSelfJoinedDoc = async (document, option) => {
    if(!document || !option) return
    
    const {Model, field} = option
    let docs = []
    let store_docs = []
    /**
     * @type  {Controllers.Form_doc}
     */
    const rsl = []
    docs.push(document)

    while(docs.length > 0) {
        await asyncArray_forEach(docs, async (doc) => {
            const joinedDocs = await Model.find({[field]: doc.id})
            store_docs.push(...joinedDocs)
        })
        rsl.unshift({Model: Model, documents: store_docs})

        docs = store_docs
        store_docs = []
    }

    return rsl
}

module.exports = {
    readJoinedDoc,
    readSelfJoinedDoc,
}