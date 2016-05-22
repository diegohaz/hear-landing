import React, {Component, PropTypes} from 'react'
import debounce from 'lodash/debounce'
import Autosuggest from 'react-autosuggest'
import styles from './SongSearch.scss'

import SongItem from '../SongItem'

export default class SongSearch extends Component {
  constructor (props) {
    super(props)
    this.selectSuggestion = this.selectSuggestion.bind(this)
    this.updateSuggestions = debounce(this.updateSuggestions.bind(this), 500)
    this.changeInputValue = this.changeInputValue.bind(this)
    this.renderSuggestion = this.renderSuggestion.bind(this)
    this.getSuggestionValue = this.getSuggestionValue.bind(this)
    this.state = {
      value: ''
    }
  }

  selectSuggestion (event, {suggestion}) {
    this.props.onSelect(suggestion)
  }

  updateSuggestions ({reason, value}) {
    const {onSearch} = this.props
    switch (reason) {
      case 'type':
        return onSearch(value)
    }
  }

  changeInputValue (event, {newValue}) {
    this.setState({value: newValue})
  }

  getSuggestionValue (suggestion) {
    return this.state.value
  }

  renderSuggestion (suggestion) {
    return (
      <SongItem song={suggestion} />
    )
  }

  render () {
    const {songs, player, loading, selected, onDeselect, onToggle} = this.props

    if (selected) {
      const isCurrentSong = player.song === selected.serviceId
      return (
        <SongItem
          selected
          playing={isCurrentSong ? player.playing : false}
          currentTime={isCurrentSong ? player.currentTime : 0}
          duration={isCurrentSong ? player.duration : 0}
          buffered={isCurrentSong ? player.buffered : 0}
          loading={isCurrentSong ? player.loading : false}
          onToggle={onToggle}
          onDeselect={onDeselect}
          song={selected} />
      )
    } else {
      return (
        <div className={styles.container}>
          <Autosuggest
            theme={styles}
            suggestions={songs}
            onSuggestionsUpdateRequested={this.updateSuggestions}
            onSuggestionSelected={this.selectSuggestion}
            getSuggestionValue={this.getSuggestionValue}
            renderSuggestion={this.renderSuggestion}
            inputProps={{
              value: this.state.value,
              placeholder: 'Search for a song to place here',
              onChange: this.changeInputValue
            }} />
          {loading && <div className={styles.loader}></div>}
        </div>
      )
    }
  }
}

SongSearch.propTypes = {
  songs: PropTypes.array.isRequired,
  player: PropTypes.object.isRequired,
  selected: PropTypes.object,
  loading: PropTypes.bool,
  onSearch: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  onDeselect: PropTypes.func.isRequired,
  onToggle: PropTypes.func
}
