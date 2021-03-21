import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { createLogger } from 'redux-logger'
import rootReducer from '../reducers'
import mySaga from '../sagas'

const store = (initialState = {}) => {
  const sagaMiddleware = createSagaMiddleware()
  const middlewares = [sagaMiddleware]
  if (process.env.NODE_ENV !== 'production') middlewares.push(createLogger())
  const store = createStore(rootReducer, initialState, applyMiddleware(...middlewares))
  sagaMiddleware.run(mySaga)
  return store
}

export default store
