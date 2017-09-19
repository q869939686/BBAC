// redux
// import store from '@/store';
// import { changeShowChartStatus, getChartData } from '@/store/actions';
// import { GET } from '@/plugins/fetch/';
import AppConfig from '@/AppConfig';

import scene from '@/three/scene';
import { Group } from 'three';
import {
    jsonLoader
} from '@/three/loaders';
import { domEvents } from '@/three/controls';
import transparent from '@/utils/three/material/transparent';
// 异步加载模型
// import(/* webpackChunkName: 'car-part' */ '@/static/json/car-part/A2056300403/A2056300403.json')
//     .then(function (moduleCarPart) {
//         console.log(moduleCarPart)
//         // loadCompleted(moduleCarPart);
//     })
// GET('/src/static/json/car-part/A2056300303/A2056300303.json')
//     .then(function(moduleCarPart) {
//         // loadCompleted(moduleCarPart);
//     });

// GET('/src/static/json/car-part/A2056300403/A2056300403.json')
//     .then(function(moduleCarPart) {
//         // loadCompleted(moduleCarPart);
//     });
// GET('/src/static/json/data.json')
//     .then(function(moduleCarPart) {
//         // loadCompleted(moduleCarPart);
//     });
// 用来装所有零件

export var carPart = new Group();;

/**
 * 模型加载完成处理
 * @param {Object} car_part model
 * @return {void}
 */
function loadCompleted(moduleCarPart) {
    // 解析JSON为three的scene;
    carPart.add(jsonLoader.parse(moduleCarPart));
    carPart.position.z = -10;
    carPart.scale.set(0.04, 0.04, 0.04)
        // 设为透明

    // transparent(carPart, 0);
    carPart.visible = false;
    scene.add(carPart);
    // 通知store加载完成

    domEvents.addEventListener(carPart, 'click', function(ev) {
        // 非隐藏状态
        if (ev.target.material.opacity !== 0) {
            store.dispatch(changeShowChartStatus(true));
            store.dispatch(getChartData());
        }
    }, false);
}

var getAllParts = function() {
    return carPart;
}
export default getAllParts;