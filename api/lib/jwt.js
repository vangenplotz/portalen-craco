const jwt = require('jsonwebtoken')
const encryptor = require('simple-encryptor')(process.env.ENCRYPTOR_SECRET)
const superagent = require('superagent')

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

function verifyRemoteToken(token) {
  return new Promise((resolve, reject) => {
    if (!token) {
      reject(new Error('Missing required signin jwt'))
    } else {
      jwt.verify(token, process.env.API_JWT_SECRET, (error, decoded) => {
        if (error) {
          reject(error)
        } else {
          const decrypted = encryptor.decrypt(decoded.data)
          const sessionUrl = `${process.env.SESSION_STORAGE_URL}/${decrypted.session}`
          console.log('sessionUrl', sessionUrl)
          superagent
            .get(sessionUrl)
            .then(result => {
              const user = encryptor.decrypt(result.body.value)
              const data = {
                cn: user.displayName || user.cn || '',
                userId: user.sAMAccountName || user.uid || '',
                company: user.company || 'Sentraladministrasjonen',
                mail: user.mail || 'post@tfk.no'
              }
              resolve(data)
            })
            .catch(error => {
              reject(error)
            })
        }
      })
    }
  })
}

module.exports = {
  verifyRemoteToken,
  createToken,
  decodeToken,
  authMiddleware
}
