import React, {Component, PropTypes} from 'react'
import styles from './BroadcastSection.scss'

import BroadcastForm from '../BroadcastForm'
import BroadcastList from '../BroadcastList'
import GeolocationAlert from '../GeolocationAlert'

export default class BroadcastSection extends Component {
  componentDidUpdate (prevProps) {
    const {coords: prevCoords} = prevProps.geolocation
    const {coords: newCoords} = this.props.geolocation

    if (newCoords.latitude && newCoords.longitude && newCoords !== prevCoords) {
      this.props.refreshBroadcasts && this.props.refreshBroadcasts(newCoords)
      this.props.refreshPlace && this.props.refreshPlace(newCoords)
    }
  }

  render () {
    const {...props, geolocation} = this.props
    return (
      <div className={styles.section}>
          {geolocation.coords.latitude && <BroadcastForm {...props} />}
          {geolocation.coords.latitude && <BroadcastList {...props} />}
          {!geolocation.coords.latitude && <GeolocationAlert {...props} />}
        </div>
    )
  }
}

BroadcastSection.propTypes = {
  geolocation: PropTypes.object.isRequired,
  refreshBroadcasts: PropTypes.func,
  refreshPlace: PropTypes.func
}
