import Experience from "../Experience";

import Environment from "./Environment";
import Room from "./Room";
import Controls from "./Controls";

export default class Word {
	constructor() {
		this.experience = new Experience();
		this.sizes = this.experience.sizes;
		this.scene = this.experience.scene;
		this.canvas = this.experience.canvas;
		this.camera = this.experience.camera;
		this.resources = this.experience.resources;

		this.resources.on("ready", () => {
			this.environment = new Environment();
			this.room = new Room();
			this.Controls = new Controls();
		});
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
