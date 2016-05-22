import React, {PropTypes} from 'react'
import styles from './BroadcastList.scss'

import BroadcastItem from '../BroadcastItem'

const renderBroadcastItem = (broadcast, props) => {
  const {player} = props
  const currentPlayer = player.song === broadcast.song.serviceId ? player : {}
  return <BroadcastItem key={broadcast.id} broadcast={broadcast} {...props} {...currentPlayer} />
}

const BroadcastList = ({...props, place, geolocation, broadcasts, player}) => (
  <div>
    <div className={styles.place}>{place ? place.fullName : 'Fetching place...'}</div>
    <div className={styles.list}>
      {broadcasts.map((broadcast) => renderBroadcastItem(broadcast, props))}
    </div>
  </div>
)

BroadcastList.propTypes = {
  geolocation: PropTypes.object.isRequired,
  broadcasts: PropTypes.array.isRequired,
  player: PropTypes.object.isRequired,
  place: PropTypes.object
}

export default BroadcastList
