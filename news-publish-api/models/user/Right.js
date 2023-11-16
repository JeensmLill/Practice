const mongoose = require('mongoose')

const name = 'Right'
const ObjectId = mongoose.Types.ObjectId
const definition = {
    name: { type: String, required: true, unique: true },
    code: { type: String, required: true, unique: true },
    /**
     * 0 root
     */
    level: { type: Number, required: true },
    /**
     * 0 root
     * 1 route
     * 2 button
     */
    type: { type: Number, required: true },
    enable: { type: Boolean, default: true },
    _parent: { type: ObjectId, ref: 'Right', required: true },
}
const option = {
    timestamps: true
}
const schema = new mongoose.Schema(definition, option)

const option_virtual = {
    ref: 'Right',
    localField: '_id',
    foreignField: '_parent',
    justOne: false,
}
schema.virtual('_children', option_virtual)

schema.set('toObject', { virtuals: true })
schema.set('toJSON', { virtuals: true })

const Model = mongoose.model(name, schema)

module.exports = Model