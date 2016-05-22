import {Schema, arrayOf} from 'normalizr'
import song from '../song/song.schema'
import place from '../place/place.schema'
import user from '../user/user.schema'

const broadcast = new Schema('broadcasts')

broadcast.define({
  song,
  place,
  user,
  users: arrayOf(user)
})

export default broadcast
