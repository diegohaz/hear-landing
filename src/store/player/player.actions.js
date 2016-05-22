export const TOGGLE_SONG = 'TOGGLE_SONG'
export const PLAY_SONG = 'PLAY_SONG'
export const PAUSE_SONG = 'PAUSE_SONG'
export const STOP_SONG = 'STOP_SONG'
export const UPDATE_SONG_TIME = 'UPDATE_SONG_TIME'
export const UPDATE_SONG_BUFFER = 'UPDATE_SONG_BUFFER'

export function toggleSong (song) {
  return {
    type: TOGGLE_SONG,
    song: song ? song.serviceId || song : undefined
  }
}

export function playSong (song) {
  return {
    type: PLAY_SONG,
    song: song ? song.serviceId || song : undefined
  }
}

export function pauseSong (song) {
  return {
    type: PAUSE_SONG,
    song: song ? song.serviceId || song : undefined
  }
}

export function stopSong (song) {
  return {
    type: STOP_SONG,
    song: song ? song.serviceId || song : undefined
  }
}

export function updateSongTime ({duration, currentTime}) {
  return {
    type: UPDATE_SONG_TIME,
    duration,
    currentTime
  }
}

export function updateSongBuffer ({duration, buffered}) {
  return {
    type: UPDATE_SONG_BUFFER,
    duration,
    buffered
  }
}
