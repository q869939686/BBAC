<template>
    <div class="page-wrap">
        <el-row>
            <el-col :span="5">
                <div class="block" style="height: 610px; padding: 20px 10px;">
                    <div>
                        Car Type
                    </div>
                    <el-select v-model="carType" filterable placeholder="All" @change="carTypeChange()">
                        <el-option-group
                            v-for="group in options3"
                            :key="group.label"
                            :label="group.label"
                        >
                            <el-option
                                v-for="item in group.options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-option-group>
                    </el-select>
                    <div>
                        Time
                    </div>
                    <el-select v-model="time" filterable placeholder="All" @change="timeChange()" style="margin-top: 20px">
                        <el-option
                            v-for="item in timeOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>

                    <div>
                        <el-radio class="radio" v-model="radio" label="1">Q-Sensor</el-radio>
                        <el-radio class="radio" v-model="radio" label="2">Q-Stop</el-radio>
                        </br>
                        <el-radio class="radio" v-model="radio" label="3">Q-Alert</el-radio>
                    </div>

                    <div style="position: relative">
                        <div id="sel_qsensor_mask" @click.prevent="showmask"></div>
                        <el-select  class="eWidth" v-model="multipleSelect" multiple placeholder="请选择">
                            <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                    <!--Q-Sensor (multiple choice)  -->
                    <el-dialog title="Q-Sensor (multiple choice)" :visible.sync="dialogVisible">
                        <div slot="title">
                            <p style="float:left">Q-Sensor (multiple choice)</p>
                        </div>
                        <el-checkbox-group v-model="checkList" >
                            <el-checkbox label="DT-glue" class="mask_main_checkbox"></el-checkbox>
                            <el-checkbox label="DT-test" class="mask_main_checkbox"></el-checkbox>
                            <el-checkbox label="WSA" class="mask_main_checkbox"></el-checkbox>
                            <el-checkbox label="GFP" class="mask_main_checkbox"></el-checkbox>
                            </br>
                            <el-checkbox label="PAB" class="mask_main_checkbox"></el-checkbox>
                            <el-checkbox label="PAF" class="mask_main_checkbox"></el-checkbox>
                            <el-checkbox label="CMM" class="mask_main_checkbox"></el-checkbox>
                            <el-checkbox label="VocA" class="mask_main_checkbox"></el-checkbox>
                        </el-checkbox-group>
                        <div slot="footer" class="dialog-footer text-center">
                            <el-button @click="dialogVisible = false" size="small">Cancel</el-button>
                            <el-button type="primary" @click="confirm" size="small">confirm</el-button>
                        </div>
                    </el-dialog> 
                    <div class="flex-row" style="height: auto;margin-top: 240px; font-size: 12px">
                        <div class="flex-col-1 text-left">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-arrow-left"></use>
                            </svg>
                            <span>
                                Back
                            </span>
                        </div>
                        <div class="flex-col-1 text-right" style="color: #CCC">
                            
                            <span>
                                Next
                            </span>
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-arrow-right"></use>
                            </svg>
                        </div>
                    </div>
                    <el-button  type="primary" class="my" >UPDATE</el-button>
                </div>
            </el-col>
            <!-- 模型部分 -->
            <el-col :span="19">
                <View3d v-show="viewAction === '3D'"/>
                <ViewBI v-show="viewAction === 'BI'"/>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import { mapState } from 'vuex';
import View3d from './3D';
import ViewBI from './BI';
export default {
    components: {
        'ViewBI': ViewBI,
        'View3d': View3d
    },
    data () {
        return {
            // 车系
            carType: '',
            options3: [{
                label: 'MRAI',
                options: [{
                    value: 'V205',
                    label: 'V205'
                }, {
                    value: 'W205',
                    label: 'W205'
                }]
                }, {
                label: 'MRAII',
                options: [{
                    value: 'V213',
                    label: 'V213'
                }, {
                    value: 'W213',
                    label: 'W213'
                }, {
                    value: 'X253',
                    label: 'X253'
                }]
            }],
            // 时间
            time: '',
            timeOptions: [
            ],
            options: [],
            radio: 1,
            // 控制多选的弹出层
            dialogVisible: false,
            // 多选的值
            checkList: [],
            // 多选确认的值(下拉框里的)
            multipleSelect: []
        }
    },
    // 计算属性， 处理后的
    computed: {
        // 这里面的数据都是从store拿的，会实时更新
        ...mapState({
            viewAction: state => state.common.viewAction
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
         * 展示模态框
         */
        showmask () {
            this.dialogVisible = true
            // 从下拉里面拿值到模态框
            this.checkList = this.multipleSelect
        },
        /*多选确认 */
        confirm () {
            // 从模态框拿值到下拉里面
            this.multipleSelect = this.checkList
            this.dialogVisible = false
        }
    }
}
</script>
<style>
@import './index.css';
.my{
    width:180px;
    height:40px;
    margin-top: 20px;
}
#sel_qsensor_mask{
    position: absolute;
    top: 0px;
    height: 40px;
    width: 100%;
    z-index: 10;
}
.mask_main_checkbox{
    width: 20%;
    margin-bottom: 20px;
}
.page-wrap .el-dialog__footer{
    background-color: #f2f2f2;
    padding: 6px 0;
}
.el-dialog__header{
    background-color: #f2f2f2;
    padding: 10px 20px 10px;
}
</style>

