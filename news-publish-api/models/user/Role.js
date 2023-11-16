const mongoose = require('mongoose')

const name = 'Role'
const definition = {
    name: {type: String, required: true, unique: true},
}
const option = {
    timestamps: true
}
const schema = new mongoose.Schema(definition, option)

// join
const option_virtual = {
    ref: 'Role_Right',
    localField: '_id',
    foreignField: '_role',
    justOne: false,
}
schema.virtual('_role_rights', option_virtual)
// option_virtual.ref = 'ModelD'
// schema.virtual('_modelDs', option_virtual)

schema.set('toObject', {virtuals: true})
schema.set('toJSON', {virtuals: true})

const Model = mongoose.model(name, schema)

module.exports = Model