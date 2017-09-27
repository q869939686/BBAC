<template>
    <div class="flex-row" style="position: 'relative'">
        <div
            ref="threeContainer"
            class="flex-col-8 renderer-container"
        >   
            <!-- <canvas  ref="canvas" style="width: 100%;height: 100%;touch-action: none;"></canvas> -->
            <Loading v-show="!isCarLoadingCompleted"/>
        </div>
        <!--<car-part-tree/> -->
    </div>   
</template>
<script>
import { mapGetters } from 'vuex'
// three
import '@/three'
import { initRenderer, setAnimateable } from '@/three/renderer';
// components
import Loading from '@/components/loading'
// utils
import {getRemainingHeight} from '@/utils/dom'
// views
import CarPartTree from './CarPartTree'

export default {
    components: {
        Loading,
        CarPartTree
    },
    data () {
        return {
        }
    },
    computed: {
        ...mapGetters([
            'isToPart',
            'isCarLoadingCompleted'
        ])
    },
    mounted () {
        var renderer = initRenderer(this.$refs.threeContainer);
        var width = this.$refs.threeContainer.offsetWidth;
        // 获取容器剩余高度
        var remainingHeight = getRemainingHeight(this.$refs.threeContainer);
        renderer.setSize(width, remainingHeight);
        // setAnimateable(true);
        this.$refs.threeContainer.appendChild(renderer.domElement)
    },
    methods: {
    }
}
</script>
<style scoped>
@import './page.css';
</style>

