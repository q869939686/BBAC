<template>
    这是修改了
    <el-row>24 = 4 + 12 +8
        <el-col :span="5">
            <!-- v-model 双向绑定，绑data上的值 -->
            <el-select v-model="carType" filterable placeholder="请选择" @change="carTypeChange()">
                <el-option
                    v-for="item in carTypeOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
            </el-select>
            <el-select v-model="time" filterable placeholder="请选择" @change="timeChange()" style="margin-top: 20px">
                <el-option
                    v-for="item in timeOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
            </el-select>

            <div>
                <el-radio class="radio" v-model="radio" label="1">备选项</el-radio>
                <el-radio class="radio" v-model="radio" label="2">备选项</el-radio>
            </div>
        </el-col>
        <el-col :span="12">
             <div class="flex-row" style="position: 'relative'">
                <div
                    ref="threeContainer"
                    class="flex-col-1 renderer-container"
                    style="height: 400px;"
                >   
                    <!-- <canvas  ref="canvas" style="width: 100%;height: 100%;touch-action: none;"></canvas> -->
                    <div class="car-reset" @click="reset()">
                        RESET
                    </div>
                    <Loading v-show="!isCarLoadingCompleted"/>
                </div>
                <!--<car-part-tree/> -->
            </div> 
        </el-col>
        <el-col :span="7">
            <!-- :xx ==  v-bind-xxx    然后这里也更新                :index="1" 此时是数字1 , :index="1 + 1" 渲染后是2，  index="1"是字符串1  index="1 + 1" 渲染后是 "1 + 1" -->
            <chart-bar :data="barData"/>
        </el-col>
    </el-row>
</template>
<script>
import { mapState } from 'vuex'
// three
import {Vector3} from 'three';
import '@/three'
import { initRenderer, setAnimateable } from '@/three/renderer';
import { domEvents, controls } from '@/three/controls';
import camera, { cameraPosition } from '@/three/camera';
import scene from '@/three/scene';
// components
import Loading from '@/components/loading'
import ChartBar from '@/components/charts/chart-bar'
// utils
import {getRemainingHeight} from '@/utils/dom'
// views
import CarPartTree from './CarPartTree'

export default {
    components: {
        Loading,
        CarPartTree,
        ChartBar
    },
    data () {
        return {
            // 车系
            carType: '',
            carTypeOptions: [
                {
                    label: 'All',
                    value: 'All'
                },
                {
                    label: '车系1',
                    value: 'car1'
                }
            ],
            // 时间
            time: '',
            timeOptions: [
            ],
            radio: 1
        }
    },
    // 计算属性， 处理后的
    computed: {
        // 这里面的数据都是从store拿的，会实时更新
        ...mapState({
            isToPart: state => state.common.isToPart,
            isCarLoadingCompleted: state => state.common.isCarLoadingCompleted,
            barData: state => state.getChartData.barData
        })
    },
    mounted () {
        var renderer = initRenderer(this.$refs.threeContainer);
        var width = this.$refs.threeContainer.offsetWidth;
        var height = this.$refs.threeContainer.offsetHeight;
        // 获取容器剩余高度
        var remainingHeight = getRemainingHeight(this.$refs.threeContainer);
        renderer.setSize(width, height);
        // setAnimateable(true);
        this.$refs.threeContainer.appendChild(renderer.domElement)
    },
    methods: {
        /**
         * 车系下拉改变
         */
        carTypeChange () {
            console.log(this.carType)
            // timeChange(this.carType)
            this.$http.post('/a', {carType: this.carType})
            .then(() => {
                // 请求成功 给time select设置options的值
            })
            // 这里假设成功了
            this.timeOptions = [
                {
                    label: 'All',
                    value: 'All'
                },
                {
                    label: '2010',
                    value: '2010'
                }
            ]
        },
        /**
         * 时间改变
         * @param {String} carType
         */
        timeChange (carType) {
            
        },
        /**
         * 模型重置
         */
        reset () {
            // 清空图表数据 
            this.$store.commit('GET_CHART_DATA', [])// VUe内 ，可以直接this.$store，不用引用
            this.$store.commit('TO_PART', false);
            // 显示全部的部件
            scene.children.forEach(function (child) {
                child.visible = true;
            })
            // reset camera posiotion
            cameraPosition
            .to({
                x: -25.383997199196685,
                y: 68.47368705261472,
                z: 94.71213678587537
            }, 20)
            .start()
            .once('complete', function () {
                // 纠正 controls
                controls.target = new Vector3(61, 0, -4);
                controls.autoRotate = true;
                controls.update();
            });
        },
        aa () {
            // a
        }
    }
}
</script>
<style scoped>
@import './index.css';
.renderer-container{
    position: relative;
}
.car-reset{
    position: absolute;
    bottom: 100px;
    right: 20px;
    cursor: pointer;
}
</style>

