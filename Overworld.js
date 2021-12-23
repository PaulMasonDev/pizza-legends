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

    const x = 5;
    const y = 6;

    const shadow = new Image();
    shadow.src = "/images/characters/shadow.png";
    shadow.onload = () => {
      this.ctx.drawImage(
        shadow,
        0, // left cut
        0, //top cut
        32, //width of cut
        32, //height of cut
        x * 16 - 8, //x position
        y * 16 - 18, //y position
        32, //x scale
        32 // y scale
      );
    };

    const hero = new Image();
    hero.src = "/images/characters/people/hero.png";
    hero.onload = () => {
      this.ctx.drawImage(
        hero,
        0, // left cut
        0, //top cut
        32, //width of cut
        32, //height of cut
        x * 16 - 8, //x position
        y * 16 - 18, //y position
        32, //x scale
        32 // y scale
      );
    };
  }
}
