// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import axios from './plugins/axios' // 放router前面是为了后面可以直接从window.axios拿到
import router from './router'
import store from './store'

// import AppConfig from './AppConfig'
import {
    Button,
    Select,
    Tabs,
    TabPane,
    Input,
    Tree
} from 'element-ui'

Vue.use(Button)
Vue.use(Select)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Input)
Vue.use(Tree)

Vue.use(axios)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
})