import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
//import 'typeface-roboto'

import configureStore from './store/configureStore'
import './styles/styles.css'
import App from './components/App'

const store = configureStore()
const rootEl = document.getElementById('root')

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, rootEl)

if (module.hot) {
    module.hot.accept('./components/App', () => {
      const NextApp = require('./components/App').default
      ReactDOM.render(
        <Provider store={store}>
          <NextApp />
        </Provider>, rootEl)
    })
  }