<template>
    <el-row>
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
        <!-- 模型部分 -->
        <el-col :span="17">
             <div class="flex-row" style="position: 'relative'">
                <div
                    ref="threeContainer"
                    class="flex-col-1 renderer-container"
                    style="height: 400px;"
                >   
                    <!-- <canvas  ref="canvas" style="width: 100%;height: 100%;touch-action: none;"></canvas> -->
                    <!-- other -->
                    <div>
                        <!-- KPI -->
                        <kpi style="position: absolute;left: 10px;top:50px; width: 20px"> </kpi>
                        <!-- car part map -->
                        <el-collapse accordion style=" position: absolute; left: 10px; top: 0px; border-radius: 30px;">
                            <el-collapse-item>
                                <template slot="title">
                                    Car Part Map <span style="display: inline-block;width: 2px"></span>
                                </template>
                                <car-part-tree/>
                            </el-collapse-item>
                        </el-collapse>
                        <!-- Part name -->
                        <div style="position: absolute;right: 0px;top:20px; width: 120px">
                            <div class="car-part-info">
                                <spearation-line/>
                                <span class="cart-part-info-title">Part Num.</span>
                                <span class="cart-part-info-content">{{carPartInfo.id}}</span>
                            </div>
                            <div class="car-part-info" style="margin-top: 20px;">
                                <spearation-line/>
                                <span class="cart-part-info-title">Part Name-Sensor</span>
                                <span class="cart-part-info-content">{{carPartInfo.name}}</span>
                            </div>
                        </div>
                        <!-- 相机位置矫正 -->
                        <div class="car-reset">
                            <div style="width: 30px;height: auto; background-color: rgba(1, 1, 1, 0.7); border-radius: 20px; overflow: hidden; color: #FFF">
                                <div class="controls" @click="toTop()">
                                    <svg class="icon" aria-hidden="true">
                                        <use xlink:href="#icon-map-car"></use>
                                    </svg>
                                </div>
                                <div class="controls" @click="toFront()">
                                    <svg class="icon" aria-hidden="true">
                                        <use xlink:href="#icon-car1"></use>
                                    </svg>
                                </div>
                                <div class="controls" @click="toLeft()">
                                    <svg class="icon" aria-hidden="true">
                                        <use xlink:href="#icon-car"></use>
                                    </svg>
                                </div>
                            </div>
                            <div class="text-center" @click="zoom('in')">
                                <svg class="icon" aria-hidden="true">
                                    <use xlink:href="#icon-jia"></use>
                                </svg>
                            </div>
                            <div class="text-center" @click="zoom('out')">
                                <svg class="icon" aria-hidden="true">
                                    <use xlink:href="#icon-jian"></use>
                                </svg>
                            </div>
                        </div>
                        <!-- 放大缩小 -->
                    </div>
                    
                    <Loading v-show="!isCarLoadingCompleted"/>
                </div>
            </div>
             <!-- 时间轴和详情 -->
            <div  class="">
                <div>
                    时间轴
                </div>
                <div class="other-info">
                    <div class="flex-row top">
                        <div class="flex-col-10">
                            <div style="font-size: 12px;">
                                No.55717862
                            </div>
                            <div style="font-weight: 600">
                                125 Total
                            </div>
                        </div>
                        <div class="flex-col-3">(by views)</div>
                    </div>
                    <scroll-bar :style="scrollBarStyle">
                        <div class="flex-row body">
                            <div class="flex-col-1">
                                <div class="title">
                                    Basic Information
                                </div>
                                <div>
                                    A2136107400 > 61521037
                                </div>
                            </div>
                            <div class="flex-col-1">
                                <div class="title">
                                    Defect Information
                                </div>
                                <div>
                                    <div>
                                        <span>Defect:</span>
                                        <span>Missing</span>
                                    </div>
                                    <div>
                                        <span>Detection:</span>
                                        <span>Tishi</span>
                                    </div>
                                    <div>
                                        <span>Region:</span>
                                        <span>Fs62_240</span>
                                    </div>
                                </div>
                            </div>
                            <div class="flex-col-1">
                                <div class="title">
                                    Other Information
                                </div>
                                <div>
                                    <div>
                                        <span>Time:</span>
                                        <span>2016/7/12</span>
                                    </div>
                                    <div>
                                        <span>Done:</span>
                                        <span>2016/7/12</span>
                                    </div>
                                    <div>
                                        <span>Priority:</span>
                                        <span>1</span>
                                    </div>
                                    <div>
                                        <span>Charge:</span>
                                        <span>Li Lei</span>
                                    </div>
                                </div>
                            </div>
                            <div class="flex-col-1">
                                <div class="title">
                                    Solution
                                </div>
                                <div>
                                    Operators glue according to started
                                </div>
                            </div>
                            <div class="flex-col-1">
                                <div class="title">
                                    Views
                                </div>
                                <div>
                                    1375
                                </div>
                            </div>
                        </div>
                    </scroll-bar>
                </div>
            </div>
        </el-col>
        <el-col :span="2">
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
import camera, { cameraPosition, changeCamera, cameraZoom } from '@/three/camera';
import scene from '@/three/scene';
// components
import Loading from '@/components/loading'
import ChartBar from '@/components/charts/chart-bar'
import KPI from '@/components/KPI'
import SpearationLine from '@/components/separation-line'
import ScrollBar from 'vue2-scrollbar'
// utils
import {getRemainingHeight} from '@/utils/dom'
// views
import CarPartTree from './CarPartTree'

export default {
    components: {
        Loading,
        CarPartTree,
        ChartBar,
        'kpi': KPI,
        SpearationLine,
        ScrollBar
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
            barData: state => state.getChartData.barData,
            carPartInfo: state => state.carParts.carPartInfo
        }),
        scrollBarStyle: function () {
            return {
                width: "35%",
                minWidth: "100%",
                maxHeight: "150px"
            }
        }
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
        toTop () {
            changeCamera(this.$store, controls, {
                x: 13.0705977601392,
                y: 139.99158190941083,
                z: -3.763071838228776
            })
        },
        toFront () {
            changeCamera(this.$store, controls, {
                x: -84.228368539148,
                y: 27.726690181742146,
                z: 1.9057905945526459
            })
        },
        toLeft () {
            changeCamera(this.$store, controls, {
                x: 24.35866501962054,
                y: 27.72669018174217,
                z: -144.6540790803623
            })
        },
        /**
         * 缩放
         * @param {String} 'in' | 'out'
         */
        zoom (action) {
            cameraZoom(action);
            controls.update();
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
    right: 0px;
    cursor: pointer;
}
.car-part-info span{
    white-space: nowrap;
}
.car-part-info .cart-part-info-title{
    display: inline-block;
    font-size: 12px;
    transform: scale(1, 1);
}
.car-part-info .cart-part-info-content{
    height: 30px;
    width: 130px;
    font-size: 12px;
    font-weight: 600;
    overflow: hidden;
}
.controls{
    text-align: center;
}
.controls .icon{
    height: 30px;
}
.other-info .top{
    padding: 10px;
    border: 1px solid #CCC;
}
.other-info .body{
    padding: 10px;
    padding-top: 15px;
    border: 1px solid #CCC;
    border-top: none;
}
.other-info .body>div {
    display: inline-block;
    vertical-align: top;
    height: 100%;
    align-self: flex-start;
    font-size: 12px;
}
.other-info .body .title{
    font-size: 13px;
    font-weight: 600;
    margin-bottom: 15px;
}
</style>

