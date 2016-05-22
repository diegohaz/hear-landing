import React, {PropTypes} from 'react'
import className from 'classnames'
import styles from './SongItem.scss'

import closeIcon from './close.svg'

import SongImage from '../SongImage'
import SongPlayPause from '../SongPlayPause'

const SongItem = ({
  ...props,
  song,
  selected = false,
  playing = false,
  onToggle,
  onDeselect
}) => {
  onToggle = onToggle ? onToggle.bind(null, song) : null
  onDeselect = onDeselect ? onDeselect.bind(null, song) : null

  return (
    <div className={className(styles.item, {
      [styles.playing]: playing,
      [styles.selected]: selected
    })}>
      <button className={styles.cover} onClick={onToggle}>
        <SongImage
          images={song.images}
          size='small'
          alt={song.title + ' album cover'} />
        <div className={styles.control}>
          <SongPlayPause {...props} />
        </div>
      </button>
      <div className={styles.meta}>
        <div className={styles.title}>{song.title}</div>
        <div className={styles.artist}>{song.artist.name || song.artist}</div>
      </div>
      {selected && <input type='image' src={closeIcon} title='Deselect' onClick={onDeselect} />}
    </div>
  )
}

SongItem.propTypes = {
  song: PropTypes.object.isRequired,
  selected: PropTypes.bool,
  playing: PropTypes.bool,
  onToggle: PropTypes.func,
  onDeselect: PropTypes.func
}

export default SongItem
