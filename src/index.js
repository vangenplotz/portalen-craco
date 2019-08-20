import '@babel/polyfill'
import React from 'react'
import { render } from 'react-dom'
import * as serviceWorker from './serviceWorker'

import createStore from './redux/create'
import ApiClient from './helpers/ApiClient'
import Root from './Root'

const client = new ApiClient()
const store = createStore(client)
const dest = document.getElementById('root')

render(<Root store={store} client={client} />, dest)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
