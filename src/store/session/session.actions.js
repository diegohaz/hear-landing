export const CREATE_SESSION = 'CREATE_SESSION'
export const CREATE_SESSION_SUCCESS = 'CREATE_SESSION_SUCCESS'
export const CREATE_SESSION_ERROR = 'CREATE_SESSION_ERROR'
export const REMOVE_SESSION = 'REMOVE_SESSION'
export const REMOVE_SESSION_SUCCESS = 'REMOVE_SESSION_SUCCESS'
export const REMOVE_SESSION_ERROR = 'REMOVE_SESSION_ERROR'

export function createSession (username, password) {
  return (dispatch, getState, {api}) => {
    const {session} = getState()
    const dispatchSession = (accessToken) => {
      if (api && api.defaults && api.defaults.headers && api.defaults.headers.common) {
        api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
      }
      dispatch({type: CREATE_SESSION_SUCCESS, accessToken})
      return Promise.resolve({accessToken})
    }

    if (typeof session === 'undefined') {
      throw new Error('There is no session store')
    }

    dispatch({type: CREATE_SESSION})

    if (session.accessToken) {
      return dispatchSession(session.accessToken)
    }

    return api.post('/sessions', {}, {auth: {username, password}}).then((res) => {
      return dispatchSession(res.data.access_token)
    }).catch((error) => {
      dispatch({type: CREATE_SESSION_ERROR, error})
      throw error
    })
  }
}

export function createAnonymousSession () {
  return createSession('anonymous', 'password')
}

export function removeSession ({accessToken} = {}) {
  return (dispatch, getState, {api}) => {
    if (typeof accessToken === 'undefined') {
      const {session} = getState()
      if (!session || !session.accessToken) {
        throw new Error('There is no session.accessToken state')
      }
      accessToken = session.accessToken
    }
    if (api && api.defaults && api.defaults.headers && api.defaults.headers.common) {
      api.defaults.headers.common['Authorization'] = undefined
    }

    dispatch({type: REMOVE_SESSION})

    return api.delete(`/sessions/${accessToken}`).then((res) => {
      dispatch({type: REMOVE_SESSION_SUCCESS})
      return res.data
    }).catch((error) => {
      dispatch({type: REMOVE_SESSION_ERROR, error, accessToken})
      throw error
    })
  }
}
