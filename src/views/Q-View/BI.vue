<template>
    <div>
        <el-row>
            <el-col :span="8">
                <div style="position: relative" ref="canvas">
                    <KPI style="display: inline-block; left: 5px;top:2px; width: 35px;margin-top: 48px;"/>
                    <img ref="img" :src="carImg" width="80%" height="150%"/>
                </div>
            </el-col>
            <el-col :span="8">
                <ChartBar :data="[20,30,40,50,30,10]"/>
            </el-col>
            <el-col :span="8">
                <ChartBar :data="[120,230,40,50,30,10]" :xdata="['v206','v205','v245','v265','v2705','v2505']"/>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="8">
                <ChartBar :data="[20,30,40,50,30,10]"/>
            </el-col>
            <el-col :span="8">
                <ChartBar :data="[20,30,40,50,30,10]"/>
            </el-col>
            <el-col :span="8">
                <ChartBar :data="[120,230,40,50,30,10]" :xdata="['v206','v205','v245','v265','v2705','v2505']"/>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import { mapState } from 'vuex'
// components
import KPI from '@/components/KPI'
import ChartBar from '@/components/charts/chart-bar'

export default {
    name: 'BI',
    components: {
        KPI,
        ChartBar
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
            domElement: state => state.carParts.domElement
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