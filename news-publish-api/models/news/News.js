const mongoose = require('mongoose')
const User = require('../user/User')
const NewsCategory = require('./NewsCategory')

const name = 'News'
const ObjectId = mongoose.Types.ObjectId
const definition = {
  title: { type: String, required: true, unique: true },
  content: { type: String, required: true },
  /**
   * 0 unaudited,
   * 1 auditing,
   * 2 passed,
   * 3 rejected,
   */
  auditState: { type: Number, default: 0 },
  /**
   * 0 unaudited,
   * 1 unpublished,
   * 2 published,
   * 3 sunset,
   */
  publishState: { type: Number, default: 0 },
  publishTime: { type: Date, default: null },
  star: { type: Number, default: 0 },
  view: { type: Number, default: 0 },
  _user: { type: ObjectId, ref: User.modelName, required: true },
  _newsCategory: { type: ObjectId, ref: NewsCategory.modelName, required: true },
}
const option = {
  timestamps: true
}
const schema = new mongoose.Schema(definition, option)
const Model = mongoose.model(name, schema)

module.exports = Model