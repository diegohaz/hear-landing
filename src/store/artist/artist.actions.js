import {arrayOf, normalize} from 'normalizr'
import artist from './artist.schema'

export const REQUEST_ARTISTS = 'REQUEST_ARTISTS'
export const REQUEST_ARTISTS_SUCCESS = 'REQUEST_ARTISTS_SUCCESS'
export const REQUEST_ARTISTS_ERROR = 'REQUEST_ARTISTS_ERROR'
export const REQUEST_ARTIST = 'REQUEST_ARTIST'
export const REQUEST_ARTIST_SUCCESS = 'REQUEST_ARTIST_SUCCESS'
export const REQUEST_ARTIST_ERROR = 'REQUEST_ARTIST_ERROR'

export function getArtists ({...params, q, page, limit, sort} = {}, append = page > 1) {
  return (dispatch, getState, {api}) => {
    dispatch({type: REQUEST_ARTISTS, params})

    return api.get('/artists', {params}).then((res) => {
      const {result, entities} = normalize(res.data, arrayOf(artist))
      dispatch({type: REQUEST_ARTISTS_SUCCESS, result, append, entities})
      return res.data
    }).catch((error) => {
      dispatch({type: REQUEST_ARTISTS_ERROR, error})
      throw error
    })
  }
}

export function getArtist (id) {
  return (dispatch, getState, {api}) => {
    const {entities} = getState()
    if (entities && entities.artists && entities.artists[id]) {
      dispatch({
        type: REQUEST_ARTIST_SUCCESS,
        result: id,
        cached: true
      })
    } else {
      dispatch({type: REQUEST_ARTIST, id})
    }

    return api.get(`/artists/${id}`).then((res) => {
      const {result, entities} = normalize(res.data, artist)
      dispatch({type: REQUEST_ARTIST_SUCCESS, result, entities})
      return res.data
    }).catch((error) => {
      dispatch({type: REQUEST_ARTIST_ERROR, error})
      throw error
    })
  }
}
