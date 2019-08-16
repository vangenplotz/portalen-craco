import React, { useState, useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { hot } from 'react-hot-loader'
import { HelmetProvider } from 'react-helmet-async'
import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider } from '@material-ui/styles'

import App from './containers/App/App'
import theme from './helpers/theme'
import { TokenProvider } from './helpers/tokenContext'

const TOKEN_KEY = 'appToken'

const Root = ({ client, store }) => {
  const [token, updateToken] = useState(localStorage.getItem(TOKEN_KEY))
  const setToken = useCallback(t => {
    updateToken(t)
  }, [])
  client.token = token
  useEffect(() => {
    client.token = token
    if (token) {
      return localStorage.setItem(TOKEN_KEY, token)
    }
    localStorage.removeItem(TOKEN_KEY)
  }, [token, client.token])
  const tokenValue = {
    token,
    setToken
  }
  return (
    <Provider store={store} key="provider">
      <HelmetProvider>
        <TokenProvider value={tokenValue}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
              <App />
            </Router>
          </ThemeProvider>
        </TokenProvider>
      </HelmetProvider>
    </Provider>
  )
}

Root.propTypes = {
  client: PropTypes.object
}

export default hot(module)(Root)
