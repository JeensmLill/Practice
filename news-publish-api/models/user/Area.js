const mongoose = require('mongoose')

const name = 'Area'
const definition = {
    name: { type: String, required: true, unique: true },
}
const option = {
    timestamps: true
}
const schema = new mongoose.Schema(definition, option)
const Model = mongoose.model(name, schema)

module.exports = Model