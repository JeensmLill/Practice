const multer = require('multer')
const path = require('path')
const { resJson_success, resJson_fail } = require('#/utils/response')

const baseUrl_assets = "public"
const createController_uploadImg = (uploadPath, isOne = true) => {
  const storePath = baseUrl_assets + uploadPath
  const option = {
    storage: multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, storePath)
      },
      filename: (req, file, cb) => {
        cb(null, Date.now() + Math.round(Math.random() * 1E9) + path.extname(file.originalname))
      }
    }),
    fileFilter: (req, file, cb) => {
      if (file.mimetype.includes('image')) {
        cb(null, true)
      } else {
        cb(null, false)
      }
    }
  }
  return {
    path: uploadPath,
    upload: multer(option).array('image'),
    next: (req, res) => {
      const files = req.files
      let imgUrls = []
      files.forEach((item) => {
        imgUrls.push(uploadPath + '/' + item.filename)
      })
      isOne
      ? resJson_success(res, '上传成功', { imgUrl: imgUrls[0] })
      : resJson_success(res, '上传成功', { imgUrls })
    }
  }
}

module.exports = {
  createController_uploadImg
}