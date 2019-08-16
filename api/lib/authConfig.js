const axios = require('axios')

const auth = {
  client_id: process.env.MOA_CLIENT_ID,
  response_type: 'code id_token',
  response_mode: 'form_post',
  scope: 'openid'
}

let cachedConfig = null

const loadConfig = async () => {
  try {
    if (cachedConfig) {
      return cachedConfig
    }
    const autodiscoverUrl = `https://login.microsoftonline.com/${process.env.MOA_TENANT_ID}/.well-known/openid-configuration`
    const { data: metadata } = await axios.get(autodiscoverUrl)
    const {
      data: { keys }
    } = await axios.get(metadata.jwks_uri)
    cachedConfig = {
      keys,
      metadata,
      auth
    }
    return cachedConfig
  } catch (error) {
    throw error
  }
}

module.exports = {
  loadConfig
}
