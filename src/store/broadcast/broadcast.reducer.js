import {
  REQUEST_BROADCASTS,
  REQUEST_BROADCASTS_SUCCESS,
  REQUEST_BROADCASTS_ERROR,
  CREATE_BROADCAST,
  CREATE_BROADCAST_SUCCESS,
  CREATE_BROADCAST_ERROR,
  REQUEST_BROADCAST,
  REQUEST_BROADCAST_SUCCESS,
  REQUEST_BROADCAST_ERROR,
  REMOVE_BROADCAST,
  REMOVE_BROADCAST_SUCCESS,
  REMOVE_BROADCAST_ERROR
} from './broadcast.actions'

const initialState = {
  items: [],
  item: null,
  loading: {
    items: false,
    item: false,
    create: false,
    remove: false
  },
  error: {
    items: false,
    item: false,
    create: false,
    remove: false
  }
}

export default function broadcastReducer (state = initialState, action) {
  switch (action.type) {
    case REQUEST_BROADCASTS:
      return {
        ...state,
        loading: {...state.loading, items: true},
        error: {...state.error, items: false}
      }
    case REQUEST_BROADCASTS_SUCCESS:
      return {
        ...state,
        items: action.append ? [...state.items, ...action.result] : action.result,
        loading: {...state.loading, items: false}
      }
    case REQUEST_BROADCASTS_ERROR:
      return {
        ...state,
        loading: {...state.loading, items: false},
        erorrs: {items: true}
      }

    case CREATE_BROADCAST:
      return {
        ...state,
        loading: {...state.loading, create: true},
        error: {...state.error, create: false}
      }
    case CREATE_BROADCAST_SUCCESS:
      return {
        ...state,
        loading: {...state.loading, create: false}
      }
    case CREATE_BROADCAST_ERROR:
      return {
        ...state,
        loading: {...state.loading, create: false},
        erorrs: {create: true}
      }

    case REQUEST_BROADCAST:
      return {
        ...state,
        item: state.item && state.item === action.id ? state.item : null,
        loading: {...state.loading, item: true},
        erors: {item: false}
      }
    case REQUEST_BROADCAST_SUCCESS:
      return {
        ...state,
        item: action.result,
        loading: {...state.loading, item: action.cached}
      }
    case REQUEST_BROADCAST_ERROR:
      return {
        ...state,
        loading: {...state.loading, item: false},
        error: {...state.error, item: true}
      }

    case REMOVE_BROADCAST:
    case REMOVE_BROADCAST_SUCCESS:
    case REMOVE_BROADCAST_ERROR:
      return removeBroadcastReducer(state, action)

    default:
      return state
  }
}

function removeBroadcastReducer (state = initialState, action) {
  const idx = state.items.indexOf(action.id)

  switch (action.type) {
    case REMOVE_BROADCAST:
      return {
        ...state,
        items: [...state.items.slice(0, idx), ...state.items.slice(idx + 1)],
        loading: {...state.loading, remove: true},
        error: {...state.error, remove: false}
      }

    case REMOVE_BROADCAST_SUCCESS:
      return {
        ...state,
        loading: {...state.loading, remove: false}
      }

    case REMOVE_BROADCAST_ERROR:
      return {
        ...state,
        items: [...state.items.slice(0, idx), action.id, ...state.items.slice(idx + 1)],
        loading: {...state.loading, remove: false},
        error: {...state.error, remove: true}
      }

    default:
      return state
  }
}
