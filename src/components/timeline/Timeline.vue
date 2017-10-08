<template>
    <div class="timeline">
        <svg width="100%" height="100%" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <circle :cx="grid.left" :cy="grid.top" r="5" :stroke="circleColor" stroke-width="2" fill="transparent"/>
            <line :x1="grid.left * 1.4" :y1="grid.top" :x2="width - grid.right || 0" :y2="grid.top" style="stroke-width:2" :stroke="circleColor"/>
            <circle :cx="width - grid.right + 5 || 0 " :cy="grid.top" r="5" :stroke="circleColor" stroke-width="2" fill="transparent"/>
            <g>
                <!-- 刻度-->
                <line
                    v-for="index in (xData.length)"
                    :x1="(index - 1) * interval + grid.left"
                    :y1="grid.top - 10"
                    :x2="(index - 1) * interval + grid.left"
                    :y2="grid.top - 15"
                    style="stroke-width:2"
                    :stroke="circleColor"
                />
            </g>
            <g>
                <!-- 刻度上的label-->
                <text
                    v-for="(item, index) in xData"
                    :x="(index) * interval + grid.left"
                    :y="grid.top + 10"
                    dx="0"
                    dy="-40"
                    fill="#AAA"
                    font-size="12px"
                    text-anchor="middle">
                    {{item}}
                </text>
            </g>
        </svg>
    </div>
</template>
<script>
 
 export default {
    name: 'timeline',
    data () {
        return {
            width: 0,
            height: 0
        }
    },
    props: {
        grid: {
            type: Object,
            default: function () {
                return {
                    left: 17,
                    top: 39,
                    right: 20
                }
            }
        },
        circleColor: {
            type: String,
            default: '#8396A7'
        },
        xData: {
            type: Array,
            default: function () {
                return ['day01', 'day02', 'day03', 'day04', 'day05', 'day06', 'day07']
            }
        }
    },
    computed: {
        interval: function () {
            return (this.width / (this.xData.length -1) - this.grid.left/3)
        }
    },
    mounted () {
        this.width = this.$el.clientWidth
        this.height = this.$el.clinetHeight
        console.log(this.width)
    }
 }
</script>
<style>

</style>
