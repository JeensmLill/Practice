const {unlink} = require('node:fs/promises')
const { asyncArray_forEach } = require('#/utils/async')
const { createResultRecord } = require('#/utils/record')
const { baseUrl_assets } = require('#/utils/file')
const { resJson_success, resJson_fail } = require('#/utils/response')

const revoke = async (req, res) => {
  const paths = req.body
  const rsl = createResultRecord()
  await asyncArray_forEach(paths, async (path) => {
    await unlink(baseUrl_assets + path)
    .then(() => {
      rsl.dones.push(path)
    })
    .catch((err) => {
      rsl.fails.push(path)
      rsl.errs.push(err)
    })
  })
  resJson_success(res, '撤销上传成功', rsl)
}
module.exports = {
  revoke
}