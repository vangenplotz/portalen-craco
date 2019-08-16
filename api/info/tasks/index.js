const jwt = require('jsonwebtoken')
const axios = require('axios')

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
    axios.defaults.headers.common['Authorization'] = token
    const { data } = await axios.get(`https://tasks.t-fk.no/user/${userId}`)
    res.json(data.data)
  } catch (error) {
    res.status(500)
    res.json({ error: error.message })
  }
})
