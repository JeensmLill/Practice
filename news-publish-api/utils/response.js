const resJson_success = (res, msg, data = null) => {
    res.json({
        ok: true,
        code: 200,
        msg,
        data
    })
}
const resJson_fail = (res, msg, data = null) => {
    res.json({
        ok: false,
        code: 201,
        msg,
        data
    })
}

module.exports = {
    resJson_success,
    resJson_fail
}