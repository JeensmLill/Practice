const News = require('#models/news/News')

const createOne = async ({
  title,
  content,
  auditState,
  _user,
  _newsCategory,
}) => {
  const rsl = {}
  rsl.news = await News.create({
    title,
    content,
    auditState,
    _user,
    _newsCategory,
  })
  return rsl
}
const getDraftList_user = async ({userId, page, limit}) => {
  const rsl = {}
  const filter = {_user: userId, auditState: 0}
  rsl.total = await News.find(filter).countDocuments();
  rsl.news = await News.find(filter)
  .sort('-updatedAt')
  .populate(['_user', '_newsCategory'])
  .limit(limit)
  .skip(limit * (page - 1))
  return rsl
}
const getAuditingList = async ({page, limit}) => {
  const rsl = {}
  const filter = {auditState: 1}
  rsl.total = await News.find(filter).countDocuments();
  rsl.news = await News.find(filter)
  .sort('-updatedAt')
  .populate(['_user', '_newsCategory'])
  .limit(limit)
  .skip(limit * (page - 1))
  return rsl
}
const getAuditList_user = async ({userId, page, limit}) => {
  const rsl = {}
  const filter = {
    _user: userId,
    auditState: {$in: [1, 2, 3]},
    publishState: {$in: [0, 1]}
  }
  rsl.total = await News.find(filter).countDocuments();
  rsl.news = await News.find(filter)
  .sort('-updatedAt')
  .populate(['_user', '_newsCategory'])
  .limit(limit)
  .skip(limit * (page - 1))
  return rsl
}
const getPublishList_user_publishState = async ({userId, publishState, page, limit}) => {
  const rsl = {}
  const filter = {_user: userId, publishState}
  rsl.total = await News.find(filter).countDocuments();
  rsl.news = await News.find(filter)
  .sort('-updatedAt')
  .populate(['_user', '_newsCategory'])
  .limit(limit)
  .skip(limit * (page - 1))
  return rsl
}
const getList_user = async ({userId, page, limit}) => {
  const rsl = {}
  const filter = {_user: userId}
  rsl.total = await News.find(filter).countDocuments();
  rsl.news = await News.find(filter)
  .sort('-updatedAt')
  .populate(['_user', '_newsCategory'])
  .limit(limit)
  .skip(limit * (page - 1))
  return rsl
}
const getOne = async ({_id}) => {
  const rsl = {}
  rsl.news = await News.findById(_id)
  .populate(['_user', '_newsCategory'])
  return rsl
}
const updateOne = async ({
  _id,
  title,
  content,
  auditState,
  publishState,
  publishTime,
  star,
  view,
  _newsCategory,
}) => {
  const rsl = {}
  rsl.news = await News.findById(_id)
  .then(async (doc) => {
    if(doc) {
      await doc.updateOne({
        title,
        content,
        auditState,
        publishState,
        publishTime,
        star,
        view,
        _newsCategory,
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
  rsl.news = await News.findById(_id)
  .then(async (doc) => {
    if(doc) {
      await News.deleteOne(doc)
    }
    return doc
  })
  return rsl
}
const getPublished = async () => {
  const rsl = {}
  rsl.news = await News.find({publishState: 2})
  .populate(['_newsCategory'])
  return rsl
}

module.exports = {
  createOne,
  getDraftList_user,
  getAuditingList,
  getAuditList_user,
  getPublishList_user_publishState,
  getList_user,
  getOne,
  updateOne,
  deleteOne,
  getPublished,
}