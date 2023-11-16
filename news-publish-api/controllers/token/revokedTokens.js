const RevokedToken = require('#models/token/RevokedToken')

const createOne = async ({token}) => {
  const rsl = {}
  rsl.revokeRoken = await RevokedToken.create({token})
  return rsl
}

module.exports = {
  createOne
}