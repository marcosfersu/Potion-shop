import { EventEmitter } from "events";
import Experience from "./Experience.js";
import GSAP from "gsap";

export default class Preloader extends EventEmitter {
	constructor() {
		super();
		this.experience = new Experience();
		this.scene = this.experience.scene;
		this.sizes = this.experience.sizes;
		this.resources = this.experience.resources;
		this.camera = this.experience.camera;
		this.world = this.experience.world;
		this.device = this.sizes.device;

		this.sizes.on("switchdevice", device => {
			this.device = device;
		});

		this.world.on("worldready", () => {
			this.setAssets();
			this.playIntro();
		});
	}

	setAssets() {
		this.room = this.experience.world.room.actualRoom;
		this.roomChildren = this.experience.world.room.roomChildren;
	}

	firstIntro() {
		return new Promise(resolve => {
			this.timeline = new GSAP.timeline();
			if (this.device === "desktop") {
				this.timeline
					.to(this.roomChildren.potionpress.scale, {
						x: 1.4,
						y: 1.4,
						z: 1.4,
						ease: "back.out(2.5)",
						duration: 0.7,
					})
					.to(this.room.position, {
						x: -1,
						ease: "power1.out",
						duration: 0.7,
						onComplete: resolve,
					});
			} else {
				this.timeline
					.to(this.roomChildren.potionpress.scale, {
						x: 1.4,
						y: 1.4,
						z: 1.4,
						ease: "back.out(2.5)",
						duration: 0.7,
					})
					.to(this.room.position, {
						z: -1,
						ease: "power1.out",
						duration: 0.7,
						onComplete: resolve,
					});
			}
		});
	}

	secondIntro() {
		return new Promise(resolve => {
			this.secondTimeline = new GSAP.timeline();
			this.secondTimeline
				.to(this.room.position, {
					x: 0,
					y: 0,
					z: 0,
					ease: "power1.out",
					duration: 0.7,
				})
				.to(
					this.roomChildren.potionpress.scale,
					{
						x: 0,
						y: 0,
						z: 0,
						ease: "power1.out",
						duration: 0.5,
					},
					"same"
				)
				.to(
					this.roomChildren.cuberoom.scale,
					{
						x: 1,
						y: 1,
						z: 1,
						ease: "power1.out",
						duration: 0.7,
					},
					"same"
				)
				.to(
					this.roomChildren.cuberoom.rotation,
					{
						y: 2 * Math.PI + -0.7833147388095416,
						ease: "power1.out",
						duration: 0.7,
					},
					"same"
				)
				.set(this.roomChildren.room.scale, {
					x: 1,
					y: 1,
					z: 1,
				})
				.to(this.roomChildren.cuberoom.scale, {
					x: 0,
					y: 0,
					z: 0,
					ease: "power1.out",
					duration: 0.5,
				})
				.to(
					this.roomChildren.library001.scale,
					{
						x: 1,
						y: 1,
						z: 1,
						ease: "back.out(2.5)",
						duration: 0.5,
					},
					"library"
				)
				.to(
					this.roomChildren.library.scale,
					{
						x: 1,
						y: 1,
						z: 1,
						ease: "back.out(2.5)",
						duration: 0.5,
						delay: 0.2,
					},
					"library"
				)
				.to(
					this.roomChildren.table.scale,
					{
						x: 1,
						y: 1,
						z: 1,
						ease: "back.out(2.5)",
						duration: 0.4,
					},
					"table"
				)
				.to(
					this.roomChildren.lvy.scale,
					{
						x: 1,
						y: 1,
						z: 1,
						duration: 0.4,
					},
					"table"
				)
				.to(
					this.roomChildren.shelves.scale,
					{
						x: 1,
						y: 1,
						z: 1,
						ease: "power1.out",
						duration: 0.3,
					},
					"shelves"
				)
				.to(
					this.roomChildren.shelves001.scale,
					{
						x: 1,
						y: 1,
						z: 1,
						ease: "power1.out",
						duration: 0.3,
						delay: 0.1,
					},
					"shelves"
				)
				.to(
					this.roomChildren.shelves002.scale,
					{
						x: 1,
						y: 1,
						z: 1,
						ease: "power1.out",
						duration: 0.3,
						delay: 0.1,
					},
					"shelves"
				)
				.to(this.roomChildren.book017.scale, {
					x: 1,
					y: 1,
					z: 1,
					ease: "power1.out",
					duration: 0.2,
				})
				.to(this.roomChildren.botle011.scale, {
					x: 1,
					y: 1,
					z: 1,
					ease: "power1.out",
					duration: 0.2,
				});
		});
	}

	onScroll(e) {
		if (e.deltaY > 0) {
			this.removeEventListeners();
			this.playSecondIntro();
		}
	}

	onTouch(e) {
		this.initalY = e.touches[0].clientY;
	}

	onTouchMove(e) {
		let currentY = e.touches[0].clientY;
		let difference = this.initalY - currentY;
		if (difference > 0) {
			console.log("swipped up");
			this.removeEventListeners();
			this.playSecondIntro();
		}
		this.intialY = null;
	}

	removeEventListeners() {
		window.removeEventListener("wheel", this.scrollOnceEvent);
		window.removeEventListener("touchstart", this.touchStart);
		window.removeEventListener("touchmove", this.touchMove);
	}

	async playIntro() {
		this.emit("playanimation");
		await this.firstIntro();
		this.scrollOnceEvent = this.onScroll.bind(this);
		this.touchStart = this.onTouch.bind(this);
		this.touchMove = this.onTouchMove.bind(this);
		window.addEventListener("wheel", this.scrollOnceEvent);
		window.addEventListener("touchstart", this.touchStart);
		window.addEventListener("touchmove", this.touchMove);
	}

	async playSecondIntro() {
		await this.secondIntro();
	}
}
