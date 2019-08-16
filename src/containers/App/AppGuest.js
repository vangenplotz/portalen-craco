import React, { useContext, useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'

import { load as loadAuthCookies } from '../../redux/modules/auth'
import TokenContext from '../../helpers/tokenContext'
import LayoutLoading from '../../components/Layout/LayoutLoading'

const Home = ({ loadAuthCookies }) => {
  const { token } = useContext(TokenContext)
  useEffect(() => {
    if (!token) {
      loadAuthCookies(window.location.origin).then(() => {
        window.location = '/api/auth'
      })
    }
  }, [token, loadAuthCookies])
  return <LayoutLoading title="Videresender til login" />
}
const HomeConnected = connect(
  state => ({}),
  {
    loadAuthCookies
  }
)(Home)

const LoadAuth = ({ match: { params }, history: { replace } }) => {
  const { token, setToken } = useContext(TokenContext)
  useEffect(() => {
    if (!token && params.token) {
      setToken(params.token)
      replace('/')
    }
  }, [params, token, setToken, replace])
  return <LayoutLoading title="Laster bruker" />
}

const AppGuest = () => {
  return (
    <Switch>
      <Route path="/loadauth/:token" component={LoadAuth} />
      <Route component={HomeConnected} />
    </Switch>
  )
}

export default AppGuest
