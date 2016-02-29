import React                         from 'react'
import { render }                    from 'react-dom'
import { Provider }                  from 'react-redux'

import configureStore from '../shared/utils/configureStore'
import App            from '../shared/components/App'

const initialState = window.__INITIAL_STATE__

const devTools = window.devToolsExtension ? window.devToolsExtension() : f => f

const store = configureStore(initialState, devTools)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('react-view')
)
