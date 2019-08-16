const { authMiddleware } = require('../lib/jwt')
const superagent = require('superagent')

module.exports = authMiddleware(async (req, res) => {
  try {
    const { faset, from = 0, query, size } = req.query
    const url = `https://search.service.t-fk.no/api${
      faset && faset !== 'alt-innhold' ? `/${faset}` : ''
    }/search?query=${query}&from=${from}${size ? `&size=${size}` : ''}`
    const data = await superagent.get(url)
    res.json(JSON.parse(data.text))
  } catch (error) {
    res.status(500)
    res.json({ error: error.message })
  }
})
