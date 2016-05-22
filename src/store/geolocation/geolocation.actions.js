export const REQUEST_GEOLOCATION = 'REQUEST_GEOLOCATION'
export const REQUEST_GEOLOCATION_SUCCESS = 'REQUEST_GEOLOCATION_SUCCESS'
export const REQUEST_GEOLOCATION_ERROR = 'REQUEST_GEOLOCATION_ERROR'

export function getGeolocation () {
  return (dispatch) => {
    dispatch({type: REQUEST_GEOLOCATION})

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const {latitude, longitude} = position.coords
        dispatch({type: REQUEST_GEOLOCATION_SUCCESS, coords: {latitude, longitude}})
      }, (error) => {
        let message
        switch (error.code) {
          case error.PERMISSION_DENIED:
            message = 'Geolocation access denied'
            break
          case error.POSITION_UNAVAILABLE:
            message = 'Location information is unavailable'
            break
          case error.TIMEOUT:
            message = 'Location information request timed out'
            break
          case error.UNKNOWN_ERROR:
            message = 'An unknown error occurred'
            break
        }
        dispatch({
          type: REQUEST_GEOLOCATION_ERROR,
          error: message
        })
      })
    } else {
      dispatch({
        type: REQUEST_GEOLOCATION_ERROR,
        error: 'Geolocation is not supported by this browser'
      })
    }
  }
}
