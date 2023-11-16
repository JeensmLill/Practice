const User = require('#models/user/User')

/**
 * 
 * @param {Controllers.User.Form_createOne} param0 
 * @returns 
 */
const createOne = async ({
  username,
  password,
  _area,
  _role,
  avatar,
}) => {
  const rsl = {}
  rsl.user = await User.create({
    username,
    password,
    _area,
    _role,
    avatar,
  })

  return rsl
}
/**
 * 
 * @param {Controllers.User.Form_getList} param0 
 * @returns 
 */
const getList = async ({ page, limit }) => {
  const rsl = {}
  rsl.total = await User.find().countDocuments();
  rsl.users = await User.find()
    .sort('-createdAt')
    .limit(limit)
    .skip(limit * (page - 1))
    .populate(['_role', '_area'])
  return rsl
}
const updateOne = async ({
  _id,
  username,
  password,
  _area,
  _role,
  avatar,
  enable
}) => {
  const rsl = {}
  rsl.user = await User.findById(_id)
  .then(async (doc) => {
    if(doc) {
      await doc.updateOne({
        username,
        password,
        _area,
        _role,
        avatar,
        enable
      })
    }
    return doc
  })
  return rsl
}
const deleteOne = async ({
  _id
}) => {
  const rsl = {}
  rsl.user = await User.findById(_id)
  .then(async (doc) => {
    if(doc) {
      await User.deleteOne(doc)
    }
    return doc
  })
  return rsl
}
const getOne = async ({_id}) => {
  const rsl = {}
  rsl.user = await User.findById(_id)
  .populate(['_role', '_area'])
  return rsl
}

module.exports = {
  getList,
  createOne,
  updateOne,
  deleteOne,
  getOne,
}