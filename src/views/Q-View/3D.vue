<template>
    <div class="block">
         <div class="flex-row" style="position: 'relative'">
            <div
                ref="threeContainer"
                class="flex-col-1 renderer-container"
                style="height: 360px;"
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
                    <div style="position: absolute;right: 10px;top:20px; width: 120px">
                        <div class="car-part-info">
                            <spearation-line/>
                            <span class="cart-part-info-title">Part Num.</span>
                            <span class="cart-part-info-content">No. {{carPartInfo.id}}</span>
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
            <div class="flex-row" style="padding-right: 10px">
                <div class="flex-col-1">
                    <span>Time</span>
                </div>
                <div class="flex-col-10">
                    <Timeline style="height: 70px;"/>
                </div>
            </div>
            <div  class="other-info" style="padding-right: 10px; min-height: 180px;">
                <div v-show="isToPart" class="flex-row">
                    <div class="flex-col-1">
                        <div class="title">
                            Date
                        </div>
                        <div>
                            2017/07/03
                        </div>
                    </div>
                    <div class="flex-col-1">
                        
                        <div class="title">
                            Function
                        </div>
                        <div >
                            Fill2
                        </div>
                    </div>
                    <div class="flex-col-1">
                        
                        <div class="title">
                            Length(mm)
                        </div>
                        <div >
                            768.95
                        </div>
                    </div>
                    <div class="flex-col-1">
                        
                        <div class="title">
                            Defect Length(mm)
                        </div>
                        <div >
                            190
                        </div>
                    </div>
                    <div class="flex-col-1">
                        
                        <div class="title">
                            OK%
                        </div>
                        <div >
                            {{parseInt(carPartInfo.ok)}}%
                        </div>
                    </div>
                    <div class="flex-col-1">
                        
                        <div class="title">
                            Error Code
                        </div>
                        <div>
                            D,E
                        </div>
                    </div>
                </div>
                <div v-show="isToPart" class="flex-row" style="margin-top: 0px; border-top: 0px">
                    <div class="flex-col-1">
                        
                        <div class="title">
                            Production No.
                        </div>
                        <div>
                            {{carPartInfo.id}}
                        </div>
                    </div>
                    <div class="flex-col-1">
                        
                        <div class="title">
                            Plant
                        </div>
                        <div >
                            MRALL BS
                        </div>
                    </div>
                    <div class="flex-col-1">
                        
                        <div class="title">
                            Responsible
                        </div>
                        <div >
                            MRALL Yu Yue
                        </div>
                    </div>
                    <div class="flex-col-1">
                        
                        <div class="title">
                            Risk assessment
                        </div>
                        <div  class="down" @click="download()">
                            Low (click)
                        </div>
                    </div>
                    <div class="flex-col-1">
                        
                        <div class="title">
                            ZEUS No.
                        </div>
                        <div class="down"  @click="download()">
                            1886689(click)
                        </div>
                    </div>
                    <div class="flex-col-1">
                        
                        <div class="title">
                            Similar Issue
                        </div>
                        <div >
                            Y
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
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
import Timeline from '@/components/timeline'
import KPI from '@/components/KPI'
import SpearationLine from '@/components/separation-line'
// utils
import {getRemainingHeight} from '@/utils/dom'
// views
import CarPartTree from './CarPartTree'
import BI from './BI';
// config
import AppConfig from '@/AppConfig'
export default {
    components: {
        Loading,
        CarPartTree,
        'kpi': KPI,
        SpearationLine,
        'BI': BI,
        Timeline
    },
    data () {
        return {
        }
    },
    // 计算属性， 处理后的
    computed: {
        // 这里面的数据都是从store拿的，会实时更新
        ...mapState({
            isToPart: state => state.common.isToPart,
            isCarLoadingCompleted: state => state.common.isCarLoadingCompleted,
            barData: state => state.QView.barData,
            carPartInfo: state => state.carParts.carPartInfo
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
        // 放到store给BI页面用
        this.$store.commit('updateDomElement', renderer.domElement)
    },
    methods: {
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
                x: 63.00834881857759,
                y: 7.567636196114024,
                z: 116.26736530748167
            })
        },
        /**
         * 缩放
         * @param {String} 'in' | 'out'
         */
        zoom (action) {
            cameraZoom(action);
            controls.update();
        },
        /**
         *下载文件
        */
        download () {
            window.open(AppConfig.BASE_URL + '/static/files/V213 Hang on parts destructive test report for gl.pdf')
        }
    }
}
</script>
<style lang="css">
.renderer-container{
    position: relative;
}
.car-reset{
    position: absolute;
    bottom: 50px;
    right: 10px;
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
    display: block;
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
.other-info{
    padding: 10px;
}
.other-info .flex-row{
    margin-top: 10px;
    border: 0.5px solid #CCC;
    font-weight: 500;
    font-size: 13px;
}
.other-info .flex-row .flex-col-1{
    border-right: 0.5px solid #CCC;
    padding: 8px;
}
.other-info .flex-row:not(:first-child) .flex-col-1{
    border-top: 0px;
}
.other-info .flex-row .flex-col-1 div{
    min-height: 20px;
}
.other-info .title{
    font-size: 14px;
    margin-bottom: 10px;
    margin-top: 8px;
    font-weight: 600;
}
.down{
    cursor: pointer;
}
</style>