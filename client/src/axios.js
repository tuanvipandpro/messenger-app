import axios from "axios"
import { ENDPOINT } from "./constants"

axios.defaults.baseURL = `${ENDPOINT}`

export default axios