<template>
    <div class="flex-row" style="position: 'relative'">
        <div 
            style={this.state.threeContainerStyle}
            class="flex-col-8 renderer-container"
        >   
            <canvas  ref="canvas" style="width: 100%;height: 100%;touch-action: none;"></canvas>
            <Loading v-show="!isCarLoadingCompleted"/>
        </div>
        <!--<car-part-tree/> -->
    </div>   
</template>
<script>
import { mapGetters } from 'vuex'
// babylon
import {createScene} from '@/babylon'
// components
import Loading from '@/components/loading'
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
        console.log(this.$refs.canvas)
        createScene(this.$refs.canvas)
        // this.$refs.threeContainer.appendChild(renderer.domElement)
    },
    methods: {
    }
}
</script>
<style scoped>
@import './page.css';
</style>

