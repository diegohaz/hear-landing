import {
  REQUEST_GEOLOCATION,
  REQUEST_GEOLOCATION_SUCCESS,
  REQUEST_GEOLOCATION_ERROR
} from './geolocation.actions'

const initialState = {
  coords: {},
  loading: false,
  error: null
}

export default function geolocationReducer (state = initialState, action) {
  switch (action.type) {
    case REQUEST_GEOLOCATION:
      return {
        ...state,
        loading: true
      }

    case REQUEST_GEOLOCATION_SUCCESS:
      return {
        ...state,
        coords: action.coords,
        loading: false
      }

    case REQUEST_GEOLOCATION_ERROR:
      return {
        ...state,
        error: action.error,
        loading: false
      }

    default:
      return state
  }
}
