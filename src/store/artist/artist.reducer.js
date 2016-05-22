import {
  REQUEST_ARTISTS,
  REQUEST_ARTISTS_SUCCESS,
  REQUEST_ARTISTS_ERROR,
  REQUEST_ARTIST,
  REQUEST_ARTIST_SUCCESS,
  REQUEST_ARTIST_ERROR
} from './artist.actions'

const initialState = {
  items: [],
  item: null,
  loading: {
    items: false,
    item: false
  },
  error: {
    items: false,
    item: false
  }
}

export default function artistReducer (state = initialState, action) {
  switch (action.type) {
    case REQUEST_ARTISTS:
      return {
        ...state,
        loading: {...state.loading, items: true},
        error: {...state.error, items: false}
      }
    case REQUEST_ARTISTS_SUCCESS:
      return {
        ...state,
        items: action.append ? [...state.items, ...action.result] : action.result,
        loading: {...state.loading, items: false}
      }
    case REQUEST_ARTISTS_ERROR:
      return {
        ...state,
        loading: {...state.loading, items: false},
        error: {...state.error, items: true}
      }

    case REQUEST_ARTIST:
      return {
        ...state,
        item: state.item && state.item === action.id ? state.item : null,
        loading: {...state.loading, item: true},
        error: {...state.error, item: false}
      }
    case REQUEST_ARTIST_SUCCESS:
      return {
        ...state,
        item: action.result,
        loading: {...state.loading, item: false}
      }
    case REQUEST_ARTIST_ERROR:
      return {
        ...state,
        loading: {...state.loading, item: false},
        error: {...state.error, item: true}
      }

    default:
      return state
  }
}
