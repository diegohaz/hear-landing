import {combineReducers} from 'redux'
import merge from 'lodash/merge'
import artist from './artist/artist.reducer'
import broadcast from './broadcast/broadcast.reducer'
import geolocation from './geolocation/geolocation.reducer'
import place from './place/place.reducer'
import player from './player/player.reducer'
import session from './session/session.reducer'
import song from './song/song.reducer'
import tag from './tag/tag.reducer'
import user from './user/user.reducer'

const initialState = {
  artists: {},
  broadcasts: {},
  places: {},
  songs: {},
  tags: {},
  users: {}
}

function entities (state = initialState, action) {
  if (action.entities) {
    return merge({}, state, action.entities)
  }
  return state
}

const reducers = combineReducers({
  entities,
  artist,
  broadcast,
  geolocation,
  place,
  player,
  session,
  song,
  tag,
  user
})

export default reducers
