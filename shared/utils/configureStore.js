import { compose, createStore,
  applyMiddleware } from 'redux'
import thunk                         from 'redux-thunk'

import reducers from '../reducers'

export default function configureStore(initialState, devTools=f=>f) {

  return createStore(
    reducers,
    initialState,
    compose(
      applyMiddleware(thunk),
      devTools
    )
  )
}
