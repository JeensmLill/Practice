///<reference path='../../types.d.ts'/>
/**
 * @function
 * @param {Controllers.Form_doc[]} docForms
 */
const getDoc = (docForms) => {
    const docs = []
    docForms.forEach((docForm) => {
        docs.push(...docForm.documents)
    })
    return docs
}
/**
 * @function
 * @param {Controllers.Form_doc[]} docForms 
 * @param {Controllers.Option_deleteDoc} [option] 
 * @returns 
 */
const deleteDoc = async (docForms, option) => {
    if(!docForms) return

    const {onBeforeDelete, onDeleted} = option

    const rsl = createResultRecord()
    await asyncArray_forEach(docForms, async (docForm) => {
        const {Model, documents} = docForm
        await asyncArray_forEach(documents, async (document) => {
            if(onBeforeDelete) await onBeforeDelete(document)
            await Model.findByIdAndDelete(document.id)
            .then(async(doc) => {
                if(onDeleted) await onDeleted(doc)
                rsl.dones.push(document)
            })
            .catch((err) => {
                rsl.fails.push(document)
                rsl.errs.push(err)
            })
        })
    })

    return rsl
}
const DocForm = {
    getDoc,
    deleteDoc,
}
module.exports = DocForm