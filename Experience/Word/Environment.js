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
    this.sunLight.castShadow = true;
    this.sunLight.shadow.camera.far = 20;
    this.sunLight.shadow.mapSize.set(2048, 2048);
    this.sunLight.shadow.normalBias = 0.05;
    this.sunLight.position.set(2, 1.4, 1);
    this.scene.add(this.sunLight);

    this.ambientLight = new THREE.AmbientLight("#fff", 1);
    this.scene.add(this.ambientLight);

    this.sphereSize = 1;
    this.pointLightHelper = new THREE.PointLightHelper(
      this.sunLight,
      this.sphereSize
    );
    //this.scene.add(this.pointLightHelper);
  }

  resize() {}

  update() {}
}
