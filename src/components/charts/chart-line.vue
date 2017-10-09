<template>
    <div ref="div" style="width: 100%;height: 100%">
    </div>
</template>
<script>
import * as d3 from 'd3';
export default {
    name: 'chart-line',
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

var intChart=function(div,ydata,xdata){
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


          //定义Y轴比例尺
        				var _yscale = d3.scaleLinear()
        						.domain( [0 , d3.max(ydata) ] ).nice()
        						.range([_yaxisHeight,0])
        						.clamp(true) ;
        				//定义Y轴坐标轴，使用前面定义的比例尺
        				var _yaxis = d3.axisLeft()
        						.scale(_yscale)
        						.ticks(5);

        				_yaxis(_gleve3_yaxis);

        				//定义X轴比例尺
        				var _xscale = d3.scaleBand()
        						.domain(xdata)
        						.range([0,_xaxisWidth]);
        				//定义X轴坐标轴
        				var _xaxis = d3.axisBottom()
        						.scale(_xscale);

        				_xaxis(_gleve3_xaxis);


        				var dataset=d3.zip(xdata,ydata);
        				var _line=d3.line()
        						.x(function(d,i){
        							return _xscale(xdata[i])+_xscale.bandwidth()/2
        						})
        						.y(function(d,i){
        							return _yscale(ydata[i])
        						});
        				_gleve3_content.append("path")
        						.attr("d",_line(dataset))
        						.style("stroke","#fb3781")
        						.style("fill",'none');
        				_gleve3_content.selectAll("circle")
        						.data(dataset)
        						.enter().append("circle")
        						.attr("cx",function(d,i){
        							return _xscale(xdata[i])+_xscale.bandwidth()/2
        						})
        						.attr("cy",function(d,i){
        							return _yscale(ydata[i])
        						})
        						.attr("r","3")
        						.style("fill","#fb3781");
                _gleve3_content.selectAll("rect")
        						.data(dataset)
        						.enter().append("circle")
        						.attr("cx",function(d,i){
        							return _xscale(xdata[i])+_xscale.bandwidth()/2
        						})
        						.attr("cy",function(d,i){
        							return _yscale(ydata[i])
        						})
        						.attr("r","2")
        						.style("fill","white");







        			//添加左上角文字
        				_gleve3_yaxis.append("text")
        						.attr("x",0)
        						.attr("y",0)
        						.attr("dx","20")
        						.attr("dy","-50")
        						.text("NOK by Week")
        						.attr('fill','#000')
        						.attr('font-size','12px')
        						.attr("text-anchor","middle")


        				//添加图例
        				_gleve3_yaxis.append("circle")
        						.attr("cx",_xaxisWidth-26)
        						.attr("cy",-55)
        						.attr("r","3")
        						.style("fill","#2ec5bc");
        				_gleve3_yaxis.append("text")
        						.attr("x",_xaxisWidth)
        						.attr("y",0)
        						.attr("dx","0")
        						.attr("dy","-50")
        						.text("NOK")
        						.attr('fill','#000')
        						.attr('font-size','12px')
        						.attr("text-anchor","middle")



        				//添加横纵坐标维度
        				_gleve3_yaxis.append("text")
        						.attr("x",0)
        						.attr("y",0)
        						.attr("dx","0")
        						.attr("dy","-20")
        						.text("NOK")
        						.attr('fill','#000')
        						.attr('font-size','12px')
        						.attr("text-anchor","middle")


        				_gleve3_xaxis.append("text")
        						.attr("x",_xaxisWidth+30)
        						.attr("y",0)
        						.attr("dx","0")
        						.attr("dy","0")
        						.text("Week")
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