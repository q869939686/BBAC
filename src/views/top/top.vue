<template>
    <el-row class="top header">
        <el-col :span="4">
            
        </el-col>
        <el-col :span="8">
            <el-tabs v-model="activeKey" @tab-click="handleClick">
                <!-- <el-tab-pane label="Q-View" name="Q-View" path="/Q-View">
                </el-tab-pane>
                <el-tab-pane label="配置管理" name="second" path="/xxx"></el-tab-pane>
                <el-tab-pane label="角色管理" name="third" path="/"></el-tab-pane> -->
            </el-tabs>
        </el-col>
        
        <el-col :span="12">
            <el-select
                v-model="select"
                placeholder="请选择"
                style="margin-top: 30px;margin-left: 600px"
                @change="selectChange"
            >
                <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
            </el-select>
        </el-col>
    </el-row>
</template>
<script>
import {setAnimateable } from '@/three/renderer';
export default {
    components: {
    },
    data () {
        return {
            activeKey: 'Q-View',
            select: 'BI',
            options: [
                {
                    lable: '3D',
                    value: '3D'
                },
                {
                    lable: 'BI',
                    value: 'BI'
                }
            ]
        }
    },
    mounted () {
        this.selectChange('BI')
    },
    methods: {
        handleClick (tab, event) {
            this.$router.push(tab.$attrs.path)
        },
        selectChange (val) {
            this.$store.commit('updateCarImg')
            this.$store.commit('VIEW_ACTION', val)
        }
    }
}
</script>
<style lang="less">
.top .el-select .el-input__inner{
    width: 110px;
    height: 30px;
    border-radius: 20px;
    border: 1px solid #bfcbd9;
}
.top.header {
    background-color: #000;
    color: #FFF;
    background: url('header.jpg') no-repeat;
    background-size: 108% 100%;
    height: 11vh;
}
.top.header {
    .el-tabs__item:hover{
        color: #FFF;
    }
}
.el-tabs__header{
    border-bottom: 0px;
}
</style>
