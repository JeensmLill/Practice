///<reference path='../../types.d.ts'/>
const {asyncArray_forEach} = require('#utils/async')

/**
 * @function
 * @param {Mongoose.Document} document 
 * @param {string} path 
 * @returns 
 */
async function poplSelfJoinedDoc(document, path) {
    /**cant extend
     * paths -> populate()'s params
     */
    if(!document || !path) return

    let docs = []
    let joinedDocs = []
    let store = []
    docs.push(document)

    while(docs.length > 0) {
        await asyncArray_forEach(docs, async (doc) => {
            await doc.populate(path)
            joinedDocs = doc[path]
            if(Array.isArray(joinedDocs)) {
                joinedDocs.forEach((joinedDoc) => {
                    store.push(joinedDoc)
                })
            }
        })

        docs = store
        store = []
    }

    return document
}

module.exports = {
    poplSelfJoinedDoc
}