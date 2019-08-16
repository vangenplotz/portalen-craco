import React, { useContext, useEffect } from 'react'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import loadable from '@loadable/component'

import TokenContext from '../../helpers/tokenContext'
import Layout from '../../components/Layout/Layout'
import Sidebar from './Sidebar'
import { load as loadUser } from '../../redux/modules/user'

const Dashboard = loadable(() =>
  import(/* webpackChunkName: "Dashboard" */ '../Dashboard/Dashboard')
)
const Search = loadable(() =>
  import(/* webpackChunkName: "Search" */ '../Search/Search')
)
const Settings = loadable(() =>
  import(/* webpackChunkName: "Settings" */ '../Settings/Settings')
)

const Feedback = () => {
  return (
    <>
      <h1>Feedback</h1>
    </>
  )
}
const NotFound = () => {
  return (
    <>
      <h1>NotFound</h1>
    </>
  )
}

const AppUser = ({ loadUser, authError }) => {
  const { setToken } = useContext(TokenContext)
  const logoutAction = () => {
    setToken(null)
  }
  useEffect(() => {
    loadUser()
  }, [loadUser])
  useEffect(() => {
    if (authError) {
      setToken(null)
    }
  }, [authError, setToken])
  return (
    <Layout logout={logoutAction} sidebar={<Sidebar />}>
      <Switch>
        <Route component={Dashboard} path="/" exact />
        <Route component={Feedback} path="/tilbakemeldinger" />
        <Route component={Settings} path="/innstillinger" />
        <Route component={Search} path="/sok/:query" />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  )
}

export default connect(
  state => ({
    user: state.user.data,
    authError: state.user.error
  }),
  {
    loadUser
  }
)(AppUser)
