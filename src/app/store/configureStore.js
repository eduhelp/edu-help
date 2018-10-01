/*
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import rootReducer from './index'
import rootSaga from './sagaIndex'

const sagaMiddleware =  createSagaMiddleware()
export const middleware = [sagaMiddleware]

//if (process.env.NODE_ENV !== 'production') {
  middleware.push(reduxImmutableStateInvariant())
//}

export default createStore(
    rootReducer,
    composeWithDevTools(
      applyMiddleware(...middleware)
    )
)

sagaMiddleware.run(rootSaga)
 */

import { createStore, applyMiddleware } from 'redux'
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import rootReducer from './index'
import thunk from 'redux-thunk'

export const middleware = []

export default function configureStore () {
  return createStore(
    rootReducer,
    composeWithDevTools(
      applyMiddleware(reduxImmutableStateInvariant(), thunk),
    ))
}