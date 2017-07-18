import scene from '@/three/scene';  
import * as THREE from 'three';
import OrbitControls from 'three-orbitcontrols';
import { renderer } from '@/three/renderer';
var geometry = new THREE.BoxBufferGeometry( 1, 1, 1 );
var material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
var cube = new THREE.Mesh( geometry, material );
cube.position.y = 1;
scene.add( cube );
