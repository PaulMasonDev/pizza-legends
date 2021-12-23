// Much of game dev involves the use of class-based concepts
// I believe this is because of the interactive nature of the different objects having to interact with one another
class Overworld {
  constructor(config) {
    // Although we may have only one Overworld to start with, it is probably useful to have a config object
    this.element = config.element;
    this.canvas = this.element.querySelector(".game-canvas");
    this.ctx = this.canvas.getContext("2d");
  }

  // Common to have an init method in a class
  init() {
    const image = new Image();
    image.src = "/images/maps/demolower.png";
    image.onload = () => {
      this.ctx.drawImage(image, 0, 0);
    };

    //Place some gameObjects
    const hero = new GameObject({
      x: 5,
      y: 6,
    });
    const npc1 = new GameObject({
      x: 7,
      y: 9,
      src: "images/characters/people/npc1.png",
    });

    setTimeout(() => {
      hero.sprite.draw(this.ctx);
      npc1.sprite.draw(this.ctx);
    }, 200);
  }
}
