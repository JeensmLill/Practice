const mongoose = require('mongoose')
const Role = require('./Role')
const Area = require('./Area')

const ObjectId = mongoose.Types.ObjectId
// base
const name = 'User'
const definition = {
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true, select: false},
    avatar: {type: String, default: '/images/default/avatar.jpeg'},
    enable: {type: Boolean, default: true},
    default: {type: Boolean, default: false},
    _role: {type: ObjectId, ref: Role.modelName, required: true},
    _area: {type: ObjectId, ref: Area.modelName, required: true},
}
const option = {
    timestamps: true
}
const schema = new mongoose.Schema(definition, option)

// join
// const option_virtual = {
//     ref: 'ModelC',
//     localField: '_id',
//     foreignField: '_modelA',
//     justOne: false,
// }
// schema.virtual('_modelCs', option_virtual)
// option_virtual.ref = 'ModelD'
// schema.virtual('_modelDs', option_virtual)

// schema.set('toObject', {virtuals: true})
// schema.set('toJSON', {virtuals: true})

// output
const Model = mongoose.model(name, schema)

module.exports = Model