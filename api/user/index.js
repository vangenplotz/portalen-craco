const { authMiddleware } = require('../lib/jwt')

module.exports = authMiddleware(async (req, res) => {
  res.json(req.user)
})
