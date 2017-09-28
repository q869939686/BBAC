import Axios from 'axios'
import AppConfig from '@/AppConfig'
import QueryString from '@/utils/tools/querystring'

var axios = Axios.create({
    baseURL: AppConfig.API,
    timeout: 320000,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    transformRequest: [function (data) {
        return QueryString.stringify(data);
    }]
})
/*
use
    this.$http.post('/a', {a: 1}).then(() => {

    })
*/
window.axios = axios
export {
    axios
}
export default {
    install (Vue) {
        Vue.prototype.$http = axios
    }
}
