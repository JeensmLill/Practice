const Role_Right = require('#models/user/Role_Right')

const getRoleRights = async ({roleId}) => {
  const rsl = {routeRights: [], buttonRights: []}
  const role_rights = await Role_Right.find({_role: roleId})
  .populate({path: '_right', match: {enable: true}, select: 'code type'})
  role_rights.forEach((role_right) => {
    const right = role_right._right
    switch(right.type) {
      case 1:
        rsl.routeRights.push(right.code)
        break;
      case 2:
        rsl.buttonRights.push(right.code)
        break;
    }
  })
  return rsl
}

module.exports = {
  getRoleRights,
}