import { createStore as _createStore, applyMiddleware, compose } from 'redux'
import createMiddleware from './middleware/clientMiddleware'
import thunk from 'redux-thunk'

import reducers from './modules/reducer'

const isDev = process.env.NODE_ENV !== 'production'

export default function createStore(client, data) {
  const middleware = [createMiddleware(client), thunk]
  const extra =
    window.__REDUX_DEVTOOLS_EXTENSION__ && isDev
      ? [window.__REDUX_DEVTOOLS_EXTENSION__()]
      : []
  const finalCreateStore = compose(
    applyMiddleware(...middleware),
    ...extra
  )(_createStore)

  const store = finalCreateStore(reducers, data)

  if (isDev && module.hot) {
    module.hot.accept('./modules/reducer', () => {
      store.replaceReducer(require('./modules/reducer'))
    })
  }
  return store
}
