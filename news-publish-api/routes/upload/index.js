const express = require('express')
const {revoke} = require('./controller')
const {createController_uploadImg} = require('./utill')

const path = '/upload'
const router = express.Router()

const path_imgs_userAvatar = '/images/user/avatars'
const controller_imgs_userAvatar = createController_uploadImg(path_imgs_userAvatar)

router.delete('/revoke', revoke)
  .post(path_imgs_userAvatar, controller_imgs_userAvatar.upload, controller_imgs_userAvatar.next)

module.exports = {path, router}