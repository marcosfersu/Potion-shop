import GSAP from "gsap";
import * as THREE from "three";
import Experience from "../Experience";

import { EventEmitter } from "events";

//import { RectAreaLightHelper } from "three/examples/jsm/helpers/RectAreaLightHelper.js";

export default class Room extends EventEmitter {
	constructor() {
		super();
		this.experience = new Experience();
		this.scene = this.experience.scene;
		this.resources = this.experience.resources;
		this.time = this.experience.time;
		this.preloader = this.experience.preloader;
		this.room = this.resources.items.room;
		this.actualRoom = this.room.scene;
		this.roomChildren = {};

		this.lerp = {
			current: 0,
			target: 0,
			ease: 0.1,
		};

		this.setModel();
		this.setAnimation();
		this.onMouseMove();
	}

	setModel() {
		this.actualRoom.children.forEach(child => {
			child.castShadow = true;
			child.receiveShadow = true;

			if (child instanceof THREE.Group) {
				child.children.forEach(groupchild => {
					groupchild.castShadow = true;
					groupchild.receiveShadow = true;
				});
			}

			child.scale.set(0, 0, 0);

			if (
				child.name === "step-1" ||
				child.name === "step-2" ||
				child.name === "step-3"
			) {
				child.position.y = -3;
				child.scale.set(1, 1, 1);
			}

			if (child.name === "sign") {
				child.scale.set(0, 0, 0);
				child.position.y = -1;
			}
			if (child.name === "lamp") {
				child.scale.set(0, 0, 0);
			}

			this.roomChildren[child.name.toLowerCase()] = child;
		});

		const width = 0.5;
		const height = 0.7;
		const intensity = 0.6;
		const rectLight = new THREE.RectAreaLight(
			0xffffff,
			intensity,
			width,
			height
		);
		rectLight.position.set(5, 6.5, 0.5);
		rectLight.rotation.x = -Math.PI / 2;
		rectLight.rotation.z = Math.PI / 4;
		this.actualRoom.add(rectLight);

		this.roomChildren["rectLight"] = rectLight;

		//const rectLightHelper = new RectAreaLightHelper(rectLight);
		//rectLight.add(rectLightHelper);
		//console.log(this.room);bubble

		this.scene.add(this.actualRoom);
		this.actualRoom.scale.set(0.15, 0.15, 0.15);
	}

	setAnimation() {
		this.mixer = new THREE.AnimationMixer(this.actualRoom);
		this.chest = this.mixer.clipAction(this.room.animations[0]);
		this.chestKeep = this.mixer.clipAction(this.room.animations[1]);
		this.bubbleOne = this.mixer.clipAction(this.room.animations[2]);
		this.bubbleTwo = this.mixer.clipAction(this.room.animations[3]);
		this.bubbleThree = this.mixer.clipAction(this.room.animations[4]);
		this.bubbleFour = this.mixer.clipAction(this.room.animations[5]);

		this.preloader.on("playanimation", () => {
			//this.playAnimation();
		});
	}

	onMouseMove() {
		window.addEventListener("mousemove", e => {
			this.rotation =
				((e.clientX - window.innerWidth / 2) * 2) / window.innerWidth;
			this.lerp.target = this.rotation * 0.1;
		});
	}

	playAnimation() {
		this.chest.play();
		this.chestKeep.play();
		this.bubbleOne.play();
		this.bubbleTwo.play();
		this.bubbleThree.play();
		this.bubbleFour.play();
	}

	resize() {}

	update() {
		this.lerp.current = GSAP.utils.interpolate(
			this.lerp.current,
			this.lerp.target,
			this.lerp.ease
		);

		this.actualRoom.rotation.y = this.lerp.current;

		this.mixer.update(this.time.delta * 0.0009);
	}
}
