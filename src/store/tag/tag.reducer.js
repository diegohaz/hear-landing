import {
  REQUEST_TAGS,
  REQUEST_TAGS_SUCCESS,
  REQUEST_TAGS_ERROR,
  SELECT_ALL_TAGS,
  SELECT_TAG,
  DESELECT_TAG
} from './tag.actions'

const initialState = {
  items: [],
  selected: [],
  loading: false,
  error: false
}

export default function tagReducer (state = initialState, action) {
  switch (action.type) {
    case REQUEST_TAGS:
      return {
        ...state,
        loading: true,
        error: false
      }
    case REQUEST_TAGS_SUCCESS:
      return {
        ...state,
        items: action.append ? [...state.items, ...action.result] : action.result,
        loading: false
      }
    case REQUEST_TAGS_ERROR:
      return {
        ...state,
        loading: false,
        error: true
      }
    case SELECT_ALL_TAGS:
      return {
        ...state,
        selected: []
      }
    case SELECT_TAG:
      return {
        ...state,
        selected: [...state.selected, action.tag]
      }
    case DESELECT_TAG:
      const idx = state.selected.indexOf(action.tag)
      return {
        ...state,
        selected: [...state.selected.slice(0, idx), ...state.selected.slice(idx + 1)]
      }
    default:
      return state
  }
}
