class GameObject {
  constructor(config) {
    //Setting position of the gameObject which could be passed to sprite
    this.x = config.x || 0;
    this.y = config.y || 0;
    this.direction = config.direction || "down";
    //Utilizing sprite object
    this.sprite = new Sprite({
      gameObject: this,
      src: config.src || "/images/characters/people/hero.png",
    });
  }

  update() {}
}
