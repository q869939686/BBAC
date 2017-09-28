<template>
    <div>
        <svg ref="svg"
            :width="width"
            :height="height"
            :style="chartStyle"
        >
        </svg>
    </div>
</template>
<script>
import * as d3 from 'd3';
import _ from 'lodash';
export default {
    name: 'chart-bar',
    // 外部传进来的参数
    props: {
        chartStyle: {
            type: Object,
            default: function () {
                return {}
            }
        },
        data: {
            type: Array,
            default: function () {
                return [];
            }
        },
        keys: {
            type: Array,
            default: function () {
                return ['apples', 'bananas', 'cherries', 'dates'];
            }
        }
    },
    computed: {
        width: function () {
            return parseInt(this.chartStyle.width, 10) || 360
        },
        height: function () {
            return parseInt(this.chartStyle.height, 10) || 240
        }
    },
    // 监听data变化， 有变化就更新图表
    watch: {
        data: function (newData) {
            console.log('更新图表')
            // 
            initChart(this.$refs.svg, newData, this.keys);
        }
    },
    // 此时已经渲染到页面，可以拿到svg ，渲染无数据的图表
    mounted () {
        initChart(this.$refs.svg, this.data, this.keys);
    }
}

/**
 * 渲染柱图
 * @param {Element} svg element 
 * @param {Array}
 * @param {String}
 * 这里是普通的写法，把data, x, y 坐标的单位等可抽离的数据通过传参的方式传进来
 */
const initChart = function ($svg, data, keys) {
    var series = d3.stack()
        .keys(keys)
        .offset(d3.stackOffsetDiverging)(data);

    var svg = d3.select($svg),
        margin = {top: 20, right: 30, bottom: 30, left: 60},
        width = +svg.attr("width"),
        height = +svg.attr("height");

    var x = d3.scaleBand()
        .domain(data.map(function(d) { return d.month; }))
        .rangeRound([margin.left, width - margin.right])
        .padding(0.1);

    var y = d3.scaleLinear()
        .domain([d3.min(series, stackMin), d3.max(series, stackMax)])
        .rangeRound([height - margin.bottom, margin.top]);

    var z = d3.scaleOrdinal(d3.schemeCategory10);

    svg.append("g")
        .selectAll("g")
        .data(series)
        .enter()
            .append("g")
            .attr("fill", function(d) { return z(d.key); })
            .selectAll("rect")
            .data(function(d) { return d; })
            .enter()
                .append("rect")
                .attr("width", x.bandwidth)
                .attr("x", function(d) { return x(d.data.month); })
                .attr("y", function(d) { return y(d[1]); })
                .attr("height", function(d) { return y(d[0]) - y(d[1]); })

    svg.append("g")
        .attr("transform", "translate(0," + (y(0) || 1) + ")")
        .call(d3.axisBottom(x));

    svg.append("g")
        .attr("transform", "translate(" + margin.left + ",0)")
        .call(d3.axisLeft(y));

    function stackMin(serie) {
    return d3.min(serie, function(d) { return d[0]; });
    }

    function stackMax(serie) {
    return d3.max(serie, function(d) { return d[1]; });
    }


}

</script>
<style>

</style>