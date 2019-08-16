const { authMiddleware } = require('../lib/jwt')
const axios = require('axios')

module.exports = authMiddleware(async (req, res) => {
  try {
    const { faset, from = 0, query, size } = req.query
    const url = `https://search.service.t-fk.no/api${
      faset && faset !== 'alt-innhold' ? `/${faset}` : ''
    }/search?query=${query}&from=${from}${size ? `&size=${size}` : ''}`
    const { data } = await axios.get(url)
    res.json(data)
  } catch (error) {
    res.status(500)
    res.json({ error: error.message })
  }
})
