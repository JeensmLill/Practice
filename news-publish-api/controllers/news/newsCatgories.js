const NewsCategory = require('#models/news/NewsCategory')

const get = async () => {
  const rsl = {}
  rsl.newsCategories = await NewsCategory.find()
  return rsl
}
const createOne = async ({name}) => {
  const rsl = {}
  rsl.newsCategory = await NewsCategory.create({name})
  return rsl
}
const getList = async ({page, limit}) => {
  const rsl = {}
  rsl.total = await NewsCategory.find().countDocuments();
  rsl.newsCategories = await NewsCategory.find()
  .sort('-createdAt')
  .limit(limit)
  .skip(limit * (page - 1))
  return rsl
}
const updateOne = async ({_id, name}) => {
  const rsl = {}
  rsl.newsCategory = await NewsCategory.findById(_id)
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
  rsl.newsCategory = await NewsCategory.findById(_id)
  .then(async (doc) => {
    if(doc) {
      await NewsCategory.findByIdAndDelete(doc)
    }
    return doc
  })
  return rsl
}

module.exports = {
  get,
  createOne,
  getList,
  updateOne,
  deleteOne,
}