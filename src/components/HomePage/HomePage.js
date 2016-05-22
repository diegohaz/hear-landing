import React, {Component, PropTypes} from 'react'
import styles from './HomePage.scss'

import AudioPlayer from '../../containers/AudioPlayer'
import BroadcastSection from '../../containers/BroadcastSection'
import Header from '../Header'
import Banner from '../Banner'

export default class HomePage extends Component {
  componentDidMount () {
    const {signUpAnonymously} = this.props
    signUpAnonymously()
  }

  componentDidUpdate (prevProps) {
    const {session, user, getMe} = this.props

    if (session.accessToken && !user.me && !user.loading && !user.error) {
      getMe()
    }
  }

  render () {
    return (
      <div className={styles.page}>
        <AudioPlayer />
        <Header />
        <Banner />
        <BroadcastSection />
        <div className={styles.attribution}>
          Photo by <a href='https://flic.kr/p/6AwXUh' target='_blank' rel='noreferrer noopener'>Roger Schultz</a>
        </div>
      </div>
    )
  }
}

HomePage.propTypes = {
  user: PropTypes.object,
  session: PropTypes.object.isRequired,
  signUpAnonymously: PropTypes.func.isRequired,
  getMe: PropTypes.func.isRequired
}
