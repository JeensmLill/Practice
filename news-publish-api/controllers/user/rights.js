const { createCheckRecord } = require('#/utils/record')
const Right = require('#/models/user/Right')
const { default: mongoose } = require('mongoose')
const { poplSelfJoinedDoc } = require('../@utils/populate')
const { readSelfJoinedDoc } = require('../@utils/read')
const { asyncArray_forEach } = require('#/utils/async')
const DocForm = require('../@utils/docForm')

const validateDoc = async (doc) => {
  const rsl = createCheckRecord()
  await Right.findById(doc._parent)
    .then((parentDoc) => {
      const conditionForms = [
        {
          condition: parentDoc,
          falseMsg: '父级不存在',
        },
        {
          condition: doc.level >= 1,
          falseMsg: 'level 不能小于 1',
        },
        {
          condition: doc.level - parentDoc?.level === 1,
          falseMsg: '父级与子级的 level 差值不等于 1',
        },
        {
          condition: doc.type >= 1,
          falseMsg: 'type 不能小于 1',
        },
      ]
      let everyTrue = true
      conditionForms.forEach((conditionForm) => {
        if (!conditionForm.condition) {
          everyTrue = false
          rsl.msgs.push(conditionForm.falseMsg)
        }
      })
      rsl.ok = everyTrue
    })
    .catch((err) => {
      rsl.ok = false
      rsl.msgs.push(err)
    })
  
  if(rsl.ok) return rsl
  else throw rsl.msgs
}
const createRoot = async ({ name, code, }) => {
  const rsl = {}
  rsl.right = await Right.create({
    name,
    code,
    level: 0,
    type: 0,
    _parent: new mongoose.Types.ObjectId()
  })
  return rsl
}
const createChild = async ({
  name,
  code,
  level,
  type,
  enable,
  _parent,
}) => {
  const rsl = {}
  const doc = {
    name,
    code,
    level,
    type,
    enable,
    _parent,
  }
  await validateDoc(doc)
  rsl.right = await Right.create(doc)
  return rsl
}
const getRightTree = async ({rootName}) => {
  const rsl = {}
  rsl.right = await poplSelfJoinedDoc(await Right.findOne({
    name: rootName,
    level: 0
  }), '_children')
  return rsl
}
const updateOne = async ({
  _id,
  name,
  code,
  level,
  type,
  enable,
  _parent,
}) => {
  const rsl = {}
  const update = {
    name,
    code,
    level,
    type,
    enable,
    _parent,
  }
  await validateDoc(update)
  rsl.right = await Right.findById(_id)
    .then(async (doc) => {
      if(doc) {
        await doc.updateOne(update)
      }
      return doc
    })
  return rsl
}
const deleteOne = async ({
  _id
}) => {
  const rsl = {}
  rsl.right = await Right.findById(_id)
  .then(async (doc) => {
    if(doc) {
      const docs = DocForm.getDoc(await readSelfJoinedDoc(delDoc, {Model: Right, field: '_parent'}))
      docs.push(doc)
      await Right.deleteMany(docs)
    }
    return doc
  })
  return rsl
}
const updateEnable = async ({_id, enable}) => {
  const rsl = {}
  rsl.right = await Right.findById(_id)
  .then(async (doc) => {
    if(doc) {
      await doc.updateOne({enable})
    }
    return doc
  })
  rsl.right = await Right.findById(_id)
  .then(async (doc) => {
    if(doc) {
      const docs = DocForm.getDoc(await readSelfJoinedDoc(doc, {Model: Right, field: '_parent'}))
      docs.push(doc)
      await asyncArray_forEach(docs, async (doc) => {
        await doc.updateOne({enable})
      })
    }
    return doc
  })
  return rsl
}

module.exports = {
  validateDoc,
  createRoot,
  createChild,
  getRightTree,
  updateOne,
  deleteOne,
  updateEnable,
}