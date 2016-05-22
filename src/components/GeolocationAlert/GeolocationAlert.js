import React, {PropTypes} from 'react'
import styles from './GeolocationAlert.scss'

const GeolocationAlert = ({geolocation, onGeolocationRequest}) => (
  <div className={styles.box}>
    {!geolocation.error && <p>Enable geolocation access to see music around</p>}
    {geolocation.loading || geolocation.error || <button onClick={onGeolocationRequest}>Enable</button>}
    {geolocation.loading && <div className={styles.loader}></div>}
  </div>
)

GeolocationAlert.propTypes = {
  geolocation: PropTypes.object.isRequired,
  onGeolocationRequest: PropTypes.func.isRequired
}

export default GeolocationAlert
