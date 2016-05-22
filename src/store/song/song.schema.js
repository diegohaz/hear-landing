import {Schema, arrayOf} from 'normalizr'
import tag from '../tag/tag.schema'

const song = new Schema('songs', {
  idAttribute: 'serviceId'
})

song.define({
  tags: arrayOf(tag)
})

export default song
