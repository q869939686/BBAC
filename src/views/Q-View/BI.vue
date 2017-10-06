<template>
    <div>
        <el-row>
            <el-col :span="8">
                <div style="position: relative" ref="canvas">
                    <KPI style="display: inline-block; left: 5px;top:2px; width: 35px"/>
                    <img ref="img" :src="carImg" width="80%" height="150%"/>
                </div>
            </el-col>
            <el-col :span="8">
            </el-col>
            <el-col :span="8">
            </el-col>
        </el-row>
    </div>
</template>
<script>
import { mapState } from 'vuex'
// components
import KPI from '@/components/KPI'
export default {
    name: 'BI',
    components: {
        KPI
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
        a () {}
    }
}
</script>