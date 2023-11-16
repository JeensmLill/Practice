const createResultRecord = () => {
    return {
        dones: [],
        fails: [],
        errs: []
    }
}
const createCheckRecord = () => {
    return {
        ok: false,
        msgs: []
    }
}

module.exports = {
    createResultRecord,
    createCheckRecord
}