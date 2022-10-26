import * as THREE from "three";

import assets from "./Utils/assets";
import Resources from "./Utils/Resources";
import Sizes from "./Utils/Sizes";
import Time from "./Utils/Time";

import Camera from "./Camera.js";
import Renderer from "./Renderer";

import Word from "./Word/Word";

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
    this.word = new Word();

    this.sizes.on("resize", () => {
      this.update();
    });
    this.time.on("update", () => {
      this.update();
    });
  }
  resize() {
    this.camera.resize();
    this.word.resize();
    this.renderer.resize();
  }
  update() {
    this.camera.update();
    this.word.update();
    this.renderer.update();
  }
}
