// vuex 得先引用进来才能调
import store from '@/store';
import AppConfig from '@/AppConfig';
// three
import {
    Object3D,
    Vector3,
    Matrix4,
    Mesh,
    BoxBufferGeometry,
    MeshStandardMaterial,
    Cache,
    Color
} from 'three';
import scene from '@/three/scene';
import camera, { cameraPosition } from '@/three/camera';
import { animate, renderer } from '@/three/renderer';
import {
    ObjectLoader,
    JSONloader,
    FBXLoader,
    loadOBJ
} from '@/three/loaders';
import { domEvents, controls } from '@/three/controls';
// model
// import { carPart } from '../car-parts';

// utils
import findMesh from '@/utils/three/mesh/findMesh';

// 异步加载模型

window.axios.get('static/json/car-part/Z1/model.json')
    .then((res) => {
        // model.json只是修复Y轴向↑
        carBody = ObjectLoader.parse(res.data);
        // console.log(carBody)
        // var carBody2 = new Object3D();
        // var matrix = new Matrix4();
        // matrix.set(1,0,0,0,0,0,-1,0,0,1,0,0,0,0,0,1) 
        // carBody2.matrix = matrix;
        // console.log(carBody2)
        // 先清空一遍, 估计是热加载不支持scene, 会一直叠加，会变得无比的卡
        if (AppConfig.isDev) {
            scene.children.forEach(function(child) {
                if (!child.isLight) {
                    scene.remove(child);
                }
            })
        }
        scene.add(carBody);
        // 调整控制中心
        controls.target = new Vector3(carBody.position.x + 61, carBody.position.y, carBody.position.z - 4);
        controls.autoRotate = true;
        controls.update();
        return true;
    }).then(function() {
        Promise.all([
                // // // z1部分
                loaderCarPartPromise('Z1/front-end.js', 'front-end', { id: 'A2136207400' }), // 前端 
                loaderCarPartPromise('Z1/main-floor-board.js', 'main-floor-board', { id: 'A2136100078' }), // 主底板
                loaderCarPartPromise('Z1/rear-end.js', 'rear-end', { id: 'A2136109201' }), // 后端
                loaderCarPartPromise('Z1/L-bottom-strengthen-girder.js', 'L-bottom-strengthen-girder', { id: 'A2136108502' }), // 左 底加强梁
                loaderCarPartPromise('Z1/R-bottom-strengthen-girder.js', 'R-bottom-strengthen-girder', { id: 'A2136108602' }), // 右 底加强梁
                loaderCarPartPromise('Z1/A2136108401.js', 'A2136108401', { id: 'A2136108401' }), // 地板加强板（左
                loaderCarPartPromise('Z1/A2136101410.js', 'A2136101410', { id: 'A2136101410' }), // 地板加强板（右
                // // // z2.1部分
                loaderCarPartPromise('Z2.1/A2136200286.js', 'A2136200286', { id: 'A2136200286' }), // 仪表台横梁
                loaderCarPartPromise('Z2.1/A2136260029.js', 'A2136260029', { id: 'A2136260029' }), // 仪表台小件(左)
                loaderCarPartPromise('Z2.1/A2136260129.js', 'A2136260129', { id: 'A2136260129' }), // 仪表台小件(右)
                loaderCarPartPromise('Z2.1/A2136303901.js', 'A2136303901', { id: 'A2136303901' }), // 侧围内板（左）
                loaderCarPartPromise('Z2.1/A2136304001.js', 'A2136304001', { id: 'A2136304001' }), // 侧围内板（右）
                loaderCarPartPromise('Z2.1/A2136362900.js', 'A2136362900', { id: 'A2136362900' }), // Z2.1小件（左）
                loaderCarPartPromise('Z2.1/A2136363000.js', 'A2136363000', { id: 'A2136363000' }), // Z2.1小件（右）
                loaderCarPartPromise('Z2.1/A2136401800.js', 'A2136401800', { id: 'A2136401800' }), // 后围板

                // // z2.2部分
                loaderCarPartPromise('Z2.2/R-side-wall-planking-assembly.js', 'R-side-wall-planking-assembly', { id: 'A2136303001' }), // 侧围外板总成（右）
                loaderCarPartPromise('Z2.2/L-side-wall-planking-assembly.js', 'L-side-wall-planking-assembly', { id: 'A2136302901' }), // 侧围外板总成（左）
                loaderCarPartPromise('Z2.2/After-cap-table-coaming.js', 'After-cap-table-coaming', { id: 'A2136401100' }), // 后帽台围板
                loaderCarPartPromise('Z2.2/A2136500800.js', 'A2136500800', { id: 'A2136500800' }), // 天窗支架
                // loaderCarPartPromise('Z2.2/other.js', 'other', {}), // 其他
                // // z2.3部分
                loaderCarPartPromise('Z2.3/roof.js', 'roof', { id: 'A2136570700' }, carBody), // 顶盖
                loaderCarPartPromise('Z2.3/After-cap-table.js', 'After-cap-table', { id: 'A2136404100' }), // 后帽台
                // // z3部分
                loaderCarPartPromise('Z3/boot-cover.js', 'boot-cover', { id: 'A2137500900' }), // 行李箱盖
                loaderCarPartPromise('Z3/front-machine-cover.js', 'front-machine-cover', { id: 'A2138800457' }), // 前机盖
                loaderCarPartPromise('Z3/left-sub-board.js', 'left-sub-board', { id: 'A2138800106' }), // 左翼子板
                loaderCarPartPromise('Z3/right-sub-board.js', 'right-sub-board', { id: 'A2138800006' }), // 右翼子板
                loaderCarPartPromise('Z3/LF-car-door.js', 'LF-car-door', { id: 'A2137200105' }), // 左前门
                loaderCarPartPromise('Z3/LR-car-door.js', 'LR-car-door', { id: 'A2137302902' }), // // 左后门
                loaderCarPartPromise('Z3/RF-car-door.js', 'RF-car-door', { id: 'A2137200205' }), // // 右前门
                loaderCarPartPromise('Z3/RR-car-door.js', 'RR-car-door', { id: 'A2137303002' }), // // 右后门

            ])
            // 全部加载完成才进这里
            .then(function(res) {
                store.commit('LOADING_STATUS', true);
                Cache.clear();
                // setColorById('A2137200105', '#CF421D');
                // renderer.render(scene, camera);
                animate();
                window.axios.get('static/json/info.json')
                    .then(function(res) {
                        var data = res.data;
                        var infoData = {};
                        var color = [
                            { color: '#F63A38', value: 0.05 },
                            { color: '#EE7225', value: 0.15 },
                            { color: '#DFDA42', value: 0.25 },
                            { color: '#B7DD4B', value: 0.35 },
                            { color: '#9BE617', value: 0.45 },
                        ];
                        data.forEach(function(item) {
                            if (infoData[item[4]] === undefined) {
                                infoData[item[4]] = {
                                    value: item[8] * 100
                                }
                            } else {
                                infoData[item[4]] = {
                                    value: item[8] + infoData[item[4]].value * 100
                                }
                            }
                        });

                        for (var id in infoData) {
                            var item = infoData[id];
                            var color = null;
                            if (item.value < 0.05) {
                                color = '#F63A38';
                            } else if (item.value < 0.15) {
                                color = '#EE7225';
                            } else if (item.value < 0.25) {
                                color = '#DFDA42';
                            } else if (item.value < 0.35) {
                                color = '#B7DD4B'
                            } else if (item.value > 0.35) {
                                color = '#9BE617'
                            }
                            setColorById(id, color, item.value)
                        }
                    })
            })

    })


// 整车车身    
export var carBody = null;

/**
 * 加载模型
 * @param {String} url 
 * @param {String}
 * @param {Object} userData
 * @param {THREE.Scene | THREE.Mesh} scene |  carBody
 */
function loaderCarPartPromise(url, name, userData, parent) {
    var res = /\.[a-z]+$/.exec(url); // 目前只匹配json和js格式
    var type = res !== null ? res[0] : null;
    return window.axios.get('static/json/car-part/' + url)
        .then((res) => {
            if (type && type === '.js') {
                var data = JSONloader.parse(res.data);
                // 去色
                loseColor(data.materials);
                var parts = new Mesh(data.geometry, data.materials);
                parts.name = name; // 加name
                parts.userData = userData; // 加自定义数据
                scene.add(parts);
            } else if (type && type === '.json') {
                var parts = ObjectLoader.parse(res.data);
                parts.name = name; // 加name
                parts.userData = userData; // 加自定义数据
                // 去色
                deepLoseColor(parts);
                // 某些文件(json)得包一层，为了转换Y轴
                if (parent !== undefined) {
                    parent.add(parts)
                    scene.add(parent);
                } else {
                    scene.add(parts);
                }
            }

            var index = 0;
            // add Event
            domEvents.addEventListener(parts, 'dblclick', function(ev) {
                var target = ev.target;
                var isToPart = store.getters.isToPart;
                // 看局部部件
                if (!isToPart) {
                    scene.children.forEach(function(child) {
                        if (child.name !== target.name && !child.isLight) {
                            child.visible = false;
                        }
                    })
                    var pointCenter = findMesh(target, 'poin-center');
                    store.commit('TO_PART', true);
                    store.commit('CAR_PARTS_INFO', {
                        id: target.userData.id,
                        name: target.name,
                        ok: target.userData.ok
                    });
                    if (pointCenter) {
                        toCarPart(target, 42);
                        // store.commit('TO_PART', true);
                    }
                } else {
                    // 局部状态下，发生点击事件
                    // 模拟数据变化
                    var data = [
                        [20, 30, 40, 50, 30, 10],
                        [120, 230, 40, 50, 30, 10],
                        [20, 30, 40, 50, 30, 10],
                        [20, 34, 40, 34, 30, 10],
                        [120, 230, 40, 43, 30, 10]
                    ]
                    var data2 = [
                            [120, 30, 40, 13, 44, 23],
                            [30, 130, 40, 63, 12, 64],
                            [53, 130, 70, 13, 34, 3],
                            [22, 30, 40, 34, 72, 34],
                            [120, 120, 40, 50, 23, 54]
                        ]
                        // 我再这里调用了， 并用两个数据模拟
                    setTimeout(function() {
                        store.commit('GET_CHART_DATA', (index % 2 === 0) ? data : data2)
                    }, 3000)
                    index++;
                }
            }, false);
            return parts;
        })
        .then(function(parts) {
            // 加载点
            // window.axios.get('static/json/car-part/Z3/point/LF-car-door-point.json')
            // .then((res) => {
            //     addPointEvent(ObjectLoader, parentParts, res)
            // })
        })
}
/**
 * 去颜色
 * @param {Material} Material
 * @param {?Color} 默认0x9898B9
 */
var loseColor = function(materials, color) {
        var color = new Color(color || 0x9898B9);

        if (Array.isArray(materials)) {
            materials.forEach(function(material) {
                material.color = color;
            })
        } else {
            materials.color = color;
        }
    }
    /**
     * 递归去色
     * @param {Object3D} Object3D
     * @param {?Color}
     */
var deepLoseColor = function(Object3D, Color) {
        if (Object3D.material) {
            loseColor(Object3D.material);
        }
        if (Object3D.children.length > 0) {
            Object3D.children.forEach(function(child) {
                deepLoseColor(child, Color);
            })
        }
    }
    /**
     * 非选中目标透明
     * @param {Group} group not material, must has children
     * @param {Mesh} target 选中目标 when alter='out' target = null
     * @param {string} alter = 'over' | 'out'
     * @return {void}
     */
export function showTarget(group, target, alter) {
    var opacity = alter === 'over' ? 0.3 : 1;
    var transparent = alter === 'over' ? true : false;
    // 设置透明
    Array.isArray(group.children) && group.children.forEach(function(Mesh) {
        Mesh.material.transparent = transparent;
        Mesh.material.opacity = opacity;
    });
    // target不透明
    if (alter === 'over') {
        target.material.transparent = false;
        target.material.opacity = 1;
    }
}
/**
 * 设置相机焦点，聚焦到零部件
 * @param {Mesh} target
 * @param {Number} z轴
 */
export var toCarPart = function(target, z = 0) {
    if (target === null || target === undefined) {
        console.warn('target 不存在');
        return;
    }
    // 移动到零件的位置(动画) TODO position还需研究
    cameraPosition
        .to({
            x: target.position.x,
            y: target.position.y,
            z: target.position.z - z
        }, 200)
        .start()
        .once('complete', function() {
            controls.target = new Vector3(target.position.x, target.position.y + 1, target.position.z);
            controls.autoRotate = true;
            controls.update();
        });
}

/**
 * 给焊点加事件
 * @param {ObjectLoader | JSONLoader} loader 
 * @param {Mesh | Object3d} parentParts 
 * @param {Object} response,
 * @param {String} 焊点类型
 * @return {void}
 */
var addPointEvent = function(loader, parentParts, res, type) {
    var parts = loader.parse(res.data);
    // var mesh = new Mesh(parts.geometry, parts.materials);
    parentParts.add(parts);
    // 给所有点加事件
    var index = 0;
    parts.children.forEach(function(point) {
        domEvents.addEventListener(point, 'click', function(ev) {
            // 通知store 现在的状态是到零件了，页面会做出相关响应(暂时是展示back home小图标)
            // store.dispatch(changeToPartStatus(true))
            var target = ev.target;
            var isToPart = store.getters.isToPart;
            if (isToPart) {
                // 模拟数据变化
                var data = [
                    { month: 'Q1-2016', apples: 3840, bananas: 1920, cherries: -1960, dates: -400 },
                    { month: 'Q2-2016', apples: 1600, bananas: 1440, cherries: -960, dates: -400 },
                    { month: 'Q3-2016', apples: 640, bananas: 960, cherries: -640, dates: -600 },
                    { month: 'Q4-2016', apples: 320, bananas: 480, cherries: -640, dates: -400 }
                ]
                var data2 = [
                        { month: 'Q1-2016', apples: 1232, bananas: 2324, cherries: -260, dates: -343 },
                        { month: 'Q2-2016', apples: 343, bananas: 3444, cherries: -134, dates: -400 },
                        { month: 'Q3-2016', apples: 1324, bananas: 343, cherries: -640, dates: -434 },
                        { month: 'Q4-2016', apples: 2, bananas: 545, cherries: -640, dates: -43 }
                    ]
                    // 我再这里调用了， 并用两个数据模拟
                store.commit('GET_CHART_DATA', (index % 2 === 0) ? data : data2)
                index++;
            }
        }, false);
    })
}

/**
 * 通过id设置颜色 id in userData
 * @param {String} id 
 * @param {Color} color
 * @param {String} ok值 
 */
export var setColorById = function(id, color, value) {
    scene.children.some(function(child) {
        if (child.userData.id === id) {
            console.log(child.userData.id, value)
            child.userData.ok = value;
            loseColor(child.material, color);
            return true;
        }
        return false;
    })
}