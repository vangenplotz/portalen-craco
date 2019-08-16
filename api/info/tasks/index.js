const jwt = require('jsonwebtoken')
const superagent = require('superagent')

const { authMiddleware } = require('../../lib/jwt')

module.exports = authMiddleware(async (req, res) => {
  try {
    const { cn, userId } = req.user
    const token = jwt.sign(
      {
        user: userId,
        name: cn,
        system: 'portalen-forside'
      },
      process.env.PORTALEN_TASKS_JWT_KEY,
      {
        expiresIn: '1h',
        issuer: 'https://auth.t-fk.no'
      }
    )
    const data = await superagent
      .get(`https://tasks.t-fk.no/user/${userId}`)
      .set({ Authorization: token })
    const parsed = JSON.parse(data.text)
    res.json(parsed.data)
  } catch (error) {
    res.status(500)
    res.json({ error: error.message })
  }
})
