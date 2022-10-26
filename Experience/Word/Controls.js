import Experience from "../Experience";

export default class Controls {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.time = this.experience.time;

    this.setPath();
  }

  setPath() {}

  resize() {}

  update() {}
}
