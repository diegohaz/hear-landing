import {arrayOf, normalize} from 'normalizr'
import {playSong, stopSong} from '../player/player.actions'
import song from './song.schema'

export const REQUEST_SONGS = 'REQUEST_SONGS'
export const REQUEST_SONGS_SUCCESS = 'REQUEST_SONGS_SUCCESS'
export const REQUEST_SONGS_ERROR = 'REQUEST_SONGS_ERROR'
export const SELECT_SONG = 'SELECT_SONG'
export const DESELECT_SONG = 'DESELECT_SONG'

export function getSongs ({...params, q, tags, service, page, limit, sort} = {}, append = page > 1) {
  return (dispatch, getState, {api}) => {
    dispatch({type: REQUEST_SONGS, params})

    return api.get('/songs', {params}).then((res) => {
      const {result, entities} = normalize(res.data, arrayOf(song))
      dispatch({type: REQUEST_SONGS_SUCCESS, result, append, entities})
      return res.data
    }).catch((error) => {
      dispatch({type: REQUEST_SONGS_ERROR, error})
      throw error
    })
  }
}

export function searchSongs ({...params, q, service, page, limit, sort} = {}, append = page > 1) {
  return (dispatch, getState, {api}) => {
    dispatch({type: REQUEST_SONGS, params})

    return api.get('/songs/search', {params}).then((res) => {
      const {result, entities} = normalize(res.data, arrayOf(song))
      dispatch({type: REQUEST_SONGS_SUCCESS, result, append, entities})
      return res.data
    }).catch((error) => {
      dispatch({type: REQUEST_SONGS_ERROR, error})
      throw error
    })
  }
}

export function selectSong (song) {
  return (dispatch) => {
    dispatch(playSong(song))
    dispatch({
      type: SELECT_SONG,
      song: song ? song.serviceId || song : undefined
    })
  }
}

export function deselectSong () {
  return (dispatch, getState) => {
    const {selected} = getState().song
    dispatch(stopSong(selected))
    dispatch({type: DESELECT_SONG})
  }
}
