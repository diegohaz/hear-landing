import {arrayOf, normalize} from 'normalizr'
import tag from './tag.schema'

export const REQUEST_TAGS = 'REQUEST_TAGS'
export const REQUEST_TAGS_SUCCESS = 'REQUEST_TAGS_SUCCESS'
export const REQUEST_TAGS_ERROR = 'REQUEST_TAGS_ERROR'
export const SELECT_ALL_TAGS = 'SELECT_ALL_TAGS'
export const SELECT_TAG = 'SELECT_TAG'
export const DESELECT_TAG = 'DESELECT_TAG'

export function getTags ({...params, q, page, limit, sort} = {}, append = page > 1) {
  return (dispatch, getState, {api}) => {
    dispatch({type: REQUEST_TAGS, params})

    return api.get('/tags', {params}).then((res) => {
      const {result, entities} = normalize(res.data, arrayOf(tag))
      dispatch({type: REQUEST_TAGS_SUCCESS, result, append, entities})
      return res.data
    }).catch((error) => {
      dispatch({type: REQUEST_TAGS_ERROR, error})
      throw error
    })
  }
}

export function selectAllTags () {
  return {type: SELECT_ALL_TAGS}
}

export function selectTag (tag) {
  return {
    type: SELECT_TAG,
    tag: tag ? tag.id || tag : undefined
  }
}

export function deselectTag (tag) {
  return {
    type: DESELECT_TAG,
    tag: tag ? tag.id || tag : undefined
  }
}

