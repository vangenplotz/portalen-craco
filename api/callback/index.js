const { stringify } = require('querystring')
const axios = require('axios')
const { createToken } = require('../lib/jwt')
const getUserRoles = require('../lib/getUserRoles')
const { loadConfig } = require('../lib/authConfig')

/*
async function validateToken({ data, config }) {
  const { keys, metadata, auth } = config
  const decodedToken = jwt.decode(data.id_token, { complete: true })
  const { x5c } = keys.find(key => decodedToken.header.x5t === key.x5t)
  const pubCert = `-----BEGIN CERTIFICATE-----\n${x5c}\n-----END CERTIFICATE-----`
  let verifiedToken = jwt.verify(data.id_token, pubCert)
  if (verifiedToken.iss !== metadata.issuer) {
    throw Error('Failed to login - Invalid issuer')
  }
  if (data.state !== auth.state) {
    throw Error('Failed to login - Invalid state')
  }
  if (verifiedToken.nonce !== auth.nonce) {
    throw Error('Failed to login - Invalid nonce')
  }
  return verifiedToken
}
*/

async function getToken({ code, config }) {
  const payload = stringify({
    client_id: config.auth.client_id,
    code,
    redirect_uri: config.auth.redirect_uri,
    resource: 'https://graph.microsoft.com',
    client_secret: process.env.MOA_CLIENT_SECRET,
    grant_type: 'authorization_code'
  })
  const { data } = await axios.post(config.metadata.token_endpoint, payload)
  return data
}

async function getUserInfo(token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
  const { data } = await axios(
    'https://graph.microsoft.com/v1.0/me?$select=businessPhones,displayName,givenName,jobTitle,mail,mobilePhone,officeLocation,surname,userPrincipalName,department,birthday,companyName'
  )
  return data
}

module.exports = async (req, res) => {
  try {
    const { code } = req.body
    const { baseDomain, nonce } = req.cookies
    const { keys, metadata, auth } = await loadConfig()
    const config = {
      keys,
      metadata,
      auth: {
        ...auth,
        nonce,
        state: nonce,
        redirect_uri: `${baseDomain}/api/callback`
      }
    }
    // const profile = await validateToken({ data: req.body, config })
    const token = await getToken({ code, config })
    const userProfile = await getUserInfo(token.access_token)
    const roles = getUserRoles(userProfile.companyName)
    const user = {
      cn: userProfile.displayName,
      userId: userProfile.userPrincipalName,
      company: userProfile.companyName,
      mail: userProfile.mail,
      roles
    }
    const localToken = createToken(user)
    res.status(301)
    res.setHeader('Location', `/loadauth/${localToken}`)
    return res.end()
  } catch (error) {
    res.status(500)
    res.json({ error: error.message })
  }
}
