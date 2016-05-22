import React from 'react'
import {render} from 'react-dom'
import {Router, Route, browserHistory} from 'react-router'
import {Provider} from 'react-redux'
import store from './store'

import HomePage from './containers/HomePage'

render((
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path='/' component={HomePage} />
    </Router>
  </Provider>
), document.getElementById('app'))
