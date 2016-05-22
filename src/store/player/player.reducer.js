import {
  TOGGLE_SONG,
  PLAY_SONG,
  PAUSE_SONG,
  STOP_SONG,
  UPDATE_SONG_TIME,
  UPDATE_SONG_BUFFER
} from './player.actions'

const initialState = {
  song: null,
  buffered: 0,
  currentTime: 0,
  duration: 0,
  playing: false,
  loading: false
}

export default function playerReducer (state = initialState, action) {
  switch (action.type) {
    case TOGGLE_SONG:
      if (action.song === state.song) {
        return {
          ...state,
          playing: !state.playing
        }
      } else {
        return loadAndPlay(state, action)
      }

    case STOP_SONG:
      if (!action.song || action.song === state.song) {
        return {...initialState}
      } else {
        return state
      }

    case PLAY_SONG:
      if (!action.song || action.song === state.song) {
        return {...state, playing: true}
      } else if (action.song) {
        return loadAndPlay(state, action)
      } else {
        return state
      }

    case PAUSE_SONG:
      if (!action.song || action.song === state.song) {
        return {...state, playing: false}
      } else {
        return state
      }

    case UPDATE_SONG_BUFFER:
      return {
        ...state,
        duration: action.duration,
        buffered: action.buffered.length ? action.buffered.end(0) / action.duration : 0
      }

    case UPDATE_SONG_TIME:
      return {
        ...state,
        duration: action.duration,
        currentTime: action.currentTime,
        loading: !action.currentTime
      }

    default:
      return state
  }
}

function loadAndPlay (state = initialState, action) {
  return {
    ...state,
    song: action.song,
    playing: true,
    loading: true
  }
}
