import React from 'react'

const TokenContext = React.createContext({
  token: null,
  setToken: () => {}
})

export const TokenProvider = TokenContext.Provider
export const TokenConsumer = TokenContext.Consumer
export default TokenContext
