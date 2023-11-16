const Role = require('#models/user/Role')
const Role_Right = require('#models/user/Role_Right')
const { setReferedDoc_manyToMany } = require('../@utils/set')

const get = async () => {
  const rsl = {}
  rsl.roles = await Role.find()
  return rsl
}
const createOne = async ({name}) => {
  const rsl = {}
  rsl.role = await Role.create({name})
  return rsl
}
const getList = async ({page, limit}) => {
  const rsl = {}
  rsl.total = await Role.find().countDocuments();
  rsl.roles = await Role.find()
  .sort('-createdAt')
  .limit(limit)
  .skip(limit * (page - 1))
  return rsl
}
const updateOne = async ({_id, name}) => {
  const rsl = {}
  rsl.role = await Role.findById(_id)
  .then(async (doc) => {
    if(doc) {
      await doc.updateOne({name})
    }
    return doc
  })
  return rsl
}
const deleteOne = async ({_id}) => {
  const rsl = {}
  rsl.role = await Role.findById(_id)
  .then(async (doc) => {
    if(doc) {
      await Role.findByIdAndDelete(doc)
    }
    return doc
  })
  return rsl
}
const setRights = async ({_id, rightIds}) => {
  const rsl = {}
  rsl.rsl = await setReferedDoc_manyToMany(Role_Right, {
    referedForm: {
      aField: '_role',
      bField: '_right',
      aFieldVal: _id,
      bFieldVals: rightIds
    }
  })
  return rsl
}
const getRights = async ({_id}) => {
  const rsl = {}
  const role = await Role.findById(_id)
  .populate(['_role_rights'])
  rsl.rights = role._role_rights.map((item) => item._right)
  return rsl
}

module.exports = {
  get,
  createOne,
  getList,
  updateOne,
  deleteOne,
  setRights,
  getRights,
}