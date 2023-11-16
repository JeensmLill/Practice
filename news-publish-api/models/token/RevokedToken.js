const mongoose = require('mongoose')

const name = 'RevokedToken',
    definition = {
        token: {type: String, required: true, unique: true},
    },
    option = {
        timestamps: true
    },
    schema = new mongoose.Schema(definition, option)

const Model = mongoose.model(name, schema)

module.exports = Model