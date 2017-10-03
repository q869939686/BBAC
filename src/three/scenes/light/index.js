import AppConfig from '@/AppConfig';
import { PointLight, AmbientLight } from 'three'
import scene from '@/three/scene'
var pointLight = null
var pointLight2 = null
var ambientLight = null
var initLight = function () {
  // 先清空一遍, 估计是热加载不支持scene, 会一直叠加，会变得无比的卡
  if (AppConfig.isDev) {
      scene.children.forEach(function (child) {
          if (child.isLight) {
              scene.remove(child);
          }
      });
  }
  // 点光源
  pointLight = new PointLight( 0xFFFFFF, 1, 200 );
  pointLight.position.set(
    -25.383997199196685,
    18.47368705261472,
    94.71213678587537
  );
  var pointLight2 = new PointLight( 0xFFFFFF, 1, 200 );
  pointLight2.position.set(
    35.383997199196685,
    18.47368705261472,
    -104.71213678587537
  );
  var pointLight3 = new PointLight( 0xFFFFFF, 1, 200 );
  pointLight3.position.set(
    251.654866005172,
    1.1709398268881057,
    10.806994389442064
  );
  
  // 环境光
  ambientLight = new AmbientLight( 0xFFFFFF ); // soft white light
  scene.add(pointLight)
  scene.add(pointLight2)
  scene.add(pointLight3)
  scene.add(ambientLight)

}
initLight()

export {
  pointLight,
  ambientLight,
  pointLight2
}
