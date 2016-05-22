import {
  REQUEST_USER,
  REQUEST_USER_SUCCESS,
  REQUEST_USER_ERROR,
  UPDATE_USER
} from './user.actions'

const initialState = {
  me: null,
  loading: false,
  error: false
}

export default function userReducer (state = initialState, action) {
  switch (action.type) {
    case UPDATE_USER:
    case REQUEST_USER:
      return {
        ...state,
        loading: true,
        error: false
      }
    case REQUEST_USER_SUCCESS:
      return {
        ...state,
        me: action.result,
        loading: false
      }
    case REQUEST_USER_ERROR:
      return {
        ...state,
        loading: false,
        error: true
      }
    default:
      return state
  }
}
