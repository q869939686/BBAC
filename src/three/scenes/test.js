import scene from '@/three/scene';  
import * as THREE from 'three';

var geometry = new THREE.BoxBufferGeometry( 1, 1, 1 );
var material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
var cube = new THREE.Mesh( geometry, material );
cube.position.x = 8;
scene.add( cube );