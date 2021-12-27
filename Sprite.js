class Sprite {
  constructor(config) {
    //Setup the image
    this.image = new Image();
    this.image.src = config.src;
    this.image.onload = () => {
      this.isImageLoaded = true;
    };

    //Shadow
    this.shadow = new Image();
    this.useShadow = true;
    if (this.useShadow) {
      this.shadow.src = "/images/characters/shadow.png";
    }
    this.shadow.onload = () => {
      this.isShadowLoaded = true;
    };

    //   Configuring animation and initial state
    this.animations = config.animations || {
      //The following code allows you to add new animations, just with frames
      // these are the frames, so which parts of the sprite sheet are selected
      "idle-down": [[0, 0]],
      "idle-right": [[0, 1]],
      "idle-up": [[0, 2]],
      "idle-left": [[0, 3]],
      "walk-down": [
        [1, 0],
        [0, 0],
        [3, 0],
        [0, 0],
      ],
      "walk-right": [
        [1, 1],
        [0, 1],
        [3, 1],
        [0, 1],
      ],
      "walk-up": [
        [1, 2],
        [0, 2],
        [3, 2],
        [0, 2],
      ],
      "walk-left": [
        [1, 3],
        [0, 3],
        [3, 3],
        [0, 3],
      ],
    };
    this.currentAnimation = config.currentAnimation || "idle-down";
    this.currentAnimationFrame = 0;

    this.animationFrameLimit = config.animationFrameLimit || 8;
    this.animationFrameProgress = this.animationFrameLimit;
    //Reference the gameobject
    this.gameObject = config.gameObject;
  }

  get frame() {
    return this.animations[this.currentAnimation][this.currentAnimationFrame];
  }

  setAnimation(key) {
    if (this.currentAnimation !== key) {
      this.currentAnimation = key;
      this.currentAnimationFrame = 0;
      this.animationFrameProgress = this.animationFrameLimit;
    }
  }

  updateAnimationProgress() {
    //Downtick frame progress
    if (this.animationFrameProgress > 0) {
      this.animationFrameProgress -= 1;
      return;
    }

    //Reset the counter
    this.animationFrameProgress = this.animationFrameLimit;
    this.currentAnimationFrame += 1;
    if (this.frame === undefined) {
      this.currentAnimationFrame = 0;
    }
  }

  draw(ctx) {
    // These are passed ultimately from when a new GameObject() is used.
    // May need to create an offsetX and offsetY to address custom sprites
    // So const x = this.gameObject.x * 16 - offsetX;
    const x = this.gameObject.x - 8;
    const y = this.gameObject.y - 18;

    const [frameX, frameY] = this.frame;

    this.isShadowLoaded && ctx.drawImage(this.shadow, x, y);

    this.isImageLoaded &&
      ctx.drawImage(
        this.image,
        frameX * 32,
        frameY * 32, // start of the cut, mutliplied by sprite size
        32,
        32, //size of the cut, this changes depending on sprite layout
        x,
        y, // position of sprite
        32,
        32 //scale of the sprite
      );

    this.updateAnimationProgress();
  }
}
