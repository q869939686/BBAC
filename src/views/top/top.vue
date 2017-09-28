<template>
    <el-tabs v-model="activeKey" @tab-click="handleClick">
        <el-tab-pane label="Q-View" name="Q-View" path="/Q-View">
        </el-tab-pane>
        <el-tab-pane label="配置管理" name="second" path="/xxx">配置管理</el-tab-pane>
        <el-tab-pane label="角色管理" name="third" path="/">角色管理</el-tab-pane>
    </el-tabs>
</template>
<script>
// 顶部
export default {
    components: {
    },
    data () {
        return {
            activeKey: 'Q-View'
        }
    },
    mounted () {
    },
    methods: {
        handleClick (tab, event) {
            this.$router.push(tab.$attrs.path)
        }
    }
}
</script>
