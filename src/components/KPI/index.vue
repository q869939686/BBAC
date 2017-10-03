<template>
    <div>
        <svg style="width: 44px;">
            <g v-for="(item, index) in data" :key="index">
                <rect
                    width="4"
                    :fill="item.color"
                    style="fill-opacity: 1;"
                    :height="reactHeight"
                    :y="index * reactHeight"
                    x="0"
                > 
                </rect>
                <text 
                    x="4" 
                    :y="index * reactHeight + 15"
                    dy="0.5em" 
                    dx="0.5em" 
                    style="font-style: normal; font-variant: normal; font-weight: normal; font-stretch: normal; font-size: 10px; line-height: normal; font-family: sans-serif;">
                    {{item.value}}%
                </text>
            </g>
        </svg>
        <span
            style="display: inline-block; position: relative; left: -20px;font-zise: 10px; white-space: nowrap;font-weight: 600; transform: scale(0.6, 0.6)">
            Target KPI
        </span>
    </div>
</template>
<script>
export default {
    name: 'kpi',
    data: function () {
        return {
        }
    },
    props: {
        data: {
            type: Array,
            default: function () {
                return [
                    {color: '#F63A38', value: 0.05},
                    {color: '#EE7225', value: 0.15},
                    {color: '#DFDA42', value: 0.25},
                    {color: '#B7DD4B', value: 0.35},
                    {color: '#9BE617', value: 0.45},
                ]
            }
        },
        reactHeight: {
            type: Number,
            default: 30
        }
    },
    created () {

    }
}
</script>
