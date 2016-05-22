import {connect} from 'react-redux'

import {stopSong, updateSongTime, updateSongBuffer} from '../store/player/player.actions'
import AudioPlayer from '../components/AudioPlayer'

const mapStateToProps = (state) => {
  const {player: {playing, song}, entities} = state
  return {
    playing,
    source: song ? entities.songs[song].previewUrl : undefined
  }
}

const mapDispatchToProps = {
  onTimeUpdate: updateSongTime,
  onBuffer: updateSongBuffer,
  onEnd: stopSong
}

export default connect(mapStateToProps, mapDispatchToProps)(AudioPlayer)
