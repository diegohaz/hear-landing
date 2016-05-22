import {Schema} from 'normalizr'

const place = new Schema('places')

place.define({
  parent: place
})

export default place
