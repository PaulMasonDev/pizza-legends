// Much of game dev involves the use of class-based concepts
// I believe this is because of the interactive nature of the different objects having to interact with one another
class Overworld {
  constructor(config) {
    // Although we may have only one Overworld to start with, it is probably useful to have a config object
    this.element = config.element;
    this.canvas = this.element.querySelector(".game-canvas");
    this.ctx = this.canvas.getContext("2d");
    this.map = null;
  }

  startGameLoop() {
    const step = () => {
      // Clear off the canvas
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      // Draw lower layer
      this.map.drawLowerImage(this.ctx);
      // Draw all game objects as defined in the map
      Object.values(this.map.gameObjects).forEach((object) => {
        object.x += 0.02;
        object.sprite.draw(this.ctx);
      });
      // Draw upper layer
      this.map.drawUpperImage(this.ctx);

      requestAnimationFrame(() => {
        step();
      });
    };
    step();
  }

  // Common to have an init method in a class
  init() {
    this.map = new OverworldMap(window.OverworldMaps.Kitchen);
    this.startGameLoop();
  }
}
