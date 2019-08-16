const { stringify } = require('querystring')
const uuid = require('uuid/v4')
const cookie = require('cookie')

const { loadConfig } = require('../lib/authConfig')

module.exports = async (req, res) => {
  const { baseDomain } = req.query
  if (baseDomain) {
    const nonce = uuid()
    res.setHeader('Set-Cookie', [
      cookie.serialize('baseDomain', baseDomain),
      cookie.serialize('nonce', nonce)
    ])
    res.json({
      baseDomain,
      nonce
    })
  } else {
    const { baseDomain, nonce } = req.cookies
    const { metadata, auth } = await loadConfig()
    const params = {
      ...auth,
      nonce,
      state: nonce,
      redirect_uri: `${baseDomain}/api/callback`
    }
    res.status(301)
    res.setHeader(
      'Location',
      `${metadata.authorization_endpoint}?${stringify(params)}`
    )
    return res.end()
  }
}
