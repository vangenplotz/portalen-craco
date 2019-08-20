import React from 'react'
import ReactDOM from 'react-dom'

import Root from './Root'
import createStore from './redux/create'
import ApiClient from './helpers/ApiClient'

const client = new ApiClient()
const store = createStore(client)

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<Root store={store} client={client} />, div)
  ReactDOM.unmountComponentAtNode(div)
})
