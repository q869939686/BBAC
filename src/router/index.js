import Vue from 'vue'
import Router from 'vue-router'
// 用 views目录引过来
import QView from '@/views/Q-View/'
Vue.use(Router)

export default new Router({
    mode: 'history',
    beforeRouteEnter (to, from, next) {
        // 在渲染该组件的对应路由被 confirm 前调用
        // 不！能！获取组件实例 `this`
        // 因为当钩子执行前，组件实例还没被创建
        next();
    },
    routes: [
        {
            path: '/',
            name: 'home',
            component: QView
        },
        {
            path: '/Q-View',
            name: 'QView',
            component: QView
        },
        {
            path: '/xxx',
            name: 'xxx',
            component: { // 其中一种写法
                template: '<div>2222</div>'
            }
        }
    ]
})