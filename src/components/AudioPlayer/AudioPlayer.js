import React, {Component, PropTypes} from 'react'
import ReactDOM from 'react-dom'

export default class AudioPlayer extends Component {
  componentDidMount () {
    this.node = ReactDOM.findDOMNode(this.refs.audio)
    let node = this.node

    node.addEventListener('progress', this.handleProgress.bind(this))
    node.addEventListener('timeupdate', this.handleTimeUpdate.bind(this))
    node.addEventListener('ended', this.handleMediaEnd.bind(this))
  }

  componentDidUpdate (prevProps) {
    if (prevProps.source !== this.props.source) {
      this.updateSource()
    }

    if (prevProps.playing !== this.props.playing) {
      this.updatePlaying()
    }

    if (prevProps.defaultTime !== this.props.defaultTime) {
      this.updateCurrentTime()
    }
  }

  componentWillUnmount () {
    let node = this.node

    node.removeEventListener('progress', this.handleProgress.bind(this))
    node.removeEventListener('timeupdate', this.handleTimeUpdate.bind(this))
    node.removeEventListener('ended', this.handleMediaEnd.bind(this))
  }

  render () {
    return (
      <audio preload='none' ref='audio'>
        <source src={this.props.source} type='audio/mpeg' />
      </audio>
    )
  }

  handleTimeUpdate () {
    let node = this.node
    const {currentTime, duration} = node

    this.props.onTimeUpdate({currentTime, duration})
  }

  handleMediaEnd () {
    this.node.currentTime = 0
    this.props.onEnd()
  }

  handleProgress () {
    let node = this.node
    const {duration, buffered} = node

    this.props.onBuffer({duration, buffered})
  }

  updateCurrentTime () {
    let node = this.node
    if (node.readyState) {
      node.currentTime = this.props.defaultTime
    }
  }

  updatePlaying () {
    let node = this.node
    const {playing} = this.props

    if (playing) {
      node.play()
    } else {
      node.pause()
    }
  }

  updateSource () {
    let node = this.node
    const {playing} = this.props

    node.pause()
    this.props.onTimeUpdate({
      currentTime: 0,
      duration: node.duration
    })

    node.load()
    if (playing) {
      node.play()
    }
  }
}

AudioPlayer.propTypes = {
  source: PropTypes.string,
  playing: PropTypes.bool.isRequired,
  defaultTime: PropTypes.number,
  onBuffer: PropTypes.func.isRequired,
  onTimeUpdate: PropTypes.func.isRequired,
  onEnd: PropTypes.func.isRequired
}
