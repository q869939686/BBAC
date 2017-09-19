import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/views/home/home.vue'
Vue.use(Router)

export default new Router({
    mode: 'history',
    beforeRouteEnter (to, from, next) {
        // 在渲染该组件的对应路由被 confirm 前调用
        // 不！能！获取组件实例 `this`
        // 因为当钩子执行前，组件实例还没被创建
        next();
    },
    routes: [{
        path: '/',
        name: 'Home',
        component: Home
    }]
})