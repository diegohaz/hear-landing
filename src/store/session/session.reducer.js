import {
  CREATE_SESSION,
  CREATE_SESSION_SUCCESS,
  CREATE_SESSION_ERROR,
  REMOVE_SESSION,
  REMOVE_SESSION_SUCCESS,
  REMOVE_SESSION_ERROR
} from './session.actions'

const initialState = {
  accessToken: null,
  loading: false,
  error: false
}

export default function sessionReducer (state = initialState, action) {
  switch (action.type) {
    case CREATE_SESSION:
      return {
        ...state,
        loading: true,
        error: false
      }
    case CREATE_SESSION_SUCCESS:
      return {
        ...state,
        accessToken: action.accessToken,
        loading: false
      }
    case CREATE_SESSION_ERROR:
      return {
        ...state,
        loading: false,
        error: true
      }
    case REMOVE_SESSION:
      return {
        ...state,
        accessToken: null,
        loading: true,
        error: false
      }
    case REMOVE_SESSION_SUCCESS:
      return {
        ...state,
        loading: false
      }
    case REMOVE_SESSION_ERROR:
      return {
        ...state,
        loading: false,
        error: true
      }
    default:
      return state
  }
}
