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
    if (
      this.movingProgressRemaining === 0 &&
      state.arrow &&
      this.isPlayerControlled
    ) {
      this.direction = state.arrow;
      this.movingProgressRemaining = 16;
    }
    this.updatePosition();
  }

  updatePosition() {
    if (this.movingProgressRemaining > 0) {
      //Example this.disrectionUpdate[up]
      const [property, change] = this.directionUpdate[this.direction];
      // Ex: if this.direction = up, this.y += -1; this.y is the property coming from the game object
      this[property] += change;
      this.movingProgressRemaining -= 1;
    }
  }
}
