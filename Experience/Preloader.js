import { EventEmitter } from "events";
import GSAP from "gsap";
import Experience from "./Experience.js";
import convert from "./Utils/convertDivstoSpan.js";

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
		convert(document.querySelector(".intro-text"));
		convert(document.querySelector(".hero-main-title"));
		convert(document.querySelector(".hero-main-description"));
		convert(document.querySelector(".hero-second-subheading"));
		convert(document.querySelector(".second-sub"));
		this.room = this.experience.world.room.actualRoom;
		this.roomChildren = this.experience.world.room.roomChildren;
		console.log(this.roomChildren);
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
						x: -0.8,
						ease: "power1.out",
						duration: 0.7,
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
					});
			}
			this.timeline.to(".intro-text .animatedis", {
				yPercent: -100,
				stagger: 0.06,
				ease: "back.out(1.2)",
				onComplete: resolve,
			});
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
					duration: 0.6,
				})
				.to(
					this.roomChildren.library001.scale,
					{
						x: 1,
						y: 1,
						z: 1,
						ease: "back.out(2.5)",
						duration: 0.3,
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
						duration: 0.3,
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
						duration: 0.3,
					},
					"table"
				)
				.to(
					this.roomChildren.lvy.scale,
					{
						x: 1,
						y: 1,
						z: 1,
						duration: 0.3,
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
				.to(
					this.roomChildren.frask009.scale,
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
					this.roomChildren["small-shelves"].scale,
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
					this.roomChildren.botle008.scale,
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
					this.roomChildren.book011.scale,
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
					this.roomChildren.frask008.scale,
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
				.to(
					this.roomChildren.botle012.scale,
					{
						x: 1,
						y: 1,
						z: 1,
						ease: "power1.out",
						duration: 0.2,
					},
					"bookSame2"
				)
				.to(
					this.roomChildren.frask007.scale,
					{
						x: 1,
						y: 1,
						z: 1,
						ease: "power1.out",
						duration: 0.2,
					},
					"bookSame2"
				)
				.to(
					this.roomChildren.book003.scale,
					{
						x: 1,
						y: 1,
						z: 1,
						ease: "power1.out",
						duration: 0.2,
					},
					"bookSame2"
				)
				.to(
					this.roomChildren.botle.scale,
					{
						x: 1,
						y: 1,
						z: 1,
						ease: "power1.out",
						duration: 0.2,
					},
					"bookSame2"
				)
				.to(
					this.roomChildren.botle005.scale,
					{
						x: 1,
						y: 1,
						z: 1,
						ease: "power1.out",
						duration: 0.2,
					},
					"bookSame2"
				)
				.to(
					this.roomChildren["chest"].scale,
					{
						x: 1,
						y: 1,
						z: 1,
						ease: "power1.out",
						duration: 0.2,
					},
					"bookSame2"
				)
				.to(
					this.roomChildren.botle011.scale,
					{
						x: 1,
						y: 1,
						z: 1,
						ease: "power1.out",
						duration: 0.2,
					},
					"bookSame2"
				)
				.to(
					this.roomChildren.piple.scale,
					{
						x: 1,
						y: 1,
						z: 1,
						ease: "power1.out",
						duration: 0.2,
					},
					"bookSame2"
				)
				.to(
					this.roomChildren.frask005.scale,
					{
						x: 1,
						y: 1,
						z: 1,
						ease: "power1.out",
						duration: 0.2,
					},
					"bookSame2"
				)
				.to(
					this.roomChildren.barril.scale,
					{
						x: 1,
						y: 1,
						z: 1,
						ease: "power1.out",
						duration: 0.2,
					},
					"bookSame2"
				)
				.to(
					this.roomChildren.book009.scale,
					{
						x: 1,
						y: 1,
						z: 1,
						ease: "power1.out",
						duration: 0.2,
					},
					"bookSame2"
				)
				.to(
					this.roomChildren.botle004.scale,
					{
						x: 1,
						y: 1,
						z: 1,
						ease: "power1.out",
						duration: 0.2,
					},
					"bookSame"
				)
				.to(
					this.roomChildren.botle013.scale,
					{
						x: 1,
						y: 1,
						z: 1,
						ease: "power1.out",
						duration: 0.2,
					},
					"bookSame"
				)
				.to(
					this.roomChildren.book004.scale,
					{
						x: 1,
						y: 1,
						z: 1,
						ease: "power1.out",
						duration: 0.2,
					},
					"bookSame"
				)
				.to(
					this.roomChildren.book014.scale,
					{
						x: 1,
						y: 1,
						z: 1,
						ease: "power1.out",
						duration: 0.2,
					},
					"bookSame"
				)
				.to(
					this.roomChildren["chest-top"].scale,
					{
						x: 1,
						y: 1,
						z: 1,
						ease: "power1.out",
						duration: 0.2,
					},
					"bookSame"
				)
				.to(
					this.roomChildren.book016.scale,
					{
						x: 1,
						y: 1,
						z: 1,
						ease: "power1.out",
						duration: 0.2,
					},
					"bookSame"
				)
				.to(
					this.roomChildren.book013.scale,
					{
						x: 1,
						y: 1,
						z: 1,
						ease: "power1.out",
						duration: 0.2,
					},
					"bookSame"
				)
				.to(
					this.roomChildren.frask006.scale,
					{
						x: 1,
						y: 1,
						z: 1,
						ease: "power1.out",
						duration: 0.2,
					},
					"bookSame"
				)
				.to(
					this.roomChildren.book002.scale,
					{
						x: 1,
						y: 1,
						z: 1,
						ease: "power1.out",
						duration: 0.2,
					},
					"bookSame"
				)
				.to(
					this.roomChildren.plant.scale,
					{
						x: 1,
						y: 1,
						z: 1,
						ease: "power1.out",
						duration: 0.2,
					},
					"bookSame"
				)
				.to(
					this.roomChildren.book001.scale,
					{
						x: 1,
						y: 1,
						z: 1,
						ease: "power1.out",
						duration: 0.2,
					},
					"bookSame"
				)
				.to(
					this.roomChildren.botle010.scale,
					{
						x: 1,
						y: 1,
						z: 1,
						ease: "power1.out",
						duration: 0.2,
					},
					"bookSame"
				)
				.to(
					this.roomChildren.botle009.scale,
					{
						x: 1,
						y: 1,
						z: 1,
						ease: "power1.out",
						duration: 0.2,
					},
					"bookSame"
				)
				.to(
					this.roomChildren.botle007.scale,
					{
						x: 1,
						y: 1,
						z: 1,
						ease: "power1.out",
						duration: 0.2,
					},
					"bookSame"
				)
				.to(
					this.roomChildren.planes.scale,
					{
						x: 1,
						y: 1,
						z: 1,
						ease: "power1.out",
						duration: 0.2,
					},
					"bookSame"
				)
				.to(
					this.roomChildren.book018.scale,
					{
						x: 1,
						y: 1,
						z: 1,
						ease: "power1.out",
						duration: 0.2,
					},
					"bookSame"
				)
				.to(
					this.roomChildren.frask004.scale,
					{
						x: 1,
						y: 1,
						z: 1,
						ease: "power1.out",
						duration: 0.2,
					},
					"bookSame"
				)
				.to(
					this.roomChildren.book007.scale,
					{
						x: 1,
						y: 1,
						z: 1,
						ease: "power1.out",
						duration: 0.2,
					},
					"bookSame"
				)
				.to(
					this.roomChildren.botle003.scale,
					{
						x: 1,
						y: 1,
						z: 1,
						ease: "power1.out",
						duration: 0.2,
					},
					"bookSame"
				)
				.to(
					this.roomChildren["spider-web"].scale,
					{
						x: 1,
						y: 1,
						z: 1,
						ease: "power1.out",
						duration: 0.2,
					},
					"bookSame"
				)
				.to(this.roomChildren.book019.scale, {
					x: 1,
					y: 1,
					z: 1,
					ease: "power1.out",
					duration: 0.2,
				})
				.to(
					this.roomChildren.book012.scale,
					{
						x: 1,
						y: 1,
						z: 1,
						ease: "power1.out",
						duration: 0.2,
					},
					"bookSame1"
				)
				.to(
					this.roomChildren.botle001.scale,
					{
						x: 1,
						y: 1,
						z: 1,
						ease: "power1.out",
						duration: 0.2,
					},
					"bookSame1"
				)
				.to(
					this.roomChildren.frask001.scale,
					{
						x: 1,
						y: 1,
						z: 1,
						ease: "power1.out",
						duration: 0.2,
					},
					"bookSame1"
				)
				.to(
					this.roomChildren.book008.scale,
					{
						x: 1,
						y: 1,
						z: 1,
						ease: "power1.out",
						duration: 0.2,
					},
					"bookSame1"
				)
				.to(
					this.roomChildren.frask.scale,
					{
						x: 1,
						y: 1,
						z: 1,
						ease: "power1.out",
						duration: 0.2,
					},
					"bookSame1"
				)
				.to(
					this.roomChildren.knife.scale,
					{
						x: 1,
						y: 1,
						z: 1,
						ease: "power1.out",
						duration: 0.2,
					},
					"bookSame1"
				)
				.to(
					this.roomChildren.mortar.scale,
					{
						x: 1,
						y: 1,
						z: 1,
						ease: "power1.out",
						duration: 0.2,
					},
					"bookSame1"
				)
				.to(
					this.roomChildren.carpet.scale,
					{
						x: 1,
						y: 1,
						z: 1,
						ease: "power1.out",
						duration: 0.2,
					},
					"bookSame1"
				)
				.to(
					this.roomChildren.book010.scale,
					{
						x: 1,
						y: 1,
						z: 1,
						ease: "power1.out",
						duration: 0.2,
					},
					"bookSame1"
				)
				.to(
					this.roomChildren.planes001.scale,
					{
						x: 1,
						y: 1,
						z: 1,
						ease: "power1.out",
						duration: 0.2,
					},
					"bookSame1"
				)
				.to(
					this.roomChildren["chest-keep"].scale,
					{
						x: 1,
						y: 1,
						z: 1,
						ease: "power1.out",
						duration: 0.2,
					},
					"bookSame1"
				)
				.to(
					this.roomChildren.botle014.scale,
					{
						x: 1,
						y: 1,
						z: 1,
						ease: "power1.out",
						duration: 0.2,
					},
					"bookSame1"
				)
				.to(
					this.roomChildren.book015.scale,
					{
						x: 1,
						y: 1,
						z: 1,
						ease: "power1.out",
						duration: 0.2,
					},
					"bookSame1"
				)
				.to(
					this.roomChildren.book005.scale,
					{
						x: 1,
						y: 1,
						z: 1,
						ease: "power1.out",
						duration: 0.2,
					},
					"bookSame1"
				)
				.to(
					this.roomChildren.botle006.scale,
					{
						x: 1,
						y: 1,
						z: 1,
						ease: "power1.out",
						duration: 0.2,
					},
					"bookSame1"
				)
				.to(
					this.roomChildren.frask003.scale,
					{
						x: 1,
						y: 1,
						z: 1,
						ease: "power1.out",
						duration: 0.2,
					},
					"bookSame1"
				)
				.to(
					this.roomChildren.bowl.scale,
					{
						x: 1,
						y: 1,
						z: 1,
						ease: "power1.out",
						duration: 0.2,
					},
					"bookSame1"
				)
				.to(
					this.roomChildren.book.scale,
					{
						x: 1,
						y: 1,
						z: 1,
						ease: "power1.out",
						duration: 0.2,
					},
					"bookSame2"
				)
				.to(
					this.roomChildren.book006.scale,
					{
						x: 1,
						y: 1,
						z: 1,
						ease: "power1.out",
						duration: 0.2,
					},
					"bookSame2"
				)
				.to(
					this.roomChildren.botle002.scale,
					{
						x: 1,
						y: 1,
						z: 1,
						ease: "power1.out",
						duration: 0.2,
					},
					"bookSame2"
				)
				.to(
					this.roomChildren.frask002.scale,
					{
						x: 1,
						y: 1,
						z: 1,
						ease: "back.out(2.5)",
						duration: 0.4,
					},
					"bookSame3"
				)
				.to(
					this.roomChildren.plant001.scale,
					{
						x: 1,
						y: 1,
						z: 1,
						ease: "back.out(2.5)",
						duration: 0.4,
					},
					"bookSame3"
				)
				.to(
					this.roomChildren.skull.scale,
					{
						x: 1,
						y: 1,
						z: 1,
						ease: "back.out(2.5)",
						duration: 0.4,
					},
					"bookSame3"
				)
				.to(
					this.roomChildren.cauldron.scale,
					{
						x: 1,
						y: 1,
						z: 1,
						ease: "back.out(2.5)",
						duration: 0.8,
					},
					"bookSame3"
				)
				.to(
					this.roomChildren.cauldron.rotation,
					{
						y: Math.PI * 4,
						ease: "back.out(2.5)",
						duration: 0.6,
					},
					"bookSame3"
				)
				.to(
					this.roomChildren.liquid.scale,
					{
						x: 1,
						y: 1,
						z: 1,
						ease: "power1.out",
						duration: 0.3,
						delay: 0.1,
						onComplete: resolve,
					},
					"bookSame3"
				);
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
			//console.log("swipped up");
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
		this.scaleFlag = true;
		await this.firstIntro();
		this.moveFlag = true;
		this.scrollOnceEvent = this.onScroll.bind(this);
		this.touchStart = this.onTouch.bind(this);
		this.touchMove = this.onTouchMove.bind(this);
		window.addEventListener("wheel", this.scrollOnceEvent);
		window.addEventListener("touchstart", this.touchStart);
		window.addEventListener("touchmove", this.touchMove);
	}

	async playSecondIntro() {
		this.moveFlag = false;
		await this.secondIntro();
		this.emit("playanimation");
		this.emit("enablecontrols");
	}
	move() {
		if (this.device === "desktop") {
			this.room.position.set(-0.8, 0, 0);
		} else {
			this.room.position.set(0, 0, -1);
		}
	}

	scale() {
		this.roomChildren.rectLight.width = 0;
		this.roomChildren.rectLight.height = 0;

		if (this.device === "desktop") {
			this.room.scale.set(0.15, 0.15, 0.15);
		} else {
			this.room.scale.set(0.07, 0.07, 0.07);
		}
	}

	update() {
		if (this.moveFlag) {
			this.move();
		}

		if (this.scaleFlag) {
			//this.scale();
		}
	}
}
