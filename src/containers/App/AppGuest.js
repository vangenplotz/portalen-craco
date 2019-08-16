import React, { useContext, useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'

import TokenContext from '../../helpers/tokenContext'
import LayoutLoading from '../../components/Layout/LayoutLoading'

const Home = () => {
  const { token } = useContext(TokenContext)
  useEffect(() => {
    if (!token) {
      window.location = `/api/auth?returnUrl=${encodeURIComponent(
        window.location.origin
      )}`
    }
  }, [token])
  return <LayoutLoading title="Videresender til login" />
}
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
      <Route component={Home} />
    </Switch>
  )
}

export default AppGuest
