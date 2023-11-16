const Model = require('#/models/user/Right')
const modelManager = require('#/controllers/user/rights')
const { resJson_success, resJson_fail } = require('#utils/response')
const { default: mongoose } = require('mongoose')

// CRUD
const create = async (req, res) => {
    const doc = req.body
    const rsl_validate = await modelManager.validateDoc(doc)
    if(rsl_validate.ok) {
        Model.create(doc)
            .then(() => {
                resJson_success(res, '创建成功')
            })
            .catch((err) => {
                resJson_fail(res, '创建失败', { err })
            })
    } else {
        resJson_fail(res, '数据校验失败', {rsl_validate})
    }
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
    Model.findById(req.params.id)
    .then(async (doc) => {
        if (doc) {
            Object.assign(doc, req.body)
            const rsl_validate = await modelManager.validateDoc(doc)
            if(rsl_validate.ok) {
                doc.save()
                .then(() => {
                    resJson_success(res, '更新成功')
                })
                .catch((err) => {
                    resJson_fail(res, '更新失败', {err})
                })
            } else {
                resJson_fail(res, '数据校验失败', {rsl_validate})
            }
        } else {
            resJson_fail(res, '更新目标不存在')
        }
    })
    .catch((err) => {
        resJson_fail(res, '更新失败', {err})
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

const createRoot = (req, res) => {
    const rootCode = 'root'
    Model.findOne({name: rootCode})
    .then(async (doc) => {
        if(!doc) {
            Model.create({
                name: 'root',
                code: rootCode,
                level: 0,
                type: 0,
                _parent: new mongoose.Types.ObjectId
            })
            .then(() => {
                resJson_success(res, 'root 创建成功')
            })
        } else {
            resJson_fail(res, 'root 已存在')
        }
    })
}

module.exports = {
    create,
    read,
    update_byId,
    delete_byId,
    createRoot
}