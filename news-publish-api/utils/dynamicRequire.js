const { readdir } = require('node:fs/promises')
const { asyncArray_forEach } = require("./async")
const { getInnerDir } = require('./file')

const requireFormInnerDir = async function(dirname) {
    // require common named dir
    const modules = []
    const innerDirs = await getInnerDir(dirname)
    await asyncArray_forEach(innerDirs, async (innerDir) => {
        modules.push(await require(`${dirname}/${innerDir}`))
    })

    return modules
}
const requireFormDir = async function(dirname, currentFilename) {
    // require common named dir and file
    const modules = []
    const localFileNames = await readdir(dirname)
    const localDirs = localFileNames.filter((fileName) => {
        return (fileName.match(/^(\w+)$/) || fileName.match(/^(\w+)\.js$/))
        && fileName !== currentFilename.replace(dirname, '')
        ? true : false
    })
    await asyncArray_forEach(localDirs, async (localDir) => {
        modules.push(await require(`${dirname}/${localDir}`))
    })

    return modules
}

module.exports = {
    requireFormInnerDir,
    requireFormDir
}