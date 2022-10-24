import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import Experience from "./Experience";

export default class Camera {
	constructor() {
		this.experience = new Experience();
		this.sizes = this.experience.sizes;
		this.scene = this.experience.scene;
		this.canvas = this.experience.canvas;

		this.createPerspectiveCamera();
		this.createOrthographicCamera();
		this.setOrbitControls();
	}

	createPerspectiveCamera() {
		this.perspectiveCamera = new THREE.PerspectiveCamera(
			35,
			this.sizes.aspect,
			0.1,
			1000
		);
		this.scene.add(this.perspectiveCamera);
		this.perspectiveCamera.position.z = 5;
	}
	createOrthographicCamera() {
		this.orthographicCamera = new THREE.OrthographicCamera(
			(-this.sizes.aspect * this.sizes.frustrum) / 2,
			(this.sizes.aspect * this.sizes.frustrum) / 2,
			this.sizes.frustrum / 2,
			-this.sizes.frustrum / 2,
			-50,
			50
		);
		this.scene.add(this.orthographicCamera);

		const size = 10;
		const divisions = 10;

		const gridHelper = new THREE.GridHelper(size, divisions);
		this.scene.add(gridHelper);

		const axesHelper = new THREE.AxesHelper(10);
		this.scene.add(axesHelper);
	}

	setOrbitControls() {
		this.controls = new OrbitControls(this.perspectiveCamera, this.canvas);
		this.controls.enableDamping = true;
		this.controls.enableZoom = true;
	}

	resize() {
		// updation Perspective Camra on Resize
		this.perspectiveCamera.aspect = this.sizes.aspect;
		this.perspectiveCamera.updateProjectionMatrix();

		// updation Orthographic Camra on Resize
		this.orthographicCamera.left =
			(-this.sizes.aspect * this.sizes.frustrum) / 2;
		this.orthographicCamera.right =
			(this.sizes.aspect * this.sizes.frustrum) / 2;
		this.orthographicCamera.top = this.seizes.frustrum / 2;
		this.orthographicCamera.bottom = this.seizes.frustrum / 2;
		this.orthographicCamera.updateProjectionMatrix();
	}

	update() {
		this.controls.update();
	}
}
