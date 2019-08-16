const { verifyRemoteToken, createToken } = require('../lib/jwt')
const { getRoles } = require('../lib/infoData')

module.exports = async (req, res) => {
  const { jwt, returnUrl } = req.query
  if (returnUrl) {
    // Send user to auth-serive
    res.status(301)
    res.setHeader(
      'Location',
      `${process.env.AUTH_SERVICE_URL}?origin=${returnUrl}/api/auth`
    )
    return res.end()
  }
  if (jwt) {
    // Returned from auth-service
    try {
      const data = await verifyRemoteToken(jwt)
      const roles = await getRoles('Sentraladministrasjonen')
      const token = createToken({
        ...data,
        roles,
        rolesJoined: roles.join() // Needed??
      })
      res.status(301)
      res.setHeader('Location', `/loadauth/${token}`)
      return res.end()
    } catch (error) {
      res.status(500)
      res.json({ error: error.message })
    }
  }
}
