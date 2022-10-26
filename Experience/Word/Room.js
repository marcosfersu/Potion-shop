import * as THREE from "three";
import Experience from "../Experience";

export default class Room {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.time = this.experience.time;
    this.room = this.resources.items.room;
    this.actualRoom = this.room.scene;

    this.setModel();
    this.setAnimation();
  }

  setModel() {
    this.actualRoom.children.forEach((child) => {
      child.castShadow = true;
      child.receiveShadow = true;

      if (child instanceof THREE.Group) {
        child.children.forEach((groupchild) => {
          groupchild.castShadow = true;
          groupchild.receiveShadow = true;
        });
      }
    });

    this.scene.add(this.actualRoom);
    this.actualRoom.scale.set(0.2, 0.2, 0.2);
  }

  setAnimation() {
    this.mixer = new THREE.AnimationMixer(this.actualRoom);
    console.log(this.room);
    this.chest = this.mixer.clipAction(this.room.animations[0]);
    this.chestKeep = this.mixer.clipAction(this.room.animations[1]);
    this.burbleOne = this.mixer.clipAction(this.room.animations[2]);
    this.burbleTwo = this.mixer.clipAction(this.room.animations[3]);
    this.burbleThree = this.mixer.clipAction(this.room.animations[4]);
    this.burbleFour = this.mixer.clipAction(this.room.animations[5]);

    this.chest.play();
    this.chestKeep.play();
    this.burbleOne.play();
    this.burbleTwo.play();
    this.burbleThree.play();
    this.burbleFour.play();
  }

  resize() {}

  update() {
    this.mixer.update(this.time.delta * 0.0009);
  }
}
