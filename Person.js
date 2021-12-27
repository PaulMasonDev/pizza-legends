class Person extends GameObject {
  constructor(config) {
    //super pulls in any properties on the GameObject since it is being extended
    super(config);

    //This is telling the program how many iterations to go through before stopping a direction
    this.movingProgressRemaining = 0;

    //How to tell if this person is player controlled
    this.isPlayerControlled = config.isPlayerControlled || false;

    //Used later withing the updatePosition method in order to transfer in which coordinate axis and by how much to move
    this.directionUpdate = {
      up: ["y", -1],
      down: ["y", 1],
      left: ["x", -1],
      right: ["x", 1],
    };
  }

  update(state) {
    if (this.movingProgressRemaining > 0) {
      this.updatePosition();
    } else {
      //More cases for starting to walk will come here
      //
      //

      //Case: keyboard ready and have an arrow pressed
      if (state.arrow && this.isPlayerControlled) {
        this.startBehavior(state, {
          type: "walk",
          direction: state.arrow,
        });
      }
      this.updateSprite(state);
    }
  }

  startBehavior(state, behavior) {
    //Setting the character direction to whatever behavior has
    this.direction = behavior.direction;
    if (behavior.type === "walk") {
      //stop here if space is not free
      if (state.map.isSpaceTaken(this.x, this.y, this.direction)) {
        return;
      }
      //ready to walk!
      state.map.moveWall(this.x, this.y, this.direction);
      this.movingProgressRemaining = 16;
    }
  }

  updatePosition() {
    //Example this.disrectionUpdate[up]
    const [property, change] = this.directionUpdate[this.direction];
    // Ex: if this.direction = up, this.y += -1; this.y is the property coming from the game object
    this[property] += change;
    this.movingProgressRemaining -= 1;
  }

  //This code sets the current animation by key, defined in the sprite file
  updateSprite() {
    if (this.movingProgressRemaining > 0) {
      this.sprite.setAnimation(`walk-${this.direction}`);
      return;
    }
    this.sprite.setAnimation(`idle-${this.direction}`);
    //If there is no movement progress, and no arrow being held
  }
}
