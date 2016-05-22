import {
  REQUEST_SONGS,
  REQUEST_SONGS_SUCCESS,
  REQUEST_SONGS_ERROR,
  SELECT_SONG,
  DESELECT_SONG
} from './song.actions'

const initialState = {
  items: [],
  selected: null,
  loading: false,
  error: false
}

export default function songReducer (state = initialState, action) {
  switch (action.type) {
    case REQUEST_SONGS:
      return {
        ...state,
        loading: true,
        error: false
      }
    case REQUEST_SONGS_SUCCESS:
      return {
        ...state,
        items: action.append ? [...state.items, ...action.result] : action.result,
        loading: false
      }
    case REQUEST_SONGS_ERROR:
      return {
        ...state,
        loading: false,
        error: true
      }
    case SELECT_SONG:
      return {
        ...state,
        selected: action.song
      }
    case DESELECT_SONG:
      return {
        ...state,
        selected: null
      }
    default:
      return state
  }
}
