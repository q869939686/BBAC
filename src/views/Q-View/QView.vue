<template>
    <el-row>
        <el-col :span="5">
            <!-- v-model 双向绑定，绑data上的值 我写的-->
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
        <el-col :span="19">
           <view3d v-show="viewAction === '3D'"/>
           <ViewBI v-show="viewAction === 'BI'"/>
        </el-col>
    </el-row>
</template>
<script>
import { mapState } from 'vuex';
import View3d from './3D';
import ViewBI from './BI';
export default {
    components: {
        'ViewBI': ViewBI,
        'view3d': View3d
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
            
        }
    }
}
</script>
<style scoped>
@import './index.css';

</style>

