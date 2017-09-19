<template>
    <el-tabs v-model="activeKey" @tab-click="handleClick">
        <el-tab-pane label="用户管理" name="first">
            <Page/>
        </el-tab-pane>
        <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
        <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
        <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
    </el-tabs>
</template>
<script>
// views
import Page from '../page'
export default {
    components: {
        Page
    },
    data () {
        return {
            activeKey: 'first',
            msg: 'Welcome to Your Vue.js App'
        }
    },
    mounted () {
        console.log(this)
    },
    methods: {
        handleClick (tab, event) {
        }
    }
}
</script>

