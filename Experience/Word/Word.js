import Experience from "../Experience";

import Controls from "./Controls";
import Environment from "./Environment";
import Floor from "./Floor";
import Room from "./Room";

export default class Word {
  constructor() {
    this.experience = new Experience();
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.canvas = this.experience.canvas;
    this.camera = this.experience.camera;
    this.resources = this.experience.resources;
    this.theme = this.experience.theme;

    this.resources.on("ready", () => {
      this.environment = new Environment();
      this.room = new Room();
      this.Controls = new Controls();
      this.floor = new Floor();
    });

    this.theme.on("switch", (theme) => {
      this.switchTheme(theme);
    });
  }

  switchTheme(theme) {
    if (this.environment) {
      this.environment.switchTheme(theme);
    }
  }

  resize() {}

  update() {
    if (this.room) {
      this.room.update();
    }

    if (this.Controls) {
      this.Controls.update();
    }
  }
}
