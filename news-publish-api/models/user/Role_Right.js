const mongoose = require('mongoose')

const name = 'Role_Right'
const ObjectId = mongoose.Types.ObjectId
const definition = {
    _role: { type: ObjectId, ref: 'Role', required: true },
    _right: { type: ObjectId, ref: 'Right', required: true },
}
const option = {
    timestamps: true
}
const schema = new mongoose.Schema(definition, option)
const Model = mongoose.model(name, schema)

module.exports = Model