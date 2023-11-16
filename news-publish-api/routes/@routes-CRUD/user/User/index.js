const express = require('express')
const {
create,
read,
update_byId,
delete_byId
} = require('./controller')

const path = '/crud/user'
const router = express.Router()

router.post('/', create)
router.get('/', read)
router.patch('/:id', update_byId)
router.delete('/:id', delete_byId)

module.exports = { path, router }