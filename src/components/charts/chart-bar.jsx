import * as React from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import _ from 'lodash';
export default class ChartLine extends React.Component {
    static defaultProps = {
        data: [],
        style: {},
        chartStyle: {},
    };
    static propsTypes = {
        style: PropTypes.object,
        chartStyle: PropTypes.object,
        option: PropTypes.object
    }

    componentWillReceiveProps (nextProps) {
        if (nextProps.option) {
            var option = _.merge(defaultOption, nextProps.option);
            initChart(this.refs.svg, option);
        }
    }

    componentDidMount () {
        var option = Object.assign({}, defaultOption);
        initChart(this.refs.svg, option);
    }
    render() {
        var {style, chartStyle} = this.props;
        var width = parseInt(style.width, 10) || 260;
        var height = parseInt(style.height, 10) || 140;
        return (
            <div style={style}>
                <svg ref="svg"
                    width={width}
                    height={height}
                    style={chartStyle}
                >
                </svg>
            </div>
        )
    }
}


var defaultOption = {
    color: ['#3398DB'],
    tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis : [
        {
            type : 'category',
            data : [],
            axisTick: {
                alignWithLabel: true
            },
            axisLine:{
                lineStyle: {
                    color: '#FFF'
                }
            }
        }
    ],
    yAxis : [
        {
            type : 'value',
            axisLine:{
                lineStyle: {
                    color: '#FFF'
                }
            }
        }
    ],
    series : [
    ]
};

/**
 * 渲染柱图
 * @param {Element} svg element 
 */
const initChart = function (container, option) {
    const svg = d3.select(container);
    const height = svg.attr('height');
    // eslint-disable-next-line
    const width = svg.attr('width');

	const g = svg.append('g')
				.attr('transform','translate(50,50)');

	let data = [];
	//使用map
    // for(var i=0;i<series[0].data.length;i++){
    // 	data[i] = new Map();
    // 	for(var j=0;j<series.length;j++){
    // 		data[i].set(series[j]['name'],series[j].data[i])
    // 	}
    // }

    //Object
    if (option.series.length !== 0) {
        for(let i=0;i<option.series[0].data.length;i++){
            data[i] = {};
            for(let j=0;j<option.series.length;j++){
                if (option.series[j] === undefined) {
                    data[i] = [];
                    continue;
                }
                data[i][option.series[j]['name']] = option.series[j].data[i];
            }
            data[i]['year'] = `200${i}`;
        }
    }
    	
    var stackKeys = option.series.map(item => item.name)
    let stack = d3.stack().keys(stackKeys);
    let aSeries = stack(data);

    let xDate = [];
    for(let i of data){
    	xDate.push(i.year);
    }
    let xScale = d3.scaleBand()
                    .domain(xDate)
                    
    				.range([0,height])
    				.padding(0.5);
    
    let yMax = d3.max(aSeries[aSeries.length-1] || 0,(d) => d[1])

    let yScale = d3.scaleLinear()
                    .domain([0,yMax])
    				.range([height,0]);

    //drawBar
    let g_stack = g.append('g').classed('stackBar',true);

    for(let i=0;i<aSeries.length;i++){
	     g_stack.selectAll('ract')
	     .data(aSeries[i])
	     .enter()
	     .append('rect')
	     .attr('x',(d,i) => xScale(xDate[i]) )
	     .attr('y',(d,i) => yScale(d[1]) )
	     .attr('width',xScale.bandwidth())
	     .attr('height',(d,i) => height - yScale(d[1] - d[0]) )
	     .attr('fill', d3.schemeCategory10[i])
    }

    // eslint-disable-next-line
    const xAxis = g.append('g').classed('xAxis',true)
            .attr('transform', `translate(0,${height - 10})`)
            .attr('stroke', option.xAxis[0].axisLine.lineStyle.color)
            .call(d3.axisBottom(xScale));
    // eslint-disable-next-line
    const yAxis = g.append('g').classed('yAxis',true)
            .attr('stroke', option.yAxis[0].axisLine.lineStyle.color)
    		.call(d3.axisLeft(yScale));
}

