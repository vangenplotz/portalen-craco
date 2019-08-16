import React, { useContext } from 'react'

import TokenContext from '../../helpers/tokenContext'
import Wrapper from '../../components/Layout/Wrapper'
import AppGuest from './AppGuest'
import AppUser from './AppUser'

const App = () => {
  const { token } = useContext(TokenContext)
  return <Wrapper>{token ? <AppUser /> : <AppGuest />}</Wrapper>
}

export default App
