import { PointLight, AmbientLight } from 'three'
import scene from '@/three/scene'
var pointLight = null
var pointLight2 = null
var ambientLight = null
var initLight = function () {
  // 点光源
  pointLight = new PointLight( 0xffffff, 1, 200 );
  pointLight.position.set(10, -110, 0);
  var pointLight2 = new PointLight( 0xAAAAAA, 1, 200 );
  pointLight2.position.set(10, 200, 0);
  // 环境光
  ambientLight = new AmbientLight( 0xBBBBBB ); // soft white light
  scene.add(pointLight2)
  scene.add(pointLight2)
  scene.add(ambientLight)

}
initLight()

export {
  pointLight,
  ambientLight,
  pointLight2
}
