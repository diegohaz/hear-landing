import React, {PropTypes} from 'react'
import className from 'classnames'
import styles from './BroadcastItem.scss'

import SongPlayPause from '../SongPlayPause'
import SongImage from '../SongImage'

const renderDistance = (distance) => (
  <div className={styles.distance}>
    {distance > 1000 ? (distance/1000).toFixed(2) + 'km' : distance.toFixed(2) + 'm'}
  </div>
)

const renderTooltip = ({users, place}) => {
  const manyUsersHave = users.length > 1 ? `${users.length} users have` : '1 user has'
  const nearPlace = place ? ` near ${place.name}` : ''
  return  <div className={styles.tooltip}>{`${manyUsersHave} heard this${nearPlace}`}</div>
}

const BroadcastItem = ({
  ...props,
  broadcast,
  broadcast: {song},
  playing = false,
  loading = false,
  currentTime = 0,
  duration = 0,
  buffered = 0,
  onToggle
}) => {
  onToggle = onToggle ? onToggle.bind(null, song) : null

  return (
    <div className={styles.item}>
      {renderDistance(broadcast.distance)}
      {renderTooltip(broadcast)}
      <button className={className(styles.button, {
        [styles.playing]: playing,
        [styles.loading]: loading
      })} onClick={onToggle}>
        <div className={styles.cover}>
          <SongImage
            images={song.images}
            alt={song.title + ' album cover'} />
          <div className={styles.control}>
            <SongPlayPause {...props} />
          </div>
        </div>
        <div className={styles.meta}>
          <div className={styles.title}>{song.title}</div>
          <div className={styles.artist}>{song.artist.name || song.artist}</div>
        </div>
      </button>
    </div>
  )
}

BroadcastItem.propTypes = {
  broadcast: PropTypes.object.isRequired,
  loading: PropTypes.bool,
  playing: PropTypes.bool,
  buffered: PropTypes.number,
  currentTime: PropTypes.number,
  duration: PropTypes.number,
  onToggle: PropTypes.func
}

export default BroadcastItem
