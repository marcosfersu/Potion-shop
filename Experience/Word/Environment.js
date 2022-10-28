import * as THREE from "three";
import Experience from "../Experience";

export default class Environment {
	constructor() {
		this.experience = new Experience();
		this.scene = this.experience.scene;
		this.resources = this.experience.resources;

		this.setSunLight();
	}

	setSunLight() {
		this.sunLight = new THREE.DirectionalLight("#fff", 1.5);
		this.sunLight2 = new THREE.DirectionalLight("#fff", 0.5);
		this.sunLight.castShadow = true;
		this.sunLight2.castShadow = true;
		this.sunLight.shadow.camera.far = 20;
		this.sunLight2.shadow.camera.far = 20;
		this.sunLight.shadow.mapSize.set(2048, 2048);
		this.sunLight2.shadow.mapSize.set(2048, 2048);
		this.sunLight.shadow.normalBias = 0.05;
		this.sunLight2.shadow.normalBias = 0.05;
		//const helper = new THREE.CameraHelper(this.sunLight.shadow.camera);
		//this.scene.add(helper);
		this.sunLight.position.set(-2.5, 7, 3);
		this.sunLight2.position.set(-3, 7, -3);
		this.scene.add(this.sunLight);
		this.scene.add(this.sunLight2);

		this.ambientLight = new THREE.AmbientLight("#fff", 1.2);
		this.scene.add(this.ambientLight);

		this.sphereSize = 1;
		this.pointLightHelper = new THREE.PointLightHelper(
			this.sunLight,
			this.sphereSize
		);
		this.pointLightHelper2 = new THREE.PointLightHelper(
			this.sunLight2,
			this.sphereSize
		);
		this.scene.add(this.pointLightHelper);
		this.scene.add(this.pointLightHelper2);
	}

	resize() {}

	update() {}
}
