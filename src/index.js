import React from 'react'
import { render } from 'react-dom'

import createStore from './redux/create'
import ApiClient from './helpers/ApiClient'
import Root from './Root'

const client = new ApiClient()
const store = createStore(client)
const dest = document.getElementById('root')

render(<Root store={store} client={client} />, dest)
