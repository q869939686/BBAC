
import * as actionTypes from './actionTypes';
import { Action } from '@/types';
// import AppConfig from '@/AppConfig';

/**
 * 是否加载模型完成
 * @param payload 
 */
export const changeLoadingStatus: Function = function (payload: boolean): Action {
  return {
    type: actionTypes.LOADING_STATUS,
    payload: payload
  }
}

/**
 * 改变 是否聚焦在详细零部件上
 * @param payload 
 */
export const changeToPartStatus: Function = function (payload: boolean): Action {
  return {
    type: actionTypes.TO_PART,
    payload: payload
  }
}
/**
 * 改变 展示图表状态(点击零件的时候展示图表)
 * @param payload 
 */
export const changeShowChartStatus: Function = function (payload: boolean): Action {
  return {
    type: actionTypes.SHOW_CHART,
    payload: payload
  }
}

/**
 * 获取图表数据(异步)
 * @param payload 
 */
export const getChartData: Function = function (): Function {
  return function (dispatch: Function): void {
    var option = {
        xAxis : [
            {
                data : ['2000', '2001', '2002', '2003', '2004', '2005', '2006'],
            }
        ],
        series : [
            {
                name: '直接访问',
                type: 'bar',
                stack: '总量',
                label: {
                    normal: {
                        show: true,
                        position: 'insideRight'
                    }
                },
                data: [320, 302, 301, 334, 390, 330, 320]
            },
            {
                name: '邮件营销',
                type: 'bar',
                stack: '总量',
                label: {
                    normal: {
                        show: true,
                        position: 'insideRight'
                    }
                },
                data: [120, 132, 101, 134, 90, 230, 210]
            },
            {
                name: '联盟广告',
                type: 'bar',
                stack: '总量',
                label: {
                    normal: {
                        show: true,
                        position: 'insideRight'
                    }
                },
                data: [220, 182, 191, 234, 290, 330, 310]
            },
            {
                name: '视频广告',
                type: 'bar',
                stack: '总量',
                label: {
                    normal: {
                        show: true,
                        position: 'insideRight'
                    }
                },
                data: [150, 212, 201, 154, 190, 330, 410]
            },
            {
                name: '搜索引擎',
                type: 'bar',
                stack: '总量',
                label: {
                    normal: {
                        show: true,
                        position: 'insideRight'
                    }
                },
                data: [820, 832, 901, 934, 1290, 1330, 1320]
            }
        ]
    }
    
    setTimeout(
        function () {
            dispatch({
                type: actionTypes.GET_CHART_DATA,
                payload: option
            })
        },
        1000
    );
  }
}

// 异步action写法
// export const getListData: Function = function (payload: any): any  {
//   return function (dispatch: Function) {
//       fetch('/', {

//       }).then(() => {
//         dispatch({
//             type: actionTypes.SHOW_CHART,
//             payload: payload
//         });
//       })
//   }
// }