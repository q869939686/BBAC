<template>
    <div ref="div" style="width: 100%;height: 300px">
    </div>
</template>
<script>
import * as d3 from 'd3';
import _ from 'lodash';
export default {
    name: 'chart-bar',
    data () {
        return {}
    },
    // 外面传进来的数据
    props: {
        data: {
            type: Array, // 数据类型检测
        },
        xdata: {
            type: Array,
            default: function () {
                return ['A','B','C','D','E','F']
            }
        }
    },
    // 处理过的值，拿值跟data, props一样
    computed: {
    },
    // 数据变化时还得更新
    watch: {
        // 监听 data
        data: function (newData) {
            intChart(this.$refs.div, newData, this.xdata)
        }
    },
    // 第一次渲染(此时无数据) this.$refs.div在被编译时获取该元素，原生dom
    mounted () {
        setTimeout(() => {
            intChart(this.$refs.div, this.data, this.xdata)
        }, 10);
    }
}
// 图表颜色，宽高都不行写死。
/**
 * @param {HTMLElemet}  容器
 * @param {Array}  data [20,30,40,50,30,10]
 * @param {Array}  xdata ['A','B','C','D','E','F']
 */
var intChart =  function (div, dataset, xdata){
    // 先清空
    div.innerHTML = '';
    // 没有引用jq， 我用原生写
    var _swidth = div.clientWidth;
    var _sheight = div.clientHeight;
    var _margin = {top:10,left:30,right:40,bottom:30};
    var _titleHeight = 60;
    //得到绘图区的高度和宽度
    var _chartHeight = _sheight - _margin.top - _margin.bottom - _titleHeight;
    var _chartWidth = _swidth - _margin.left - _margin.right;

    //核心绘图区的边距
    var _chartmargin  =  {top:20,left:20,right:20,bottom:20};

    //核心绘图区的高度和宽度
    var _yaxisHeight = _chartHeight - _chartmargin.top - _chartmargin.bottom;
    var _xaxisWidth = _chartWidth - _chartmargin.left - _chartmargin.right;

    var _padding = 0.7;

    var _svg = d3.select(div)
            .append("svg")
            .attr("width",_swidth)
            .attr("height",_sheight);
            
            
    var _glevel1 = _svg.append("g")
                        .attr("transform","translate("+_margin.left +","+_margin.top+")");

    var _glevel2_title = _glevel1.append("g");

    var _glevel2_chart = _glevel1.append("g")
                            .attr("transform","translate(0,"+_titleHeight+")");

    var _gleve3_yaxis = _glevel2_chart.append("g")
                    .attr("id","gyaxis")
                    .attr("transform","translate("+_chartmargin.left+","+_chartmargin.top+")");


    var _gleve3_xaxis = _glevel2_chart.append("g")
                    .attr("id","gxaxis")
                    .attr("transform","translate("+_chartmargin.left+","+(_chartHeight - _chartmargin.bottom)+")");

    var _gleve3_content = _glevel2_chart.append("g")
                    .attr("id","chartcontent")
                    .attr("transform","translate("+_chartmargin.left+","+_chartmargin.top+")");


    var _linescale = d3.scaleLinear()
                        .domain( [0,d3.max(dataset)] ).nice()
                        .range([_yaxisHeight,0])
                        .clamp(true) ;

    var _yaxis = d3.axisLeft()
                    .scale(_linescale)
                    .ticks(5);

    _yaxis(_gleve3_yaxis);			


    var _bandscale = d3.scaleBand()
                    .padding(_padding)
                    .domain(xdata)
                    .range([0,_xaxisWidth]);

    var _xaxis = d3.axisBottom()
                    .scale(_bandscale);

    _xaxis(_gleve3_xaxis);

    _gleve3_content.append("g")
            .selectAll("rect")
            .data(dataset)
            .enter()
            .append("rect")
            .attr("x",function(d,i){
                return _bandscale(xdata[i]);
            })
            .attr("y",function(d,i){
                return _yaxisHeight - _linescale(d3.max(dataset)-d);
            })
            .attr("width",_bandscale.bandwidth())
            .attr("height",function(d,i){
                return _linescale(d3.max(dataset)-d);
            })
            .style("fill","#2ec5bc");

    /*_gleve3_content.append("g")
            .selectAll("text")
            .data(dataset)
            .enter()
            .append("text")
            .attr("x",function(d,i){
                return _bandscale(xdata[i]);
            })
            .attr("y",function(d,i){
                return _yaxisHeight - _linescale(d3.max(dataset)-d);
            })
            .attr("dx",_bandscale.bandwidth()/2)
            .attr("dy","1em")
            .attr("text-anchor","middle")
            .text(function(d){
                return d;
            })
            .style("fill","#fff");*/

    //添加左上角文字
    _gleve3_yaxis.append("text")
            .attr("x",0)
            .attr("y",0)
            .attr("dx","0")
            .attr("dy","-50")
            .text("GFP Score")
            .attr('fill','#000')
            .attr('font-size','12px')
            .attr("text-anchor","middle")


    //添加图例
    _gleve3_yaxis.append("circle")
            .attr("cx",_xaxisWidth-68)
            .attr("cy",-55)
            .attr("r","3")
            .style("fill","#2ec5bc");
    _gleve3_yaxis.append("text")
            .attr("x",_xaxisWidth-48)
            .attr("y",0)
            .attr("dx","0")
            .attr("dy","-50")
            .text("fph")
            .attr('fill','#000')
            .attr('font-size','12px')
            .attr("text-anchor","middle")


    _gleve3_yaxis.append("circle")
            .attr("cx",_xaxisWidth-26)
            .attr("cy",-55)
            .attr("r","3")
            .style("fill","#fb3781");
    _gleve3_yaxis.append("text")
            .attr("x",_xaxisWidth)
            .attr("y",0)
            .attr("dx","0")
            .attr("dy","-50")
            .text("Target")
            .attr('fill','#000')
            .attr('font-size','12px')
            .attr("text-anchor","middle")



    //添加横纵坐标维度
    _gleve3_yaxis.append("text")
            .attr("x",0)
            .attr("y",0)
            .attr("dx","0")
            .attr("dy","-20")
            .text("fph")
            .attr('fill','#000')
            .attr('font-size','12px')
            .attr("text-anchor","middle")


    _gleve3_xaxis.append("text")
            .attr("x",_xaxisWidth+30)
            .attr("y",0)
            .attr("dx","0")
            .attr("dy","0")
            .text("Car Type")
            .attr('fill','#000')
            .attr('font-size','12px')
            .attr("text-anchor","middle")

    //改变横纵坐标轴和刻度颜色
    d3.select("#gyaxis").selectAll("path").style("stroke","#d6d8e5");
    d3.select("#gyaxis").selectAll("line").style("stroke","#d6d8e5");

    d3.select("#gxaxis").selectAll("path").style("stroke","#d6d8e5");
    d3.select("#gxaxis").selectAll("line").style("stroke","#d6d8e5");
}
</script>