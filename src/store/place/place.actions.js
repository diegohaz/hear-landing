import {arrayOf, normalize} from 'normalizr'
import place from './place.schema'

export const REQUEST_PLACES = 'REQUEST_PLACES'
export const REQUEST_PLACES_SUCCESS = 'REQUEST_PLACES_SUCCESS'
export const REQUEST_PLACES_ERROR = 'REQUEST_PLACES_ERROR'
export const REQUEST_PLACE = 'REQUEST_PLACE'
export const REQUEST_PLACE_SUCCESS = 'REQUEST_PLACE_SUCCESS'
export const REQUEST_PLACE_ERROR = 'REQUEST_PLACE_ERROR'
export const LOOKUP_PLACE = 'LOOKUP_PLACE'
export const LOOKUP_PLACE_SUCCESS = 'LOOKUP_PLACE_SUCCESS'
export const LOOKUP_PLACE_ERROR = 'LOOKUP_PLACE_ERROR'

export function getPlaces ({q, type, latitude, longitude, page, limit, sort} = {}, append = page > 1) {
  return (dispatch, getState, {api}) => {
    let params = {q, type, page, limit, sort}
    params.near = typeof latitude !== 'undefined' ? [latitude, longitude] : undefined

    dispatch({type: REQUEST_PLACES, params})

    return api.get('/places', {params}).then((res) => {
      const {result, entities} = normalize(res.data, arrayOf(place))
      dispatch({type: REQUEST_PLACES_SUCCESS, result, append, entities})
      return res.data
    }).catch((error) => {
      dispatch({type: REQUEST_PLACES_ERROR, error})
      throw error
    })
  }
}

export function getNearPlaces (params = {}) {
  return (dispatch, getState) => {
    const {geolocation} = getState()
    if (!geolocation || !geolocation.coords) {
      throw new Error('There is no geolocation.coords state')
    }

    return dispatch(getPlaces({...geolocation.coords, ...params}))
  }
}

export function getPlace (id) {
  return (dispatch, getState, {api}) => {
    const {entities} = getState()
    if (entities && entities.places && entities.places[id]) {
      dispatch({
        type: REQUEST_PLACE_SUCCESS,
        result: id,
        cached: true
      })
    } else {
      dispatch({type: REQUEST_PLACE, id})
    }

    return api.get(`/places/${id}`).then((res) => {
      const {result, entities} = normalize(res.data, place)
      dispatch({type: REQUEST_PLACE_SUCCESS, result, entities})
      return res.data
    }).catch((error) => {
      dispatch({type: REQUEST_PLACE_ERROR, error})
      throw error
    })
  }
}

export function lookupPlace ({latitude, longitude} = {}) {
  return (dispatch, getState, {api}) => {
    let params = {latitude, longitude}
    if (typeof latitude === 'undefined') {
      const {geolocation} = getState()
      if (!geolocation || !geolocation.coords) {
        throw new Error('There is no geolocation.coords state')
      }
      params = geolocation.coords
    }
    dispatch({type: LOOKUP_PLACE, params})

    return api.get('/places/lookup', {params}).then((res) => {
      const {result, entities} = normalize(res.data, place)
      dispatch({type: LOOKUP_PLACE_SUCCESS, result, entities})
      return res.data
    }).catch((error) => {
      dispatch({type: LOOKUP_PLACE_ERROR, error})
      throw error
    })
  }
}
