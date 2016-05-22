import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import persistState from 'redux-localstorage'
import api from '../services/api'
import reducers from './reducers'

const finalCreateStore = compose(
  applyMiddleware(thunk.withExtraArgument({api})),
  persistState(['session']),
  window.devToolsExtension ? window.devToolsExtension() : (f) => f
)(createStore)

const store = finalCreateStore(reducers)

if (module.hot) {
  module.hot.accept('./reducers', () => {
    const nextReducer = require('./reducers').default
    store.replaceReducer(nextReducer)
  })
}

export default store
