<template>
    <div ref="div" style="width: 100%;height: 100%">
    </div>
</template>
<script>
import * as d3 from 'd3';
export default {
    name: 'chart-bar2',
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
        },
        target: {
            type: Array,
            default: function () {
                return [25,15,50,55,20,15];
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
            initChart(this.$refs.div, newData, this.xdata, this.target)
        }
    },
    // 第一次渲染(此时无数据) this.$refs.div在被编译时获取该元素，原生dom
    mounted () {
        setTimeout(() => {
            initChart(this.$refs.div, this.data, this.xdata, this.target)
        }, 10);
    }
}

var initChart=function(div,dataset,xdata,target){
    // 先清空
    div.innerHTML = '';
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
    								.attr("id","gyaxis"+div.id)
    								.attr("transform","translate("+_chartmargin.left+","+_chartmargin.top+")");


    				var _gleve3_xaxis = _glevel2_chart.append("g")
    								.attr("id","gxaxis"+div.id)
    								.attr("transform","translate("+_chartmargin.left+","+(_chartHeight - _chartmargin.bottom)+")");

    				var _gleve3_content = _glevel2_chart.append("g")
    								.attr("id","chartcontent")
    								.attr("transform","translate("+_chartmargin.left+","+_chartmargin.top+")");


    				//判断Y轴坐标的最大值
    				var yHeight=d3.max(dataset)>d3.max(target)?d3.max(dataset):d3.max(target);


    				var _linescale = d3.scaleLinear()
    								   .domain( [0,yHeight] ).nice()
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
    							return _yaxisHeight - _linescale(yHeight-d);
    						})
    						.attr("width",_bandscale.bandwidth())
    						.attr("height",function(d,i){
    							return _linescale(yHeight-d);
    						})
    						.style("fill",function(d,i){

    							return d<target[i]?"#2ec5bc":"#fb3781"
    						});


    				_gleve3_content.append("g")
    						.selectAll("line")
    						.data(target)
    						.enter()
    						.append("line")
    						.attr("x1",function(d,i){
    							return _bandscale(xdata[i])-5;
    						})
    						.attr("y1",function(d,i){
    							return _yaxisHeight - _linescale(yHeight-d);
    						})
    						.attr("x2",function(d,i){
    							return _bandscale(xdata[i])+_bandscale.bandwidth()+5;
    						})
    						.attr("y2",function(d,i){
    							return _yaxisHeight - _linescale(yHeight-d);
    						})
    						.style("stroke","#fb3781");

    				//添加左上角文字
    				_gleve3_yaxis.append("text")
    						.attr("x",0)
    						.attr("y",0)
    						.attr("dx","0")
    						.attr("dy","-50")
    						.text("VocA Score")
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
	d3.select("#gyaxis"+div.id).selectAll("path").style("stroke","#d6d8e5");
	d3.select("#gyaxis"+div.id).selectAll("line").style("stroke","#d6d8e5");

	d3.select("#gxaxis"+div.id).selectAll("path").style("stroke","#d6d8e5");
	d3.select("#gxaxis"+div.id).selectAll("line").style("stroke","#d6d8e5");
}
</script>