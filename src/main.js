// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import axios from './plugins/axios' // 放router前面是为了后面可以直接从window.axios拿到
import router from './router'
import store from './store'
import './assets/fonts/iconfont.js'
// import AppConfig from './AppConfig'
// 引入组件，不然用不了， 不全部引入是因为体积会变大，需要什么在引
import {
    Button,
    Col,
    Collapse,
    CollapseItem,
    Checkbox,
    CheckboxGroup,
    Dialog,
    Option,
    OptionGroup,
    Row,
    Radio,
    RadioGroup,
    Select,
    Tabs,
    TabPane,
    Input,
    Tree
} from 'element-ui'

Vue.use(Button)
Vue.use(Col)
Vue.use(Collapse)
Vue.use(CollapseItem)
Vue.use(Checkbox)
Vue.use(CheckboxGroup)
Vue.use(Dialog)
Vue.use(Option)
Vue.use(OptionGroup)
Vue.use(Row)
Vue.use(Radio)
Vue.use(RadioGroup)
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