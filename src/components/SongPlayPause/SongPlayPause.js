import React, {PropTypes} from 'react'
import className from 'classnames'
import {Circle} from 'rc-progress'
import styles from './SongPlayPause.scss'

const SongPlayPause = ({
  playing = false,
  loading = false,
  duration = 0,
  currentTime = 0,
  buffered = 0
}) => (
  <div className={className(styles.control, {
    [styles.playing]: playing,
    [styles.loading]: loading
  })}>
    <div className={styles.playPause}></div>
    <div className={styles.loader}></div>
    <div className={styles.progress}>
      <Circle
        percent={buffered * 100}
        strokeWidth={buffered ? '4' : '0'}
        strokeColor={styles.bufferColor}
        trailWidth='0' />
    </div>
    <div className={styles.progress}>
      <Circle
        percent={duration ? currentTime / duration * 100 : 0}
        strokeWidth={duration ? '4' : '0'}
        strokeColor={styles.timeColor}
        trailWidth='0' />
    </div>
  </div>
)

SongPlayPause.propTypes = {
  playing: PropTypes.bool,
  loading: PropTypes.bool,
  duration: PropTypes.number,
  currentTime: PropTypes.number,
  buffered: PropTypes.number
}

export default SongPlayPause
