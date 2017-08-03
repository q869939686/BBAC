// redux
import store from '@/store';
import { changeShowChartStatus } from '@/store/actions';

import scene from '@/three/scene';
// import { Group } from 'three';
import {
    jsonLoader
} from '@/three/loaders';
import { domEvents } from '@/three/controls';
import transparent from '@/utils/three/material/transparent';
// 异步加载模型
require.ensure([], () => {
    let moduleCarPart = require('@/static/json/car-part.json');
    loadCompleted(moduleCarPart)
}, 'moduleCarPart');
// 用来装所有零件
export var carPart = null;

/**
 * 模型加载完成处理
 * @param {Object} car_part model
 * @return {void}
 */
function loadCompleted (moduleCarPart) {
    // 解析JSON为three的scene;
    var partsGroup = jsonLoader.parse(moduleCarPart);
    carPart = partsGroup.children[0];
    carPart.position.z = -10;
    carPart.scale.set(0.04, 0.04, 0.04)
    // 设为透明

    // transparent(carPart, 0);
    carPart.visible = false;
    scene.add(carPart);
    // 通知store加载完成
    // store.dispatch(loadingStatus(true));
    domEvents.addEventListener(carPart, 'click', function (ev) {
        // 非隐藏状态
        if (ev.target.material.opacity !== 0) {
            store.dispatch(changeShowChartStatus(true));
        }
    }, false);
}

var getAllParts = function () {
    return carPart;
}
export default getAllParts;