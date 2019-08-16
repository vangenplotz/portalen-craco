const superagent = require('superagent')

async function getRoles(company) {
  const data = await superagent.get(
    `https://roles.portalen.win/roles${company ? `?company=${company}` : ''}`
  )
  return JSON.parse(data.text)
}

async function getLinks(roles = []) {
  const data = await superagent.get(
    `https://links.portalen.win/links?roles=${roles.join('|')}`
  )
  return JSON.parse(data.text)
}

async function getShortcuts(roles = [], ip) {
  const data = await superagent.get(
    `https://shortcuts.portalen.win/shortcuts?roles=${roles.join('|')}${
      ip ? `&myIp=${ip}` : ''
    }`
  )
  return JSON.parse(data.text)
}

async function getNews(roles = []) {
  const data = await superagent.get(
    `https://content.portalen.win/api/content?roles=${roles.join('|')}`
  )
  return JSON.parse(data.text)
}

module.exports = {
  getRoles,
  getLinks,
  getShortcuts,
  getNews
}
