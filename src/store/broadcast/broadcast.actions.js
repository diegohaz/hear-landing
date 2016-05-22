import {arrayOf, normalize} from 'normalizr'
import snakeCase from 'lodash/snakeCase'
import mapKeys from 'lodash/mapKeys'
import maxBy from 'lodash/maxBy'
import broadcast from './broadcast.schema'
import {deselectSong} from '../song/song.actions'
import {getMe} from '../user/user.actions'

export const REQUEST_BROADCASTS = 'REQUEST_BROADCASTS'
export const REQUEST_BROADCASTS_SUCCESS = 'REQUEST_BROADCASTS_SUCCESS'
export const REQUEST_BROADCASTS_ERROR = 'REQUEST_BROADCASTS_ERROR'
export const CREATE_BROADCAST = 'CREATE_BROADCAST'
export const CREATE_BROADCAST_SUCCESS = 'CREATE_BROADCAST_SUCCESS'
export const CREATE_BROADCAST_ERROR = 'CREATE_BROADCAST_ERROR'
export const REQUEST_BROADCAST = 'REQUEST_BROADCAST'
export const REQUEST_BROADCAST_SUCCESS = 'REQUEST_BROADCAST_SUCCESS'
export const REQUEST_BROADCAST_ERROR = 'REQUEST_BROADCAST_ERROR'
export const REMOVE_BROADCAST = 'REMOVE_BROADCAST'
export const REMOVE_BROADCAST_SUCCESS = 'REMOVE_BROADCAST_SUCCESS'
export const REMOVE_BROADCAST_ERROR = 'REMOVE_BROADCAST_ERROR'

export function getBroadcasts ({
  ...params,
  q,
  latitude,
  longitude,
  exclude,
  service,
  minDistance,
  song,
  user,
  artists,
  tags,
  page,
  limit,
  sort
} = {}, append = page > 1) {
  return (dispatch, getState, {api}) => {
    params = mapKeys(params, (value, key) => snakeCase(key))
    dispatch({type: REQUEST_BROADCASTS, params})

    return api.get('/broadcasts', {params}).then((res) => {
      const {result, entities} = normalize(res.data, arrayOf(broadcast))
      dispatch({type: REQUEST_BROADCASTS_SUCCESS, result, append, entities})
      return res.data
    }).catch((error) => {
      dispatch({type: REQUEST_BROADCASTS_ERROR, error})
      throw error
    })
  }
}

export function getNearBroadcasts (params = {}, append = params.minDistance) {
  return (dispatch, getState) => {
    const {geolocation} = getState()
    if (!geolocation || !geolocation.coords) {
      throw new Error('There is no geolocation.coords state')
    }

    return dispatch(getBroadcasts({...geolocation.coords, ...params}, append))
  }
}

export function getNextNearBroadcasts (params = {}) {
  return (dispatch, getState) => {
    const {broadcast, entities} = getState()

    if (!broadcast || !broadcast.items) {
      throw new Error('There is no broadcast.items state')
    }

    if (!entities || !entities.broadcasts) {
      throw new Error('There is no entities.broadcasts state')
    }

    const broadcasts = broadcast.items.map((id) => entities.broadcasts[id])
    const {distance} = maxBy(broadcasts, 'distance')
    const exclude = broadcast.items

    params.minDistance = distance
    params.exclude = params.exclude ? [...params.exclude, ...exclude] : exclude

    return dispatch(getNearBroadcasts(params))
  }
}

export function getMyBroadcasts (params = {}) {
  return (dispatch, getState) => {
    const {user} = getState()

    if (!user || !user.me) {
      throw new Error('There is no user.me state')
    }

    return dispatch(getBroadcasts({...params, user: user.me}))
  }
}

export function getBroadcast (id) {
  return (dispatch, getState, {api}) => {
    const {entities} = getState()
    if (entities && entities.broadcasts && entities.broadcasts[id]) {
      dispatch({
        type: REQUEST_BROADCAST_SUCCESS,
        result: id,
        cached: true
      })
    } else {
      dispatch({type: REQUEST_BROADCAST, id})
    }

    return api.get(`/broadcasts/${id}`).then((res) => {
      const {result, entities} = normalize(res.data, broadcast)
      dispatch({type: REQUEST_BROADCAST_SUCCESS, result, entities})
      return res.data
    }).catch((error) => {
      dispatch({type: REQUEST_BROADCAST_ERROR, error})
      throw error
    })
  }
}

export function createBroadcast ({song, latitude, longitude} = {}) {
  return (dispatch, getState, {api}) => {
    let location = {latitude, longitude}
    const {...state, geolocation, entities} = getState()

    if (!entities || !entities.songs) {
      throw new Error('There is no entities.songs in state')
    }

    if (!song) {
      if (!state.song || !state.song.selected) {
        throw new Error('There is no song.selected in state')
      }
      song = entities.songs[state.song.selected]
    } else if (song instanceof Object === false) {
      song = entities.songs[song]
    }

    if (typeof latitude === 'undefined' && geolocation && geolocation.coords) {
      location = {latitude: geolocation.coords.latitude, longitude: geolocation.coords.longitude}
    }

    dispatch(deselectSong(song))
    dispatch({type: CREATE_BROADCAST})

    return api.post('/broadcasts', {...song, ...location}).then((res) => {
      const {result, entities} = normalize(res.data, broadcast)
      dispatch({
        type: CREATE_BROADCAST_SUCCESS,
        result: result,
        entities
      })
      return res.data
    }).catch((error) => {
      dispatch({type: CREATE_BROADCAST_ERROR, error})
      throw error
    })
  }
}

export function removeBroadcast (id) {
  return (dispatch, getState, {api}) => {
    dispatch({type: REMOVE_BROADCAST, id})

    return api.remove(`/broadcasts/${id}`).then((res) => {
      dispatch({type: REMOVE_BROADCAST_SUCCESS, id})
      if (res.status === 200) {
        dispatch(getMe())
      }
      return res.data
    }).catch((error) => {
      dispatch({type: REMOVE_BROADCAST_ERROR, error, id})
      throw error
    })
  }
}
