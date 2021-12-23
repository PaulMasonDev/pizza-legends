class Sprite {
  constructor(config) {
    //Setup the image
    this.image = new Image();
    this.image.src = config.src;
    this.image.onload = () => {
      this.isImageLoaded = true;
    };

    //   Configuring animation and initial state
    this.animations = config.animations || {
      // these are the frames, so which parts of the sprite sheet are selected
      idleDown: [[0, 0]],
    };
    this.currentAnimation = config.currentAnimation || "idleDown";
    this.currentAnimationFrame = 0;
    //This was added to address custom cut sizes like the baby
    this.cutXSize = config.cutX || 32;
    this.cutYSize = config.cutY || 32;

    //Reference the gameobject
    this.gameObject = config.gameObject;

    //Shadow
    this.shadow = new Image();
    this.useShadow = true;
    if (this.useShadow) {
      this.shadow.src = "/images/characters/shadow.png";
    }
    this.shadow.onload = () => {
      this.isShadowLoaded = true;
    };
  }

  draw(ctx) {
    // These are passed ultimately from when a new GameObject() is used.
    // May need to create an offsetX and offsetY to address custom sprites
    // So const x = this.gameObject.x * 16 - offsetX;
    const x = this.gameObject.x * 16 - 8;
    const y = this.gameObject.y * 16 - 18;

    this.isShadowLoaded && ctx.drawImage(this.shadow, x, y);

    this.isImageLoaded &&
      ctx.drawImage(
        this.image,
        0,
        0, // start of the cut
        this.cutXSize,
        this.cutYSize, //size of the cut, this changes depending on sprite layout
        x,
        y, // position of sprite
        32,
        32 //scale of the sprite
      );
  }
}
