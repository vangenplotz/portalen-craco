const { authMiddleware } = require('../../lib/jwt')
const { getNews } = require('../../lib/infoData')

module.exports = authMiddleware(async (req, res) => {
  try {
    const data = await getNews(req.user.roles)
    res.json(data.news && !!data.news.length ? data.news : null)
  } catch (error) {
    res.status(500)
    res.json({ error: error.message })
  }
})
