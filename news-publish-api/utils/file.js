const { readdir, unlink } = require('node:fs/promises')
const { createResultRecord } = require('./record')

const getInnerDir = async (dirname) => {
    // get common named dir
    const innerFileNames = await readdir(dirname)
    const innerDirs = innerFileNames.filter((innerFileName) => {
        return innerFileName.match(/^(\w+)$/) ? true : false
    })

    return innerDirs
}
const unlinkUploadImg = async (url) => {
    const rsl = createResultRecord()
    const path_unlink = './public' + url
    await unlink(path_unlink)
    .catch((err) => {
        rsl.fails.push(url)
        rsl.errs.push(err)
    })
    rsl.dones.push(url)

    return rsl
}

module.exports = {
    getInnerDir,
    unlinkUploadImg
}