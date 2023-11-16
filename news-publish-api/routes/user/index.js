const express = require('express')
const users = require('#/controllers/user/users')
const roles = require('#/controllers/user/roles')
const areas = require('#/controllers/user/areas')
const rights = require('#/controllers/user/rights')
const { resJson_success, resJson_fail } = require('#/utils/response')

const path = '/users'
const router = express.Router()

router
.post('/add', async (req, res) => {
  try {
    await users.createOne(req.body)
    resJson_success(res, '添加用户成功')
  } catch (error) {
    resJson_fail(res, '添加用户失败', error)
  }
})
.get('/list/:page/:limit', async (req, res) => {
  const {page, limit} = req.params
  try {
    const datas = await Promise.all([
      users.getList({page, limit}),
      roles.get(),
      areas.get()
    ])
    resJson_success(res, '获取用户列表成功', {
      ...datas[0],
      ...datas[1],
      ...datas[2]
    })
  } catch (error) {
    resJson_fail(res, '获取用户列表失败', error)
  }
})
.patch('/update/:id', async (req, res) => {
  try {
    const {id} = req.params
    await users.updateOne({_id: id, ...req.body})
    resJson_success(res, '更新用户成功')
  } catch (error) {
    resJson_fail(res, '更新用户失败', error)
  }
})
.delete('/delete/:id', async (req, res) => {
  try {
    const {id} = req.params
    await users.deleteOne({_id: id})
    resJson_success(res, '删除用户成功')
  } catch (error) {
    resJson_fail(res, '删除用户失败', error)
  }
})

.post('/roles/add', async (req, res) => {
  try {
    await roles.createOne(req.body)
    resJson_success(res, '添加角色成功')
  } catch (error) {
    resJson_fail(res, '添加角色失败', error)
  }
})
.get('/roles/list/:page/:limit', async (req, res) => {
  try {
    const data = await roles.getList(req.params)
    resJson_success(res, '获取角色列表成功', data)
  } catch (error) {
    resJson_fail(res, '获取角色列表失败', error)
  }
})
.patch('/roles/update/:id', async (req, res) => {
  try {
    const {id} = req.params
    await roles.updateOne({_id: id, ...req.body})
    resJson_success(res, '更新角色成功')
  } catch (error) {
    resJson_fail(res, '更新角色失败', error)
  }
})
.delete('/roles/delete/:id', async (req, res) => {
  try {
    const {id} = req.params
    await roles.deleteOne({_id: id})
    resJson_success(res, '删除角色成功')
  } catch (error) {
    resJson_fail(res, '删除角色失败', error)
  }
})
.get('/roles/get/:id/rights', async (req, res) => {
  try {
    const data = await roles.getRights({_id: req.params.id})
    resJson_success(res, '获取角色权限成功', data)
  } catch (error) {
    resJson_fail(res, '获取角色权限失败', error)
  }
})
.post('/roles/set/:id/rights', async (req, res) => {
  try {
    await roles.setRights({_id: req.params.id, ...req.body})
    resJson_success(res, '设置角色权限成功')
  } catch (error) {
    resJson_fail(res, '设置角色权限失败', error)
  }
})

.get('/right', async (req, res) => {
  try {
    const data = await rights.getRightTree({rootName: 'root'})
    resJson_success(res, '获取权限成功', data)
  } catch (error) {
    resJson_fail(res, '获取权限失败', error)
  }
})
.patch('/rights/updateEnable/:id', async (req, res) => {
  try {
    const {id} = req.params
    await rights.updateEnable({_id: id, ...req.body})
    resJson_success(res, '更新权限的启用状态成功')
  } catch (error) {
    resJson_fail(res, '更新权限的启用状态失败', error)
  }
})

module.exports = {path, router}