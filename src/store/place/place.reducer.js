import {
  REQUEST_PLACES,
  REQUEST_PLACES_SUCCESS,
  REQUEST_PLACES_ERROR,
  REQUEST_PLACE,
  REQUEST_PLACE_SUCCESS,
  REQUEST_PLACE_ERROR,
  LOOKUP_PLACE,
  LOOKUP_PLACE_SUCCESS,
  LOOKUP_PLACE_ERROR
} from './place.actions'

const initialState = {
  items: [],
  item: null,
  current: null,
  loading: {
    items: false,
    item: false,
    current: false
  },
  error: {
    items: false,
    item: false,
    current: false
  }
}

export default function placeReducer (state = initialState, action) {
  switch (action.type) {
    case REQUEST_PLACES:
      return {
        ...state,
        loading: {...state.loading, items: true},
        error: {...state.error, items: false}
      }
    case REQUEST_PLACES_SUCCESS:
      return {
        ...state,
        items: action.append ? [...state.items, ...action.result] : action.result,
        loading: {...state.loading, items: false}
      }
    case REQUEST_PLACES_ERROR:
      return {
        ...state,
        loading: {...state.loading, items: false},
        error: {...state.error, items: true}
      }

    case REQUEST_PLACE:
      return {
        ...state,
        item: state.item && state.item === action.id ? state.item : null,
        loading: {...state.loading, item: true},
        error: {...state.error, item: false}
      }
    case REQUEST_PLACE_SUCCESS:
      return {
        ...state,
        item: action.result,
        loading: {...state.loading, item: false}
      }
    case REQUEST_PLACE_ERROR:
      return {
        ...state,
        loading: {...state.loading, item: false},
        error: {...state.error, item: true}
      }

    case LOOKUP_PLACE:
      return {
        ...state,
        loading: {...state.loading, current: true},
        error: {...state.error, current: false}
      }
    case LOOKUP_PLACE_SUCCESS:
      return {
        ...state,
        current: action.result,
        item: action.item,
        loading: {...state.loading, current: false}
      }
    case LOOKUP_PLACE_ERROR:
      return {
        ...state,
        loading: {...state.loading, current: false},
        error: {...state.error, current: true}
      }

    default:
      return state
  }
}
