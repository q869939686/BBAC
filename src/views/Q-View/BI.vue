<template>
    <div class="bi">
        <el-row>
            <el-col :span="8">
                <div class="block" ref="canvas">
                    <span v-show="isSelectedCarType || isSensorSelect">
                        <KPI style="display: inline-block; position: absolute; left: 5px;top: 50px; width: 35px;"/>
                        <img ref="img" :src="carImg" width="100%" height="100%" style="border: 0px"/>
                    </span>
                    <Description v-show="!isSelectedCarType || !isSensorSelect"/>
                </div>
            </el-col>
            <el-col :span="8">
                <div class="block">
                    <Description v-show="isSelectedCarType && !isSensorSelect"/>
                    <ChartBar2 v-show="!isSelectedCarType || isSensorSelect" :data="chartData[0]" :xdata="['v206','v205','v245','v265','v2705','v2505']"/>
                </div>
            </el-col>
            <el-col :span="8">
                <div class="block">
                    <ChartBar :data="chartData[1]"/>
                </div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="8">
                <div class="block">
                    <ChartLine v-if="isSelectedCarType || isSensorSelect" :data="chartData[4]"/>
                    <ChartBar v-else :data="chartData[2]"/>
                </div>
            </el-col>
            <el-col :span="8">
                <div class="block">
                    <Emty v-if="isSelectedCarType || isSensorSelect"></Emty>
                    <ChartBar v-else :data="chartData[3]"/>
                </div>
            </el-col>
            <el-col :span="8">
                <div class="block">
                    <Emty v-if="isSelectedCarType || isSensorSelect"></Emty>
                    <ChartLine v-else :data="chartData[4]"/>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import { mapState } from 'vuex'
// components
import KPI from '@/components/KPI'
import ChartBar from '@/components/charts/chart-bar'
import ChartBar2 from '@/components/charts/chart-bar2'
import ChartLine from '@/components/charts/chart-line'

/*简单组件 2.5D*/
var Description = {
    template: `
        <span style="text-align: center;font-size: 53px;">
            <p style="line-height: 315px;font-size: 100px;">2.5d</p>
            <h3 style="margin-top: -80px;font-size: 14px;color: #a9bccb;">
                The average time to 
                </br>
                solve the problem
            </h3>
        </span>
    `
}
/*简单组件 空格子组件*/
var Emty = {
    template: `
        <div style="line-height:305px;text-align:center;color:#aaa;font-weight:lighter"> —— ——</div>
    `
}

export default {
    name: 'BI',
    components: {
        KPI,
        ChartBar,
        ChartLine,
        ChartBar2,
        Description,
        Emty
    },
    data () {
        return {}
    },
    props: {},
    // 计算属性， 处理后的
    computed: {
        // 这里面的数据都是从store拿的，会实时更新
        ...mapState({
            carImg: state => state.carParts.carImg,
            domElement: state => state.carParts.domElement,
            isShowPart: state => state.QView.isShowPart,
            chartData: state => state.QView.chartData,
            isSelectedCarType: state => state.QView.isSelectedCarType,
            isSensorSelect: state => state.QView.isSensorSelect,
        })
    },
    watch: {
        carImg () {
            // a
        }
    },
    mounted () {
        // console.log(this.domElement.toDataURL('image/jpeg'))
    },
    methods: {
        a () {
            // 请求
        }
    }
}
</script>
<style>
.bi .block{
    position: relative;
    height: 300px;
}
</style>