import * as THREE from "three";

import assets from "./Utils/assets";
import Resources from "./Utils/Resources";
import Sizes from "./Utils/Sizes";
import Time from "./Utils/Time";

import Camera from "./Camera.js";
import Preloader from "./Preloader";
import Renderer from "./Renderer";

import Theme from "./Theme";

import Controls from "./World/Controls";
import World from "./World/World";

export default class Experience {
  static instance;
  constructor(canvas) {
    if (Experience.instance) {
      return Experience.instance;
    }
    Experience.instance = this;
    this.canvas = canvas;
    this.scene = new THREE.Scene();
    this.time = new Time();
    this.sizes = new Sizes();
    this.camera = new Camera();
    this.renderer = new Renderer();
    this.resources = new Resources(assets);
    this.theme = new Theme();
    this.world = new World();
    this.preloader = new Preloader();

    this.preloader.on("enablecontrols", () => {
      this.controls = new Controls();
    });

    this.sizes.on("resize", () => {
      this.resize();
    });
    this.time.on("update", () => {
      this.update();
    });
  }
  resize() {
    this.camera.resize();
    this.world.resize();
    this.renderer.resize();
  }
  update() {
    this.preloader.update();
    this.camera.update();
    this.world.update();
    this.renderer.update();
    if (this.controls) {
      this.controls.update();
    }
  }
}
