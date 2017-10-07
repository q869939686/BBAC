<template>
  <div id="app">
    <top/>
    <router-view></router-view>
  </div>
</template>

<script>
import Top from '@/views/top'
require("vue2-scrollbar/dist/style/vue2-scrollbar.css")
export default {
    components: {
        Top
    },
    name: 'app'
};
</script>

<style lang="less">
@import './assets/css/base.css';
@import './assets/css/app.css';
@import './assets/css/common.css';
@import './assets/css/cover.less';
</style>
