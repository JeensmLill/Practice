const express = require('express')
const rights = require('#controllers/user/rights')
const { resJson_success, resJson_fail } = require('#/utils/response')

const path = '/crud/right'
const router = express.Router()

router.post('/create/root', async (req, res) => {
    try {
        await rights.createRoot(req.body)
        resJson_success(res, '创建根权限成功')
    } catch (error) {
        resJson_fail(res, '创建根权限失败', error)
    }
})
.post('/create/child', async (req, res) => {
    try {
        await rights.createChild(req.body)
        resJson_success(res, '创建子权限成功')
    } catch (error) {
        resJson_fail(res, '创建子权限失败', error)
    }
})
.get('/read/tree/:rootName', async (req, res) => {
    try {
        const data = await rights.getRightTree(req.params)
        resJson_success(res, '获取权限树成功', data)
    } catch (error) {
        resJson_fail(res, '获取权限树失败', error)
    }
})

module.exports = { path, router }