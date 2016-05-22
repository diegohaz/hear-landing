import axios from 'axios'

const env = process.env.NODE_ENV
console.log(env)

axios.defaults.baseURL = env === 'production' ? 'http://api.hear.ws' : 'http://localhost:9000'

export default axios
