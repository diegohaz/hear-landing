import React, {Component, PropTypes} from 'react'
import styles from './BroadcastForm.scss'

import SongSearch from '../SongSearch'

export default class BroadcastForm extends Component {
  constructor (props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit () {
    const {selected, onSubmit} = this.props
    const email = this.refs.email.value

    onSubmit && onSubmit(selected, email)
  }

  render () {
    const {...props, selected} = this.props
    return (
      <div className={styles.form}>
        <SongSearch {...props} />
        <div>
          <input type='email' placeholder='Email (optional)' ref='email' />
          <p className={styles.info}>So we can let you know when we release the app</p>
        </div>
        <div>
          <button
            disabled={!selected}
            className={styles.sendButton}
            onClick={this.handleSubmit}>
            Place song
          </button>
        </div>
      </div>
    )
  }
}

BroadcastForm.propTypes = {
  selected: PropTypes.object,
  user: PropTypes.object,
  onSubmit: PropTypes.func
}
