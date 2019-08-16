const axios = require('axios')

async function getRoles(company) {
  const { data } = await axios.get(
    `https://roles.portalen.win/roles${company ? `?company=${company}` : ''}`
  )
  return data
}

async function getLinks(roles = []) {
  const { data } = await axios.get(
    `https://links.portalen.win/links?roles=${roles.join('|')}`
  )
  return data
}

async function getShortcuts(roles = [], ip) {
  const { data } = await axios.get(
    `https://shortcuts.portalen.win/shortcuts?roles=${roles.join('|')}${
      ip ? `&myIp=${ip}` : ''
    }`
  )
  return data
}

async function getNews(roles = []) {
  const { data } = await axios.get(
    `https://content.portalen.win/api/content?roles=${roles.join('|')}`
  )
  return data
}

module.exports = {
  getRoles,
  getLinks,
  getShortcuts,
  getNews
}
