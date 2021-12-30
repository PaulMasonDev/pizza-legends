class GameObject {
  constructor(config) {
    //unique id is used to help identify each individual game object
    this.id = null;
    //flag to keep track of when an object is loaded
    this.isMounted = false;
    //Setting position of the gameObject which could be passed to sprite
    this.x = config.x || 0;
    this.y = config.y || 0;
    this.direction = config.direction || "down";
    //Utilizing sprite object
    this.sprite = new Sprite({
      gameObject: this,
      src: config.src || "/images/characters/people/hero.png",
    });
    //Dealing with NPC behaviors
    this.behaviorLoop = config.behaviorLoop || [];
    this.behaviorLoopIndex = 0;
    //NPC Dialog
    this.talking = config.talking || [];
  }

  mount(map) {
    this.isMounted = true;
    map.addWall(this.x, this.y);
    //If we have a behavior, kick off after a short delay
    setTimeout(() => {
      this.doBehaviorEvent(map);
    }, 10);
  }

  update() {}

  async doBehaviorEvent(map) {
    //Don't do anything if there are no behaviors
    if (
      map.isCutscenePlaying ||
      this.behaviorLoop.length === 0 ||
      this.isStanding
    ) {
      return;
    }
    //Setting up event with relavant info
    let eventConfig = this.behaviorLoop[this.behaviorLoopIndex];
    eventConfig.who = this.id;

    //Create an event instance out of our next event config
    const eventHandler = new OverworldEvent({
      map: map,
      event: eventConfig,
    });

    await eventHandler.init();

    //Setting the next event to fire
    this.behaviorLoopIndex += 1;
    if (this.behaviorLoopIndex === this.behaviorLoop.length) {
      this.behaviorLoopIndex = 0;
    }

    //Do it again!
    this.doBehaviorEvent(map);
  }
}
