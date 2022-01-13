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
      //Establish the camera person
      const cameraPerson = this.map.gameObjects.hero;

      Object.values(this.map.gameObjects).forEach((object) => {
        //Update all objects
        object.update({
          arrow: this.directionInput.direction,
          map: this.map,
        });
      });

      // Draw lower layer
      this.map.drawLowerImage(this.ctx, cameraPerson);

      // Draw all game objects as defined in the map
      Object.values(this.map.gameObjects)
        //This sort ensures that characters are painted from top down
        //and no funky overlaps.
        .sort((a, b) => {
          return a.y - b.y;
        })
        .forEach((object) => {
          object.sprite.draw(this.ctx, cameraPerson);
        });

      // Draw upper layer
      this.map.drawUpperImage(this.ctx, cameraPerson);

      if (!this.map.isPaused) {
        requestAnimationFrame(() => {
          step();
        });
      }
    };
    step();
  }

  bindActionInput() {
    new KeyPressListener("Enter", () => {
      //Is there a person here to talk to?
      this.map.checkForActionCutscene();
    });
    new KeyPressListener("Escape", () => {
      if (!this.map.isCutscenePlaying) {
        this.map.startCutscene([
          {
            type: "pause",
          },
        ]);
      }
    });
  }

  bindHeroPositionCheck() {
    document.addEventListener("PersonWalkingComplete", (e) => {
      if (e.detail.whoId === "hero") {
        //Hero's postition has changed
        this.map.checkForFootstepCutscene();
      }
    });
  }

  startMap(mapConfig, heroInitialState = null) {
    this.map = new OverworldMap(mapConfig);
    this.map.overworld = this;
    this.map.mountObjects();

    if (heroInitialState) {
      const { hero } = this.map.gameObjects;
      this.map.removeWall(hero.x, hero.y);
      hero.x = heroInitialState.x;
      hero.y = heroInitialState.y;
      hero.direction = heroInitialState.direction;
      this.map.addWall(hero.x, hero.y);
    }

    this.progress.mapId = mapConfig.id;
    this.progress.startingHeroX = this.map.gameObjects.hero.x;
    this.progress.startingHeroY = this.map.gameObjects.hero.y;
    this.progress.startingHeroDirection = this.map.gameObjects.hero.direction;
  }
  // Common to have an init method in a class
  async init() {
    //Create a new data tracker
    this.progress = new Progress();

    //Show the title screen
    this.titleScreen = new TitleScreen({
      progress: this.progress,
    });
    const useSaveFile = await this.titleScreen.init(
      document.querySelector(".game-container")
    );

    //Potentially check for save data
    let initialHeroState = null;

    if (useSaveFile) {
      this.progress.load();
      initialHeroState = {
        x: this.progress.startingHeroX,
        y: this.progress.startingHeroY,
        direction: this.progress.startingHeroDirection,
      };
    }
    //Load the hud
    this.hud = new Hud();
    this.hud.init(document.querySelector(".game-container"));

    //Start the first map
    this.startMap(window.OverworldMaps[this.progress.mapId], initialHeroState);

    //Create Controls
    this.bindActionInput();
    this.bindHeroPositionCheck();

    this.directionInput = new DirectionInput();
    this.directionInput.init();
    //Kick off the game
    this.startGameLoop();

    // // This is a sample cutscene and can be crafted however you want
    // this.map.startCutscene([
    //   { type: "battle", enemyId: "beth" },
    //   // { type: "textMessage", text: "This is the very first message!" },
    //   // { type: "changeMap", map: "DemoRoom" },
    // ]);
  }
}
