import React, {PropTypes} from 'react'
import styles from './SongImage.scss'

const SongImage = ({
  images,
  alt = 'Cover Image',
  size = 'medium'
}) => (
  <div className={styles.cover}>
    <img src={images[size]} alt={alt} />
  </div>
)

SongImage.propTypes = {
  images: PropTypes.shape({
    small: PropTypes.string,
    medium: PropTypes.string,
    big: PropTypes.string
  }).isRequired,
  alt: PropTypes.string,
  size: PropTypes.string
}

export default SongImage
