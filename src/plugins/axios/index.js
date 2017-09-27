import Axios from 'axios'
import AppConfig from '@/AppConfig'

var axios = Axios.create({
    baseURL: AppConfig.API,
    timeout: 320000,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
})
window.axios = axios
export {
    axios
}
export default {
    install (Vue) {
        Vue.prototype.$http = axios
    }
}
