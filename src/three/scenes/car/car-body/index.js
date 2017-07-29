// redux
import store from '@/store';
import { loadingStatus } from '@/store/actions';

import scene from '@/three/scene';
import camera, { cameraPosition } from '@/three/camera';
import { Group, Vector3 } from 'three';
import {
    jsonLoader
} from '@/three/loaders';
import { domEvents, controls } from '@/three/controls';
import { renderer } from '@/three/renderer';
import { carPart } from '../car-parts';
import transparent from '@/utils/three/material/transparent';
import findMesh from '@/utils/three/mesh/findMesh';
// 异步加载模型
require.ensure([], () => {
    let moduleCar = require('@/static/json/model-car.json');
    loadCompleted(moduleCar)
}, 'moduleCar')

export var carBody = null;
/**
 * 模型加载完成处理
 * @param {Object} carBody model
 * @return {void}
 */
function loadCompleted (moduleCar) {
    // 解析JSON为three的scene;
    carBody = jsonLoader.parse(moduleCar);
    scene.add(carBody);
    // 通知store加载完成
    store.dispatch(loadingStatus(true));
    // 透明的包裹层
    var wrap = null;
    carBody.children.forEach((Mesh) => {
        if (Mesh.name === 'mouseout') {
            wrap = Mesh;
            domEvents.addEventListener(wrap, 'mouseout', function (event) {
                if (event.intersect === undefined) {
                    showTarget(carBody, null, 'out');
                    wrap.material.transparent = true;
                    wrap.material.opacity = 0;
                }
            }, false);
            return false;
        }
        domEvents.addEventListener(Mesh, 'mouseover', function (event) {
            showTarget(carBody, event.target, 'over');
            wrap.material.opacity = 0;
        }, false);
        domEvents.addEventListener(Mesh, 'dblclick', function (ev) {
            carPart.visible = true;
            toCarPart(camera, findMesh(carPart, 'part_wrap'));
            carBody.visible = false;
        }, false);
    });
}
/**
 * 非选中目标透明
 * @param {Group} group not material, must has children
 * @param {Mesh} target 选中目标 when alter='out' target = null
 * @param {string} alter = 'over' | 'out'
 * @return {void}
 */
export function showTarget (group, target, alter) {
    var opacity = alter === 'over'? 0.3 : 1;
    var transparent = alter === 'over'? true : false;
    Array.isArray(group.children) && group.children.forEach(function (Mesh) {
        Mesh.material.transparent = transparent;
        Mesh.material.opacity = opacity;
    });
    if (alter === 'over') {
        target.material.transparent = false;
        target.material.opacity = 1; 
    }
}
/**
 * 设置相机焦点，聚焦到零部件
 * @param {camera} 
 * @param {Mesh} target
 * @param {string}
 */
var toCarPart = function (camera, target, targetName) {
    if (target === null) {
        console.warn('target 不存在');
        return;
    }
    // 移动到零件的位置(动画) TODO position还需研究
    cameraPosition
    .to({
        x: target.position.x,
        y: target.position.y,
        z: target.position.z - 2
    }, 200)
    .start()
    .on('complete', function () {
        controls.target = new Vector3(target.position.x, target.position.y + 1, target.position.z);
        console.log(controls)
        controls.autoRotate = true;
        controls.update();
    });
}
