import GSAP from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger.js";
import Experience from "../Experience";
import ASScroll from "@ashthornton/asscroll";

export default class Controls {
	constructor() {
		this.experience = new Experience();
		this.scene = this.experience.scene;
		this.sizes = this.experience.sizes;
		this.resources = this.experience.resources;
		this.time = this.experience.time;
		this.camera = this.experience.camera;
		this.room = this.experience.word.room.actualRoom;
		this.room.children.forEach(child => {
			if (child.type === "RectAreaLight") {
				this.rectLight = child;
			}
		});
		GSAP.registerPlugin(ScrollTrigger);

		this.setSmoothScroll();
		this.setScrollTrigger();
	}

	setupASScroll() {
		// https://github.com/ashthornton/asscroll
		const asscroll = new ASScroll({
			ease: 0.5,
			disableRaf: true,
		});

		GSAP.ticker.add(asscroll.update);

		ScrollTrigger.defaults({
			scroller: asscroll.containerElement,
		});

		ScrollTrigger.scrollerProxy(asscroll.containerElement, {
			scrollTop(value) {
				if (arguments.length) {
					asscroll.currentPos = value;
					return;
				}
				return asscroll.currentPos;
			},
			getBoundingClientRect() {
				return {
					top: 0,
					left: 0,
					width: window.innerWidth,
					height: window.innerHeight,
				};
			},
			fixedMarkers: true,
		});

		asscroll.on("update", ScrollTrigger.update);
		ScrollTrigger.addEventListener("refresh", asscroll.resize);

		requestAnimationFrame(() => {
			asscroll.enable({
				newScrollElements: document.querySelectorAll(
					".gsap-marker-start, .gsap-marker-end, [asscroll]"
				),
			});
		});
		return asscroll;
	}

	setSmoothScroll() {
		this.asscroll = this.setupASScroll();
	}

	setScrollTrigger() {
		ScrollTrigger.matchMedia({
			// Desktop Large

			"(min-width: 2200px)": () => {
				this.room.scale.set(0.15, 0.15, 0.15);
				this.rectLight.width = 0.5;
				this.rectLight.height = 0.7;
				this.camera.orthographicCamera.position.set(0, 6.5, 10);
				this.room.position.set(0, 0, 0);

				console.log("fired desktop large");

				//first section -----------------------------------------
				this.firsMoveTimeline = new GSAP.timeline({
					scrollTrigger: {
						trigger: ".first-move",
						start: "top top",
						end: "bottom bottom",
						scrub: 0.6,
						invalidateOnRefresh: true,
					},
				});
				this.firsMoveTimeline.to(this.room.position, {
					x: () => {
						return this.sizes.width * 0.001;
					},
				});

				//second section -----------------------------------------
				this.secondMoveTimeline = new GSAP.timeline({
					scrollTrigger: {
						trigger: ".second-move",
						start: "top top",
						end: "bottom bottom",
						scrub: 0.6,
						invalidateOnRefresh: true,
					},
				});
				this.secondMoveTimeline
					.to(
						this.room.position,
						{
							x: () => {
								return -1;
							},
							z: () => {
								return this.sizes.height * 0.0032;
							},
						},
						"same"
					)
					.to(
						this.room.scale,
						{
							x: 0.4,
							y: 0.4,
							z: 0.4,
						},
						"same"
					)
					.to(
						this.rectLight,
						{
							width: 0.5 * 4,
							height: 0.7 * 4,
						},
						"same"
					);
				// Third section -----------------------------------------
				this.thirdMoveTimeline = new GSAP.timeline({
					scrollTrigger: {
						trigger: ".third-move",
						start: "top top",
						end: "bottom bottom",
						scrub: 0.6,
						invalidateOnRefresh: true,
					},
				}).to(this.camera.orthographicCamera.position, {
					y: 2.5,
					x: -4.1,
				});
			},

			// Desktop
			"(min-width: 959px) and (max-width: 2199px)": () => {
				console.log("fired desktop");

				this.room.scale.set(0.15, 0.15, 0.15);
				this.rectLight.width = 0.5;
				this.rectLight.height = 0.7;
				this.camera.orthographicCamera.position.set(0, 6.5, 10);
				this.room.position.set(0, 0, 0);

				//first section -----------------------------------------
				this.firsMoveTimeline = new GSAP.timeline({
					scrollTrigger: {
						trigger: ".first-move",
						start: "top top",
						end: "bottom bottom",
						scrub: 0.6,
						invalidateOnRefresh: true,
					},
				});
				this.firsMoveTimeline.to(this.room.position, {
					x: () => {
						return this.sizes.width * 0.0014;
					},
				});

				//second section -----------------------------------------
				this.secondMoveTimeline = new GSAP.timeline({
					scrollTrigger: {
						trigger: ".second-move",
						start: "top top",
						end: "bottom bottom",
						scrub: 0.6,
						invalidateOnRefresh: true,
					},
				});
				this.secondMoveTimeline
					.to(
						this.room.position,
						{
							x: () => {
								return -1;
							},
							z: () => {
								return this.sizes.height * 0.0032;
							},
						},
						"same"
					)
					.to(
						this.room.scale,
						{
							x: 0.4,
							y: 0.4,
							z: 0.4,
						},
						"same"
					)
					.to(
						this.rectLight,
						{
							width: 0.5 * 4,
							height: 0.7 * 4,
						},
						"same"
					);
				// Third section -----------------------------------------
				this.thirdMoveTimeline = new GSAP.timeline({
					scrollTrigger: {
						trigger: ".third-move",
						start: "top top",
						end: "bottom bottom",
						scrub: 0.6,
						invalidateOnRefresh: true,
					},
				}).to(this.camera.orthographicCamera.position, {
					y: 3,
					x: -4.1,
				});
			},

			// Mobile
			"(max-width: 968px)": () => {
				console.log("fired mobile");

				// Resets
				this.room.scale.set(0.07, 0.07, 0.07);
				this.room.position.set(0, 0, 0);
				this.rectLight.width = 0.3;
				this.rectLight.height = 0.4;
				this.camera.orthographicCamera.position.set(0, 6.5, 10);

				// First section -----------------------------------------
				this.firstMoveTimeline = new GSAP.timeline({
					scrollTrigger: {
						trigger: ".first-move",
						start: "top top",
						end: "bottom bottom",
						scrub: 0.6,
						// invalidateOnRefresh: true,
					},
				}).to(this.room.scale, {
					x: 0.1,
					y: 0.1,
					z: 0.1,
				});

				// Second section -----------------------------------------
				this.secondMoveTimeline = new GSAP.timeline({
					scrollTrigger: {
						trigger: ".second-move",
						start: "top top",
						end: "bottom bottom",
						scrub: 0.6,
						invalidateOnRefresh: true,
					},
				})
					.to(
						this.room.scale,
						{
							x: 0.25,
							y: 0.25,
							z: 0.25,
						},
						"same"
					)
					.to(
						this.rectLight,
						{
							width: 0.3 * 3.4,
							height: 0.4 * 3.4,
						},
						"same"
					)
					.to(
						this.room.position,
						{
							x: 1.5,
						},
						"same"
					);

				// Third section -----------------------------------------
				this.thirdMoveTimeline = new GSAP.timeline({
					scrollTrigger: {
						trigger: ".third-move",
						start: "center center",
						end: "bottom bottom",
						scrub: 0.6,
						invalidateOnRefresh: true,
					},
				}).to(this.room.position, {
					z: -4.5,
				});
			},

			// all
			all: () => {
				this.section = document.querySelectorAll(".section");
				this.section.forEach(section => {
					this.progressWrapper = section.querySelector(".progress-wrapper");
					this.progressBar = section.querySelector(".progress-bar");

					if (section.classList.contains("right")) {
						GSAP.to(section, {
							borderTopLeftRadius: 10,
							scrollTrigger: {
								trigger: section,
								start: "top bottom",
								end: "top top",
								scrub: 0.6,
							},
						});
						GSAP.to(section, {
							borderBottomLeftRadius: 300,
							scrollTrigger: {
								trigger: section,
								start: "bottom bottom",
								end: "bottom top",
								scrub: 0.6,
							},
						});
					} else {
						GSAP.to(section, {
							borderTopRightRadius: 10,
							scrollTrigger: {
								trigger: section,
								start: "top bottom",
								end: "top top",
								scrub: 0.6,
							},
						});
						GSAP.to(section, {
							borderBottomRightRadius: 300,
							scrollTrigger: {
								trigger: section,
								start: "bottom bottom",
								end: "bottom top",
								scrub: 0.6,
							},
						});
					}

					GSAP.from(this.progressBar, {
						scaleY: 0,
						scrollTrigger: {
							trigger: section,
							start: "top top",
							end: "bottom bottom",
							scrub: 0.4,
							pin: this.progressWrapper,
							pinSpacer: false,
						},
					});
				});

				// Mini Entry  Animation
				this.secondPartTimeLine = new GSAP.timeline({
					scrollTrigger: {
						trigger: ".third-move",
						start: "center center",
					},
				});

				this.room.children.forEach(child => {
					if (child.name === "step-1") {
						this.first = GSAP.to(child.position, {
							x: -2.1845946311950684,
							y: 0.5344138145446777,
							z: 8.012523651123047,
							duration: 0.3,
							ease: "back.out(1)",
						});
					}
					if (child.name === "step-2") {
						this.second = GSAP.to(child.position, {
							x: -3.0983872413635254,
							y: 0.2833542823791504,
							z: 8.918571472167969,
							duration: 0.3,
							ease: "back.out(1)",
						});
					}
					if (child.name === "step-3") {
						this.third = GSAP.to(child.position, {
							x: -3.806932210922241,
							y: 0.03467106819152832,
							z: 9.618904113769531,
							duration: 0.3,
							ease: "back.out(1)",
						});
					}
					if (child.name === "sign") {
						(this.fourth = GSAP.to(child.scale, {
							x: 1,
							y: 1,
							z: 1,
							ease: "back.out(2)",
							duration: 0.5,
						})),
							"same";
						GSAP.to(child.position, {
							x: -4.934990882873535,
							y: 0.14880752563476562,
							z: 6.686198711395264,
							duration: 0.5,
							ease: "back.out(2)",
						}),
							"same";
					}
					if (child.name === "lamp") {
						this.fifth = GSAP.to(child.scale, {
							x: 1,
							y: 1,
							z: 1,
							ease: "back.out(2)",
							duration: 0.5,
						});
					}
				});

				this.secondPartTimeLine.add(this.first);
				this.secondPartTimeLine.add(this.second);
				this.secondPartTimeLine.add(this.third);
				this.secondPartTimeLine.add(this.fourth, "-=0.2");
				this.secondPartTimeLine.add(this.fifth, "-=0.1");
			},
		});
	}

	resize() {}

	update() {}
}
