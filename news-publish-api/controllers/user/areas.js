const Area = require('#models/user/Area')

const get = async () => {
  const rsl = {}
  rsl.areas = await Area.find()
  return rsl
}

module.exports = {
  get
}