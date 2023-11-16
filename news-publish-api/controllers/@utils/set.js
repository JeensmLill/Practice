const { asyncArray_forEach } = require("#utils/async")
const { objHasEqualProps } = require("#utils/object")
const { createResultRecord } = require("#utils/record")

/** create unique join-many-to-many doc
 * @function
 * @param {Mongoose.Model} Model 
 * @param {Controllers.Option_setReferedDoc_manyToMany} option 
 * @returns 
 */
const setReferedDoc_manyToMany = async (Model, option) => {
    if(!Model || !option) return

    const {
        referedForm: {
            aField,
            aFieldVal,
            bField,
            bFieldVals
        },
        docDatas,
        onBeforeCreate,
        onCreated,
        onBeforeDelete,
        onDeleted
    } = option

    const hasDatas = (docDatas && docDatas.length > 0)
    const orgDocs = await Model.find({[aField]: aFieldVal})
    const rsl = createResultRecord()
    rsl.create = createResultRecord()
    rsl.del = createResultRecord()
    
    // 向 DB 添加 doc
    await asyncArray_forEach(bFieldVals, async (bFieldVal, index) => {
        let existedDoc
        orgDocs.some((orgDoc, index, arr) => {
            if(orgDoc[bField].toString() === bFieldVal) {
                existedDoc = orgDoc
                arr.splice(index, 1)
                return true
            }
        })
        if(!existedDoc) {
            let doc = null
            if(hasDatas) {
                doc = {
                    [aField]: aFieldVal,
                    [bField]: bFieldVal,
                    ...docDatas[index]
                }
            } else {
                doc = {
                    [aField]: aFieldVal,
                    [bField]: bFieldVal
                }
            }
            if(onBeforeCreate) await onBeforeCreate(doc)
            const newDoc = await Model.create(doc)
            .catch(async (err) => {
                rsl.create.fails.push(bFieldVal)
                rsl.create.errs.push(err)
            })
            rsl.create.dones.push(bFieldVal)
            if(onCreated) await onCreated(newDoc)
        }
        rsl.dones.push(bFieldVal)
    })

    // 从 DB 删除不再需要的 doc
    await asyncArray_forEach(orgDocs, async(orgDoc) => {
        if(onBeforeDelete) await onBeforeDelete(orgDoc)
        await Model.deleteOne(orgDoc)
        .catch((err) => {
            rsl.del.fails.push(orgDoc)
            rsl.del.errs.push(err)
        })
        rsl.del.dones.push(orgDoc)
        if(onDeleted) await onDeleted(orgDoc)
    })

    return rsl
}
/** create unique join-one-to-many doc
 * @function
 * @param {Mongoose.Model} Model 
 * @param {Controllers.Option_setReferedDoc_oneToMany} option 
 * @returns 
 */
const setReferedDoc_oneToMany = async (Model, option) => {
    if(!Model || !option) return

    const {
        referedForm: {field, fieldVal},
        docDatas,
        onBeforeCreate,
        onCreated,
        onBeforeDelete,
        onDeleted
    } = option

    const orgDocs = await Model.find({[field]: fieldVal})
    const rsl = createResultRecord()
    rsl.create = createResultRecord()
    rsl.del = createResultRecord()

    // 向 DB 添加 doc
    await asyncArray_forEach(docDatas, async (data) => {
        let existedDoc
        orgDocs.some((orgDoc, index, arr) => {
            if(objHasEqualProps(orgDoc, data)) {
                existedDoc = orgDoc
                arr.splice(index, 1)
                return true
            }
        })
        if(!existedDoc) {
            const doc = {
                [field]: fieldVal,
                ...data
            }
            if(onBeforeCreate) await onBeforeCreate(doc)
            const newDoc = await Model.create(doc)
            .catch(async (err) => {
                rsl.create.fails.push(data)
                rsl.create.errs.push(err)
            })
            rsl.create.dones.push(data)
            if(onCreated) await onCreated(newDoc)
        }
        rsl.dones.push(data)
    })

    // 从 DB 删除不再需要的 doc
    await asyncArray_forEach(orgDocs, async (orgDoc) => {
        if(onBeforeDelete) await onBeforeDelete(orgDoc)
        await Model.deleteOne(orgDoc)
        .catch((err) => {
            rsl.del.fails.push(orgDoc)
            rsl.del.errs.push(err)
        })
        rsl.del.dones.push(orgDoc)
        if(onDeleted) await onDeleted(orgDoc)
    })

    return rsl
}

module.exports = {
    setReferedDoc_manyToMany,
    setReferedDoc_oneToMany
}