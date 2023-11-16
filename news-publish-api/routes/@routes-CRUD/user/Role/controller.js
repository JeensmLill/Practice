const Model = require('#models/user/Role')
const { resJson_success, resJson_fail } = require('#utils/response')

// CRUD
const create = (req, res) => {
    const doc = req.body
    Model.create(doc)
        .then(() => {
            resJson_success(res, '创建成功')
        })
        .catch((err) => {
            resJson_fail(res, '创建失败', { err })
        })
}
const read = (req, res) => {
    Model.find()
        .then((docs) => {
            resJson_success(res, '获取成功', { docs })
        })
        .catch((err) => {
            resJson_fail(res, '获取失败', { err })
        })
}
const update_byId = (req, res) => {
    const id = req.params.id
    const update = req.body
    Model.findByIdAndUpdate(id, update)
        .then((doc) => {
            if (doc) {
                resJson_success(res, '更新成功')
            } else {
                resJson_fail(res, '更新目标不存在')
            }
        })
        .catch((err) => {
            resJson_fail(res, '更新失败', { err })
        })
}
const delete_byId = (req, res) => {
    const id = req.params.id
    Model.findByIdAndDelete(id)
        .then((doc) => {
            if (doc) {
                resJson_success(res, '删除成功')
            } else {
                resJson_fail(res, '删除目标不存在')
            }
        })
        .catch((err) => {
            resJson_fail(res, '删除失败', { err })
        })
}

module.exports = {
    create,
    read,
    update_byId,
    delete_byId
}