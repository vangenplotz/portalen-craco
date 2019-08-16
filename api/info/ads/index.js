const { authMiddleware } = require('../../lib/jwt')
const { getNews } = require('../../lib/infoData')

module.exports = authMiddleware(async (req, res) => {
  try {
    const data = await getNews(req.user.roles)
    res.json(data.ads && !!data.ads.length ? data.ads : null)
  } catch (error) {
    res.status(500)
    res.json({ error: error.message })
  }
})
