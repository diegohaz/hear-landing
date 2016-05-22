import {connect} from 'react-redux'
import {denormalize} from 'denormalizr'

import songSchema from '../store/song/song.schema'
import broadcastSchema from '../store/broadcast/broadcast.schema'
import placeSchema from '../store/place/place.schema'
import userSchema from '../store/user/user.schema'
import {searchSongs, selectSong, deselectSong} from '../store/song/song.actions'
import {toggleSong} from '../store/player/player.actions'
import {getBroadcasts, getNearBroadcasts, createBroadcast} from '../store/broadcast/broadcast.actions'
import {getGeolocation} from '../store/geolocation/geolocation.actions'
import {updateMe} from '../store/user/user.actions'
import {lookupPlace} from '../store/place/place.actions'

import BroadcastSection from '../components/BroadcastSection'

const mapStateToProps = ({entities, user, song, place, player, broadcast, geolocation}) => ({
  songs: song.items.map((id) => denormalize(entities.songs[id], entities, songSchema)),
  broadcasts: broadcast.items.map((id) => denormalize(entities.broadcasts[id], entities, broadcastSchema)),
  loading: song.loading,
  place: denormalize(entities.places[place.current], entities, placeSchema),
  selected: denormalize(entities.songs[song.selected], entities, songSchema),
  user: denormalize(entities.users[user.me], entities, userSchema),
  player,
  geolocation
})

const mapDispatchToProps = (dispatch) => ({
  refreshBroadcasts: (coords) => dispatch(getBroadcasts({...coords, limit: 10})),
  refreshPlace: (coords) => dispatch(lookupPlace({...coords})),
  onSearch: (value) => dispatch(searchSongs({q: value})),
  onSelect: (song) => dispatch(selectSong(song)),
  onDeselect: (song) => dispatch(deselectSong(song)),
  onToggle: (song) => dispatch(toggleSong(song)),
  onGeolocationRequest: () => dispatch(getGeolocation()),
  onSubmit: (song, email) => {
    dispatch(createBroadcast(song)).then(() => dispatch(getNearBroadcasts({limit: 10})))
    email && dispatch(updateMe({email}))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(BroadcastSection)
