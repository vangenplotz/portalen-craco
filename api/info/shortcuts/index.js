const { authMiddleware } = require('../../lib/jwt')
const { getShortcuts } = require('../../lib/infoData')

module.exports = authMiddleware(async (req, res) => {
  try {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
    const data = await getShortcuts(req.user.roles, ip)
    res.json(data)
  } catch (error) {
    res.status(500)
    res.json({ error: error.message })
  }
})
