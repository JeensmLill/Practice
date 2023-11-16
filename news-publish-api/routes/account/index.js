const express = require('express')
const User = require('#models/user/User')
const { resJson_success, resJson_fail } = require('#utils/response')
const { createToken, validateToken } = require('#utils/token')
const {extract_token_form_authorization} = require('#utils/extract')
const users = require('#/controllers/user/users')
const revokedTokens = require('#/controllers/token/revokedTokens')
const role_rights = require('#/controllers/user/role_rights')

const path = '/account'
const router = express.Router()

router.post('/login', (req, res) => {
  const {
    username,
    password
  } = req.body
  User.findOne({
    username,
    password
  })
  .then((user) => {
      if(user) {
          const token = createToken({uid: user.id})
          resJson_success(res, '用户登录成功', {token})
      } else {
          resJson_fail(res, '用户不存在')
      }
  })
})
.post('/validate', (req, res) => {
    const {token} = req.body
    const validate = validateToken(token)
    if(validate) {
        resJson_success(res, '认证有效', {validate})
    } else {
        resJson_fail(res, '认证无效', {validate})
    }
})
.get('/info', async (req, res) => {
  try {
    const id = req.auth.uid
    const userData = await users.getOne({_id: id})
    const rightData = await role_rights.getRoleRights({roleId: userData.user._role.id})
    resJson_success(res, '获取用户信息成功', {
      ...userData,
      ...rightData
    })
  } catch (error) {
    console.log("error",error);
    resJson_fail(res, '获取用户信息失败', error)
  }
})
.post('/logout', async (req, res) => {
  try {
    revokedTokens.createOne({
      token: extract_token_form_authorization(req.headers.authorization)
    })
    resJson_success(res, '登出成功')
  } catch (error) {
    resJson_fail(res, '登出失败', err)
  }
})

module.exports = { path, router }