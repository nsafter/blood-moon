import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "/node_modules/three/examples/jsm/controls/OrbitControls";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

// camera.position.set(10, 100, 100);

renderer.render(scene, camera);

const controls = new OrbitControls(camera, renderer.domElement);
const object = new THREE.Object3D();

const moonTexture = new THREE.TextureLoader().load("moon.jpg");

const geo = new THREE.SphereGeometry(15, 30, 30);
const mat = new THREE.MeshStandardMaterial({
  color: 0xfe8957,
  // wireframe: true,
  map: moonTexture,
});

const backgroundScene = new THREE.TextureLoader().load("space.jpg");
scene.background = backgroundScene;

const sphere = new THREE.Mesh(geo, mat);
object.add(sphere);
scene.add(object);

const ambientlight = new THREE.AmbientLight(0x46070700);
scene.add(ambientlight);

const pointlight = new THREE.PointLight(0xfa71c1c);
const directionlight = new THREE.DirectionalLight(0xa71c1c);
directionlight.position.set(10, 0, 10);
scene.add(directionlight);

// const gridhelper = new THREE.GridHelper(200, 50);
// scene.add(gridhelper);

// const spotlight = new THREE.SpotLight(0xffffff, 0.01, 10, 45);
// spotlight.position.set(10, 10, 10);
// scene.add(spotlight);

// const ambientlight = new THREE.AmbientLight(0xffffff);
pointlight.position.set(10, 10, 10);
pointlight.position.y = 20;
pointlight.position.z = 30;
scene.add(pointlight);

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  camera.position.x += 0.05;
  camera.position.z -= 0.02;
  pointlight.rotation.z += 0.015;
  directionlight.rotation.z += 0.015;
  sphere.rotateY(0.011);
  // directionlight.position.x -= 0.05;
  // directionlight.position.y += 0.01;
  // directionlight.position.z -= 0.05;
  controls.update();
}

animate();
