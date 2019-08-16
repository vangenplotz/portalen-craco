const rolesData = require('./roles.json')

function generateId(input) {
  input = input.toLowerCase()
  input = input.replace(/\s/g, '')
  input = input.replace(/\//g, '')
  input = input.replace(/,/g, '')
  input = input.replace(/å/g, 'a')
  input = input.replace(/ø/g, 'o')
  input = input.replace(/æ/g, 'e')

  return input
}

module.exports = company => {
  const companyId = generateId(company)
  const roles = rolesData.find(role => role.id === companyId)
  return roles ? roles.groups : []
}
