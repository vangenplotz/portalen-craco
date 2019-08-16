const { authMiddleware } = require('../../lib/jwt')
const { getLinks } = require('../../lib/infoData')

module.exports = authMiddleware(async (req, res) => {
  try {
    const data = await getLinks(req.user.roles)
    res.json(data)
  } catch (error) {
    res.status(500)
    res.json({ error: error.message })
  }
})
