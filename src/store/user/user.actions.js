import {normalize} from 'normalizr'
import {removeSession, createAnonymousSession} from '../session/session.actions'
import user from './user.schema'

export const REQUEST_USER = 'REQUEST_USER'
export const REQUEST_USER_SUCCESS = 'REQUEST_USER_SUCCESS'
export const REQUEST_USER_ERROR = 'REQUEST_USER_ERROR'
export const UPDATE_USER = 'UPDATE_USER'

export function getMe () {
  return (dispatch, getState, {api}) => {
    dispatch({type: REQUEST_USER})

    return api.get('/users/me').then((res) => {
      const {result, entities} = normalize(res.data, user)
      dispatch({type: REQUEST_USER_SUCCESS, result, entities})
      return res.data
    }).catch((error) => {
      dispatch({type: REQUEST_USER_ERROR, error})
      if (error.status === 401) {
        dispatch(removeSession()).catch(() => {
          return dispatch(createAnonymousSession())
        }).then(() => {
          return dispatch(getMe())
        })
      }
      throw error
    })
  }
}

export function updateMe (body) {
  return (dispatch, getState, {api}) => {
    const {me} = getState().user
    const {result, entities} = normalize(body, user)
    dispatch({type: UPDATE_USER, result, entities})

    return api.put(`/users/${me}`, {...body}).then((res) => {
      const {result, entities} = normalize(res.data, user)
      dispatch({type: REQUEST_USER_SUCCESS, result, entities})
      return res.data
    }).catch((error) => {
      dispatch({type: REQUEST_USER_ERROR, error})
      throw error
    })
  }
}
