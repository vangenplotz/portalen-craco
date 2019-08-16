const jwt = require('jsonwebtoken')

function createToken(data) {
  return jwt.sign(data, process.env.API_JWT_SECRET, {
    expiresIn: '7 days'
  })
}

function decodeToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.API_JWT_SECRET, (err, user) => {
      if (err) {
        return reject(err)
      }
      if (!user.userId) {
        return reject(new Error('Not auth'))
      }
      resolve(user)
    })
  })
}

const authMiddleware = func => {
  return async (req, res) => {
    try {
      const { authorization } = req.headers
      if (!authorization) {
        throw new Error('Missing authorization header')
      }
      const user = await decodeToken(
        req.headers.authorization.replace('Bearer ', '')
      )
      req.user = user
      return func(req, res)
    } catch (error) {
      res.status(500)
      res.json({ error: error.message })
    }
  }
}

module.exports = {
  createToken,
  decodeToken,
  authMiddleware
}
