import axios from 'axios'

const env = process.env.NODE_ENV

axios.defaults.baseURL = env === 'production' ? 'https://api.hear.ws' : 'http://localhost:9000'

export default axios
