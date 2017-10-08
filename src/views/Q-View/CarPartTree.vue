<template>
    <scrollbar
        class="part-tree"
        style='
            width: 35%,
            minWidth: 300px,
            maxHeight: 450px'
    >
        <el-input placeholder="输入关键字进行过滤" v-model="filterText">
        </el-input>

        <el-tree 
            class="filter-tree"
            :data="carPartList" 
            :props="defaultProps" 

            :filter-node-method="filterNode" 
            ref="tree2"
        >
        </el-tree>
    </scrollbar>
</template>
<script>
import Scrollbar from 'vue2-scrollbar';
// // z1部分
        // loaderCarPartPromise('Z1/front-end.js', 'front-end', {id: 'A2136207400'}), // 前端 
        // loaderCarPartPromise('Z1/main-floor-board.js', 'main-floor-board', {id: 'A2136100078'}), // 主底板
        // loaderCarPartPromise('Z1/rear-end.js', 'rear-end', {id: 'A2136109201'}), // 后端
        // loaderCarPartPromise('Z1/L-bottom-strengthen-girder.js', 'L-bottom-strengthen-girder', {id: 'A2136108502'}), // 底加强梁(左)
        // loaderCarPartPromise('Z1/R-bottom-strengthen-girder.js', 'R-bottom-strengthen-girder', {id: 'A2136108602'}), // 底加强梁(右)
        // loaderCarPartPromise('Z1/A2136108401.js', 'A2136108401', {id: 'A2136108401'}),// 地板加强板(左)
        // loaderCarPartPromise('Z1/A2136101410.js', 'A2136101410', {id: 'A2136101410'}),// 地板加强板(右)
        // // // z2.1部分
        // loaderCarPartPromise('Z2.1/A2136200286.js', 'A2136200286', {id: 'A2136200286'}), // 仪表台横梁
        // loaderCarPartPromise('Z2.1/A2136260029.js', 'A2136260029', {id: 'A2136260029'}), // 仪表台小件(左)
        // loaderCarPartPromise('Z2.1/A2136260129.js', 'A2136260129', {id: 'A2136260129'}), // 仪表台小件(右)
        // loaderCarPartPromise('Z2.1/A2136303901.js', 'A2136303901', {id: 'A2136303901'}), // 侧围内板(左)
        // loaderCarPartPromise('Z2.1/A2136304001.js', 'A2136304001', {id: 'A2136304001'}), // 侧围内板(右)
        // loaderCarPartPromise('Z2.1/A2136362900.js', 'A2136362900', {id: 'A2136362900'}), // Z2.1小件(左)
        // loaderCarPartPromise('Z2.1/A2136363000.js', 'A2136363000', {id: 'A2136363000'}), // Z2.1小件(右)
        // loaderCarPartPromise('Z2.1/A2136401800.js', 'A2136401800', {id: 'A2136401800'}), // 后围板

        // // // z2.2部分
        // loaderCarPartPromise('Z2.2/R-side-wall-planking-assembly.js', 'R-side-wall-planking-assembly', {id: 'A2136303001'}), // 侧围外板总成(右)
        // loaderCarPartPromise('Z2.2/L-side-wall-planking-assembly.js', 'L-side-wall-planking-assembly', {id: 'A2136302901'}), // 侧围外板总成(左)
        // loaderCarPartPromise('Z2.2/After-cap-table-coaming.js', 'After-cap-table-coaming', {id: 'A2136401100'}), // 后帽台围板
        // loaderCarPartPromise('Z2.2/A2136500800.js', 'A2136500800', {id: 'A2136500800'}), // 天窗支架
        // loaderCarPartPromise('Z2.2/other.js', 'other', {}), // 其他
        // // // z2.3部分
        // loaderCarPartPromise('Z2.3/roof.js', 'roof', {id: 'A2136570700'}, carBody), // 顶盖
        // loaderCarPartPromise('Z2.3/After-cap-table.js', 'After-cap-table', {id: 'A2136404100'}), // 后帽台
        // // // z3部分
        // loaderCarPartPromise('Z3/boot-cover.js', 'boot-cover', {id: 'A2137500900'}),  // 行李箱盖
        // loaderCarPartPromise('Z3/front-machine-cover.js', 'front-machine-cover', {id: 'A2138800457'}), // 前机盖
        // loaderCarPartPromise('Z3/left-sub-board.js', 'left-sub-board', {id: 'A2138800106'}), // 左翼子板
        // loaderCarPartPromise('Z3/right-sub-board.js', 'right-sub-board', {id: 'A2138800006'}),  // 右翼子板
        // loaderCarPartPromise('Z3/LF-car-door.js', 'LF-car-door', {id: 'A2137200105'}), // 左前门
        // loaderCarPartPromise('Z3/LR-car-door.js', 'LR-car-door', {id: 'A2137302902'}), // // 左后门
        // loaderCarPartPromise('Z3/RF-car-door.js', 'RF-car-door', {id: 'A2137200205'}), // // 右前门
        // loaderCarPartPromise('Z3/RR-car-door.js', 'RR-car-door', {id: 'A2137303002'}), // // 右后门
export default {
    components: {
        scrollbar: Scrollbar
    },
    watch: {
        filterText (val) {
            this.$refs.tree2.filter(val);
        }
    },
    data () {
        return {
            filterText: '',
            carPartList: [
                {
                    id: 1,
                    label: 'Z1',
                    children: [
                        {
                            id: 'A2136207400',
                            label: '前端',
                        },
                        {
                            id: 'A2136100078',
                            label: '主底板',
                        },
                        {
                            id: 'A2136109201',
                            label: '后端',
                        },
                        {
                            id: 'A2136108502',
                            label: '底加强梁(左)',
                        },
                        {
                            id: 'A2136108602',
                            label: '底加强梁(右)',
                        },
                        {
                            id: 'A2136108401',
                            label: '地板加强板(左)',
                        },
                        {
                            id: 'A2136101410',
                            label: '地板加强板(右)',
                        }
                    ]
                },
                {
                    id: 2,
                    label: 'Z2.1',
                    children: [
                        {
                            id: 'A2136200286',
                            label: '仪表台横梁',
                        },
                        {
                            id: 'A2136260029',
                            label: '仪表台小件(左)',
                        },
                        {
                            id: 'A2136260129',
                            label: '仪表台小件(右)',
                        },
                        {
                            id: 'A2136303901',
                            label: '侧围内板(左)',
                        },
                        {
                            id: 'A2136304001',
                            label: '侧围内板(右)',
                        },
                        {
                            id: 'A2136362900',
                            label: 'Z2.1小件(左)',
                        },
                        {
                            id: 'A2136363000',
                            label: 'Z2.1小件(右)',
                        },
                        {
                            id: 'A2136401800',
                            label: '后围板',
                        }
                    ]
                },
                {
                    id: 3,
                    label: 'Z2.2',
                    children: [
                        {
                            id: 'A2136303001',
                            label: '侧围外板总成(右)'
                        },
                        {
                            id: 'A2136302901',
                            label: '侧围外板总成(左)'
                        },
                        {
                            id: 'A2136401100',
                            label: '后帽台围板'
                        },
                        {
                            id: 'A2136500800',
                            label: '天窗支架'
                        }
                    ]
                }
            ],
            defaultProps: {
                children: 'children',
                label: 'label'
            }
        };
    },
    methods: {
        filterNode (value, data) {
            if (!value) return true;
            return data.label.indexOf(value) !== -1;
        }
    }
}
</script>
<style lang="css">
/* CarPartTree */
.part-tree{
   
}

</style>

