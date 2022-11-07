import GSAP from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger.js";
import Experience from "../Experience";

export default class Controls {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.sizes = this.experience.sizes;
    this.resources = this.experience.resources;
    this.time = this.experience.time;
    this.camera = this.experience.camera;
    this.room = this.experience.word.room.actualRoom;
    this.room.children.forEach((child) => {
      if (child.type === "RectAreaLight") {
        this.rectLight = child;
      }
    });
    GSAP.registerPlugin(ScrollTrigger);

    this.setScrollTrigger();
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
          y: 2.5,
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
        // Mini Platform Animation
        console.log(this.room.children);
        this.thirdMoveTimeline = new GSAP.timeline({
          scrollTrigger: {
            trigger: ".third-move",
            start: "center center",
            end: "bottom bottom",
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        });

        this.room.children.forEach((child) => {
          if (child.name === "step-1") {
            GSAP.to(child.position, {
              x: -2.1845946311950684,
              y: 0.5344138145446777,
              z: 8.012523651123047,
              duration: 0.3,
            });
          }
          if (child.name === "step-2") {
            GSAP.to(child.position, {
              x: -3.0983872413635254,
              y: 0.2833542823791504,
              z: 8.918571472167969,
              duration: 0.45,
            });
          }
          if (child.name === "step-3") {
            GSAP.to(child.position, {
              x: -3.806932210922241,
              y: 0.03467106819152832,
              z: 9.618904113769531,
              duration: 0.55,
            });
          }
          if (child.name === "sign") {
            GSAP.to(child.scale, {
              x: 1,
              y: 1,
              z: 1,
              duration: 1.5,
            });
          }
        });
      },
    });
  }

  resize() {}

  update() {}
}
